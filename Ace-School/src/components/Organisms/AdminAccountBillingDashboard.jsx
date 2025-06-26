import React, { lazy, Suspense } from "react";
import Spinner from "../Atoms/Spinner";
import ClassFeeStatWrapper from "../Molecules/ClassFeeStatWrapper";
import FeeBillingDatatableWrapper from "./FeeBillingDatatableWrapper";
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
    <div className="grow  w-full rounded-lg gap-2 p-3 flex flex-wrap flex- md:flex-row md:flex-nowrap justify-between ">
      <div className="w-full md:w-1/4 p-2  border  border-gray-200 shadow-lg rounded-lg ">
        <Suspense fallback={<Spinner />}>
          <ClassFeeStatWrapper />
        </Suspense>
      </div>
      <div className="w-full border md:w-3/4 border-gray-200 shadow-lg    rounded-lg p-2">
        <Suspense fallback={<Spinner />}>
          <FeeBillingDatatableWrapper />
        </Suspense>
      </div>
      {/* <div className="w-full sm:w-1/4 p-2 border border-gray-200 shadow-lg   rounded-lg ">
        <Suspense fallback={<Spinner />}>
          <AllStudentsFeeStatWrapper />
        </Suspense>
      </div> */}
    </div>
  );
}

export default AdminAccountBillingDashboard;
