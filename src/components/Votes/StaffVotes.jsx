import React from "react";

import { useSelector } from "react-redux";
import VotesViewer from "./VotesViewer";

const StaffVotes = () => {
  const { user } = useSelector((state) => state.auth);
  return <VotesViewer propId={user?.staffId} />;
};

export default StaffVotes;
