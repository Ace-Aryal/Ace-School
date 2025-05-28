import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import React from "react";

const AlertDialogComponent = ({
  buttonText,
  title,
  description,
  classNames,
  onContinueFn,
  params,
}) => {
  return (
    <AlertDialog className=" ">
      <AlertDialogTrigger
        className={` g-zinc-800 text-white rounded-lg px-4 py-2 ${classNames}`}
      >
        {buttonText}
      </AlertDialogTrigger>
      <AlertDialogContent className=" bg-white z-50 top-[30vh] w-[500px] left-[calc(50vw-175px)]  sm:left-[calc(50vw-250px)] right-0">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              console.log("Hello");
              //   onContinueFn(params);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogComponent;
