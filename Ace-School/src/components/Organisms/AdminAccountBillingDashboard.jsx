import React, { lazy, Suspense } from "react";
import Spinner from "../Atoms/Spinner";
import ClassFeeStatWrapper from "../Molecules/ClassFeeStatWrapper";
import FeeBillingDatatableWrapper from "./FeeBillingDatatableWrapper";
import { FeeStatLineGraph } from "./FeeStatLineChart";
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
    <div className="flex flex-col w-full ">
      <section className="grow mb-8 w-full rounded-lg gap-2 p-3 flex flex-wrap flex- justify-between ">
        <div className="w-full border  border-gray-200 shadow-lg    rounded-lg p-2">
          <Suspense fallback={<Spinner />}>
            <FeeBillingDatatableWrapper />
          </Suspense>
        </div>
      </section>
      <section className="w-full flex flex-col sm:flex-row justify-center gap-3 space-y-5 sm:space-y-0 p-3">
        <div className="w-full md:w-1/4 p-2  border  border-gray-200 shadow-lg rounded-lg ">
          <Suspense fallback={<Spinner />}>
            <ClassFeeStatWrapper />
          </Suspense>
        </div>
        <div className="md:w-3/4 ">
          <FeeStatLineGraph />
        </div>
      </section>
    </div>
  );
}

export default AdminAccountBillingDashboard;
