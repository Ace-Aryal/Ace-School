import React from "react";
import AuthenticatedContainer from "../Templates/AuthenticatedContainer";
import { Dot } from "lucide-react";
import { Button } from "../ui/button";

const SelfAttendenceView = ({ isNotPriviligedUser, className }) => {
  return (
    <section
      className={`flex py-6 px-2  lg:p-6 w-full items-center justify-center"
      id="self-attendance-view ${className}`}
    >
      <div id="wrapper" className="w-full  ">
        <h2 className="text-zinc-800 text-2xl w-full font-semibold">
          Your Attendence
        </h2>
        <p className=" text-sm text-zinc-600">Track how you have been doing</p>
        <div className="flex  gap-5 font-medium  my-2">
          <span>Dipesh Aryal</span>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            <span>Present Today</span>
          </div>
        </div>

        <div className="text-red-600 font-medium my-1">Days Absent : 1</div>

        <div className="text-green-600 font-medium my-1">Days Present : 2</div>
        <div className="text-blue-600 font-medium my-1">Days on leave : 3</div>
        <div>
          <Button className="bg-zinc-800 text-white my-1.5">
            View Attendence Records
          </Button>
        </div>
        <div className="flex  gap-5 font-medium  my-2">
          <div>Attended : 2/4</div>
          <div>Percetage : 50%</div>
        </div>
      </div>
      {isNotPriviligedUser && (
        <div className={`w-full hidden md:block`}>
          <img
            src="https://fra.cloud.appwrite.io/v1/storage/buckets/682c752b002d9ec17d7b/files/6839cd8d0005359f11e6/view?project=682c6f8e0034a18f87ae&mode=admin"
            alt="filler photo in attendance page"
          />
        </div>
      )}
    </section>
  );
};

export default SelfAttendenceView;
