import React from "react";
import ReportsViewer from "./ReportsViewer";
import { useSelector } from "react-redux";

const StaffReports = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  return <ReportsViewer propId={user?.staffId} />;
};

export default StaffReports;
