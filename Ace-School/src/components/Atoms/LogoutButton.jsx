import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { showErrorToast } from "../Templates/toast";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import authService from "@/appwrite/auth/auth";
import { clearUser } from "@/features/authSlice";
import persistStore from "redux-persist/es/persistStore";
import { store } from "@/store/store";
const LogoutButton = ({}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const persist = persistStore(store);
  return (
    <Button
      onClick={async () => {
        setIsSubmitting(true);
        try {
          const loggedOut = await authService.logout();
          if (loggedOut) {
            persist.purge();
            navigate("/");
            dispatch(clearUser());

            return;
          }
        } catch (error) {
          console.error(error);

          showErrorToast("Error Logging out");
        } finally {
          setIsSubmitting(false);
        }
      }}
      size="sm"
      variant="outline"
      className="w-3/5 text-sm hover:bg-red-50 border border-red-500  text-red-500 "
    >
      {isSubmitting ? "Logging out .." : "Logout"} <LogOut />
    </Button>
  );
};

export default LogoutButton;
