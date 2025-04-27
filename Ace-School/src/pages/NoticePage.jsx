import RTE from "@/components/Templates/RTE";
import React from "react";
import { useForm, Controller } from "react-hook-form";

const NoticePage = () => {
  return (
    <main className="flex my-2 sm:my-4 flex-col w-full justify-center items-center">
      <h2 className="text-4xl text-indigo-500 font-bold text-center">
        Create Notice
      </h2>
      <RTE className="w-full  px-1 mx-1 sm:w-[80%]" />
    </main>
  );
};

export default NoticePage;
