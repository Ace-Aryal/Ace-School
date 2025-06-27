"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export default function BillingDialog({ dialogTitle, children, triggerText }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-100  text-blue-600 font-medium rounded-lg px-2 py-1.75 border w-full">
          {triggerText}
          <Eye />
        </Button>
      </DialogTrigger>

      <DialogContent className=" bg-white max-w-screen  sm:max-w-lg md:max-w-3xl lg:max-w-4xl">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>

        <div className="py-2  mx-auto max-w-[calc(100vw-4rem)] sm:max-w-lg md:max-w-3xl lg:max-w-4xl  ">
          {/* Your custom form or content here */}
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
