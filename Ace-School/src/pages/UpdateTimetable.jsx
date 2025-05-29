import AuthenticatedContainer from "@/components/Templates/AuthenticatedContainer";

import React, { Suspense, useEffect, useState, lazy } from "react";
import LoadingPage from "./LoadingPage";
const UpdateScheduleTable = lazy(() =>
  import("@/components/Molecules/UpdateScheduleTable")
);
const UpdateTimetable = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadingInitiator = setTimeout(() => {
      setLoaded(true);
    }, 50);
    return () => clearTimeout(loadingInitiator);
  }, []);

  if (!loaded) {
    return (
      <AuthenticatedContainer classnames="flex flex-col gap-8 items-center min-h-[105vh]">
        <h2 className="text-3xl text-zinc-800 w-full font-semibold md:max-w-[70vw] ">
          Update Timetable
        </h2>
        <div className="w-full sm:w-9/10">
          <LoadingPage />
        </div>
      </AuthenticatedContainer>
    );
  }

  return (
    <AuthenticatedContainer classnames="flex flex-col gap-8 items-center min-h-[105vh]">
      <h2 className="text-3xl text-zinc-800 w-full font-semibold md:max-w-[70vw] ">
        Update Timetable
      </h2>
      <div className="w-full sm:w-9/10">
        <Suspense fallback={<LoadingPage />}>
          <UpdateScheduleTable />
        </Suspense>
      </div>
    </AuthenticatedContainer>
  );
};

export default UpdateTimetable;
