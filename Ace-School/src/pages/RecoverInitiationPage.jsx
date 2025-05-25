import React, { useRef } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import authService from "@/appwrite/auth/auth";
import { toast } from "sonner";
import { showErrorToast, showSuccessToast } from "@/components/Templates/toast";
const RecoverInitiationPage = () => {
  const emaiRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emaiRef.current.value;
    const success = await authService.initiateAccountRecovery(email);
    if (success) {
      emaiRef.current.value = "";
      showSuccessToast(`If an account with this email exists, a recovery link has been
          sent. Check the inbox.`);
      return;
    }
    if (!success) {
      showErrorToast("Error sending message");
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
