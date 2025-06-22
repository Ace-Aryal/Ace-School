import React, { lazy, Suspense } from "react";
import Spinner from "../Atoms/Spinner";
import ClassFeeStatWrapper from "../Molecules/ClassFeeStatWrapper";
const ClassFeeStatDisplay = lazy(() =>
  import("../Molecules/ClassFeeStatDisplay")
);
const FeeBillingDatatable = lazy(() =>
  import("./Datatable/FeeBillingDatatable")
);
const AllStudentsFeeStatDisplay = lazy(() =>
  import("../Molecules/AllStudentsFeeStatDisplay")
);
function AdminAccountBillingDashboard() {
  return (
    <div className="grow  w-full rounded-lg gap-2 p-3 flex justify-between ">
      <div className="w-1/4 p-2  bg-gray-100 border  border-gray-200 shadow rounded-lg ">
        <Suspense fallback={<Spinner />}>
          <ClassFeeStatWrapper />
        </Suspense>
      </div>
      <div className="w-1/2  bg-gray-200 rounded-lg p-2">
        {" "}
        <Suspense fallback={<Spinner />}>
          <FeeBillingDatatable />
        </Suspense>
      </div>
      <div className="w-1/4 p-2 bg-gray-200 rounded-lg ">
        {" "}
        <Suspense fallback={<Spinner />}>
          <AllStudentsFeeStatDisplay />
        </Suspense>
      </div>
    </div>
  );
}

export default AdminAccountBillingDashboard;
