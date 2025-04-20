import React, { useRef } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import authService from "@/appwrite/auth/auth";
import { toast } from "sonner";
const RecoverInitiationPage = () => {
  const emaiRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emaiRef.current.value;
    const success = await authService.initiateAccountRecovery(email);
    if (success) {
      emaiRef.current.value = "";
      toast.custom(() => (
        <div className="px-4 py-2 rounded bg-green-600 text-white text-sm flex items-center gap-2 shadow">
          ✅ If an account with this email exists, a recovery link has been
          sent. Check the inbox.
        </div>
      ));
      return;
    }
    if (!success) {
      toast.custom(() => (
        <div className="px-4 py-2 rounded bg-red-600 text-white text-sm flex items-center gap-2 shadow">
          ❌ Error Sending Message.
        </div>
      ));
    }
  };
  return (
    <div className="w-full flex min-h-screen items-start justify-center sm:items-center">
      <form
        onSubmit={handleSubmit}
        action=""
        className=" flex  space-x-1.5 w-[80vw] sm:w-60vw] md:w-[50vw]"
      >
        <Input
          id="email-field"
          className=""
          placeholder="Enter recovery email"
          ref={emaiRef}
        />
        <Button variant="outline">Send</Button>
      </form>
    </div>
  );
};

export default RecoverInitiationPage;
