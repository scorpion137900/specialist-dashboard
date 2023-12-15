import React from "react";

import CustomBox from "../components/CustomBox";
import AllReportsAndVotesShared from "../components/AllReportsAndVotesShared";
const Reports = () => {
  return (
    <>
      <CustomBox>
        <AllReportsAndVotesShared
          btnText={"Add Report"}
          btnNavigatePath={"/reports/add-report"}
          staffNavigatePath={"/reports/staff/"}
          errorText={"Reports"}
        />
      </CustomBox>
    </>
  );
};

export default Reports;
