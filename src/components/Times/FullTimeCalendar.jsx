import { Scheduler } from "@aldabil/react-scheduler";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useAddTimeMutation,
  useDeleteTimeMutation,
  useUpdateTimeMutation,
} from "../../store/features/times/timesApi";
import {
  convertToISOStringFormat,
  fields,
  formatDateToCustomString,
} from "../../utils/CalendarHelpers";
import { notifyError, notifySucess } from "../../utils/helper";
import IsLoadingMessage from "../IsLoadingMessage";
import ItemActiveCalendar from "./ItemActiveCalendar";

// Example usage:

const FullTimeCalendar = ({ times }) => {
  const [events, setEvents] = useState([]);
  const [deleteTime, resultDeleteTime] = useDeleteTimeMutation();
  const [updateTime, resultUpdateTime] = useUpdateTimeMutation();
  const [addTime, resultAddTime] = useAddTimeMutation();
  const { user } = useSelector((state) => state.auth);
  const handleDelete = (timeId) => {
    deleteTime(timeId)
      .unwrap()
      .then((payload) => {
        notifySucess(payload.message || "deleted Successfully");
      })
      .catch((err) => {
        notifyError(
          err.message || "Sorry Can't delete time something happened"
        );
      });
  };
  const updateTimeHandler = (id, date) => {
    updateTime({
      newAvailableTime: date,
      timeId: id,
    })
      .unwrap()
      .then((payload) => {
        notifySucess(payload?.message || "updated Successfull");
      })
      .catch((err) => {
        notifyError(err?.data?.message || err?.message || "failed to update");
      });
  };
  const addTimeHandler = async (state) => {
    const date = convertToISOStringFormat(
      formatDateToCustomString(state?.start)
    );
    const isTimeAlreadyExists = times.some((time) =>
      date.includes(time.availableTime)
    );
    if (isTimeAlreadyExists) {
      notifyError("time is already Taken");
      return false;
    }
    await addTime({
      // ...data,
      availableTime: date,
      staffId: user.staffId,
    })
      .unwrap()
      .then(() => {
        notifySucess("Added Successfully");
        return state;
      })
      .catch((error) => {
        notifyError(
          error?.data?.message || "Sorry Can't Add time something happened"
        );
        return false;
      });
  };
  console.log(times);
  useEffect(() => {
    setEvents(
      times?.map((time) => {
        return {
          event_id: time?.timeId,
          title: time?.status,
          start: new Date(formatDateToCustomString(time?.availableTime)),
          end: new Date(formatDateToCustomString(time?.availableTime, true)),
          isActive: time?.isActive,
        };
      })
    );
  }, [times]);

  return (
    <>
      <Scheduler
        fields={fields}
        view="month"
        // dialogMaxWidth={"xl"}
        day={{
          startHour: 0,
          endHour: 24,
          cellRenderer: (props) => (
            <ItemActiveCalendar events={events} {...props} />
          ),
        }}
        week={{
          startHour: 0,
          endHour: 24,
        }}
        month={{
          startHour: 0,
          endHour: 24,
        }}
        editable={true}
        events={events}
        onDelete={(id) => handleDelete(id)}
        onConfirm={(state, type) => {
          if (type === "edit") {
            updateTimeHandler(
              state?.event_id,
              convertToISOStringFormat(formatDateToCustomString(state?.start))
            );
          }

          if (type === "create") {
            return addTimeHandler(state);

            // return state;
          }
        }}
      />
      {resultDeleteTime?.isLoading && (
        <IsLoadingMessage
          isLoading={resultDeleteTime?.isLoading}
          msg={"Please wait While Deleting Time"}
        />
      )}
      {resultUpdateTime?.isLoading && (
        <IsLoadingMessage
          isLoading={resultUpdateTime?.isLoading}
          msg={"Please wait While Editing Time"}
        />
      )}
      {resultAddTime?.isLoading && (
        <IsLoadingMessage
          isLoading={resultAddTime?.isLoading}
          msg={"Please wait While Adding Time"}
        />
      )}
    </>
  );
};

export default FullTimeCalendar;
