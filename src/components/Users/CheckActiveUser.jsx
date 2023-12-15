import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useState } from "react";
import { useEditUserStatusMutation } from "../../store/features/users/users";
import { notifyError, notifySucess } from "../../utils/helper";
import { useIsLoadingActiveContext } from "../../Context/isLoadingActivity";
import { useEffect } from "react";

const CheckActiveUser = ({ checked, id }) => {
  const [editUserActive, resultOfUserActive] = useEditUserStatusMutation();
  const [isChecked, setIsChecked] = useState(checked);
  const { setIsLoadingActivity } = useIsLoadingActiveContext();
  const changeActive = (e) => {
    const flag = e.target.checked ? 1 : 0;
    editUserActive({ id, flag })
      .unwrap()
      .then((payload) => {
        setIsChecked((value) => !value);
        notifySucess(payload.message);
      })
      .catch((error) => {
        console.log(error);
        notifyError(error?.message);
      });
  };
  useEffect(() => {
    if (resultOfUserActive.isLoading) setIsLoadingActivity(true);
    else setIsLoadingActivity(false);
  }, [resultOfUserActive?.isLoading]);
  return (
    <FormGroup>
      <FormControlLabel
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

export default CheckActiveUser;
