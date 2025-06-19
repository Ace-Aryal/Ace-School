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
import { twMerge } from "tailwind-merge";
const AlertDialogComponent = ({
  buttonText,
  title,
  description,
  classNames,
  cancelButtonColor,
  continueButtonColor,
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
        className={twMerge(
          `bg-red-100 hover:bg-red-200 text-red-600 rounded-lg px-4 py-2 `,
          continueButtonColor
        )}
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
            className={twMerge(
              "bg-blue-100 hover:bg-blue-200 text-blue-600",
              cancelButtonColor
            )}
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className={twMerge(
              "bg-red-100 hover:bg-red-200 text-red-600",
              continueButtonColor
            )}
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
                await rest?.invalidate?.();
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
