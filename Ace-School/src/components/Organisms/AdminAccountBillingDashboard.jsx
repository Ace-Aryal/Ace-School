import React, { lazy, Suspense } from "react";
import Spinner from "../Atoms/Spinner";
import ClassFeeStatWrapper from "../Molecules/ClassFeeStatWrapper";
const ClassFeeStatDisplay = lazy(() =>
  import("../Molecules/ClassFeeStatDisplay")
);
const FeeBillingDatatable = lazy(() =>
  import("./Datatable/FeeBillingDatatable")
);
const AllStudentsFeeStatWrapper = lazy(() =>
  import("../Molecules/AllStudentsFeeWrapper")
);
function AdminAccountBillingDashboard() {
  return (
    <div className="grow  w-full rounded-lg gap-2 p-3 flex flex-wrap md:flex-nowrap justify-between ">
      <div className="w-full sm:w-1/4 p-2  border  border-gray-200 shadow-lg rounded-lg ">
        <Suspense fallback={<Spinner />}>
          <ClassFeeStatWrapper />
        </Suspense>
      </div>
      <div className="w-full border sm:w-1/2 border-gray-200 shadow-lg    rounded-lg p-2">
        {" "}
        <Suspense fallback={<Spinner />}>
          <FeeBillingDatatable />
        </Suspense>
      </div>
      <div className="w-full sm:w-1/4 p-2 border border-gray-200 shadow-lg   rounded-lg ">
        {" "}
        <Suspense fallback={<Spinner />}>
          <AllStudentsFeeStatWrapper />
        </Suspense>
      </div>
    </div>
  );
}

export default AdminAccountBillingDashboard;
