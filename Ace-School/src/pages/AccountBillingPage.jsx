import { Button } from "@/components/Atoms/button";
import AdminAccountBillingDashboard from "@/components/Organisms/AdminAccountBillingDashboard";
import AuthenticatedContainer from "@/components/Templates/AuthenticatedContainer";
import React from "react";

function AccountBillingPage({ username }) {
  return (
    <AuthenticatedContainer>
      <div id="top" className="p-3 flex justify-between items-center">
        <h1 className="sm:text-3xl text-2xl font-medium">Fee Billing</h1>
        <p className="hidden sm:block font-medium text-lg ">
          Namaste {username}
        </p>
      </div>
      <AdminAccountBillingDashboard />
    </AuthenticatedContainer>
  );
}

export default AccountBillingPage;
