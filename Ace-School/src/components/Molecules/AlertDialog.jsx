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
      <AlertDialogContent className=" bg-white ">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              console.log("Hello");
              if (params) {
                onContinueFn(params);
                return;
              }
              onContinueFn();
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
