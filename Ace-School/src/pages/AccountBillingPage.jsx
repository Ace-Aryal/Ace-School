import AdminAccountBillingDashboard from "@/components/Organisms/AdminAccountBillingDashboard";
import React from "react";

function AccountBillingPage({ username }) {
  return (
    <AuthenticatedContainer>
      <div id="top" className="p-3 flex justify-between items-center">
        <h1 className="sm:text-3xl text-2xl font-medium">Fee Billing</h1>
        <p className="hidden sm:block font-medium">Namaste {username}</p>
        <NavLink to="/billing/modify-fee-template">
          {" "}
          <Button
            className="bg-red-100 text-red-600 hover:bg-red-200 *:"
            variant="filled"
          >
            Modify Fee Template <PenBox />
          </Button>
        </NavLink>
      </div>
      <AdminAccountBillingDashboard />
    </AuthenticatedContainer>
  );
}

export default AccountBillingPage;
