import React from "react";

import CustomBox from "../components/CustomBox";
import AllReportsAndVotesShared from "../components/AllReportsAndVotesShared";
const Votes = () => {
  return (
    <>
      <CustomBox>
        <AllReportsAndVotesShared
          errorText={"Votes"}
          staffNavigatePath={"/votes/staff/"}
        />
      </CustomBox>
    </>
  );
};

export default Votes;
