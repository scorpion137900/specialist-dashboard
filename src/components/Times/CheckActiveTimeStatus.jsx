import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useState } from "react";
import { useEditUserStatusMutation } from "../../store/features/users/users";
import { notifyError, notifySucess } from "../../utils/helper";

import { useEffect } from "react";
import { useUpdateTimeStatusMutation } from "../../store/features/times/timesApi";

const CheckActiveTimeStatus = ({ checked, id, setIsLoadingActive }) => {
  const [editActive, resultOfActive] = useUpdateTimeStatusMutation();
  const [isChecked, setIsChecked] = useState(checked);
  const changeActive = (e) => {
    const flag = e.target.checked ? 1 : 0;
    editActive({ id, flag })
      .unwrap()
      .then((payload) => {
        setIsChecked((value) => !value);
        notifySucess(payload.message);
      })
      .catch((error) => {
        console.log(error);
        notifyError(error?.message || error?.data?.message);
      });
  };
  useEffect(() => {
    if (resultOfActive.isLoading) setIsLoadingActive(true);
    else setIsLoadingActive(false);
  }, [resultOfActive?.isLoading]);
  return (
    <FormGroup>
      <FormControlLabel
        sx={{
          "& .MuiFormControlLabel-label  ": {
            color: "#fff",
          },
        }}
        control={
          <Switch
            checked={isChecked}
            // value={isChecked}
            onChange={changeActive}
            color={"success"}
          />
        }
        label={`${isChecked ? "Active" : "Not Active"}`}
      />
    </FormGroup>
  );
};

export default CheckActiveTimeStatus;
