import { showErrorToast, showSuccessToast } from "@/components/Templates/toast";
import React from "react";

const AttendancePage = () => {
  return (
    <div
      onClick={() => {
        showSuccessToast("Metadata Updated sucessfully");
        showErrorToast("Test");
      }}
    >
      AttendancePage
    </div>
  );
};

export default AttendancePage;
