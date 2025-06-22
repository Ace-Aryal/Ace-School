import AdminBillingPage from "@/components/Organisms/AdminBillingPage";
import React from "react";
import { useSelector } from "react-redux";

const BillingPage = () => {
  const { roles, username } = useSelector((state) => state.auth.user);
  if (roles.includes("admin")) {
    return <AdminBillingPage username={username} />;
  }
  return <div>BillingPage</div>;
};

export default BillingPage;
