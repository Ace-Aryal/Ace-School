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

import React, { useState } from "react";
import Spinner from "../Atoms/Spinner";
const AlertDialogComponent = ({
  buttonText,
  title,
  description,
  classNames,
  onContinueFn,
  ...rest
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <AlertDialog className=" " open={open}>
      <AlertDialogTrigger
        onClick={() => {
          setOpen(true);
        }}
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
          <AlertDialogCancel
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-zinc-800 text-white"
            onClick={async (e) => {
              // e.preventDefault();
              setLoading(true);
              await new Promise((resolve) => requestAnimationFrame(resolve));
              // 2nd method : await new Promise((resolve) => setTimeout(resolve, 0));

              // Both requestAnimationFrame and setTimeout(0) are just ways to pause briefly to let
              //  the browser update the UI before continuing with the hard work.
              try {
                await onContinueFn();
              } catch (error) {
                console.error(error);
              } finally {
                setLoading(false);
                setOpen(false);
                await rest.refetch?.();
              }
            }}
          >
            {loading ? <Spinner className="bg-zinc-800" /> : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogComponent;
