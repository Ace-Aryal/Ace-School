import React from "react";
import AuthenticatedContainer from "../Templates/AuthenticatedContainer";
import { Button } from "../ui/button";
import { Link, NavLink } from "react-router";
import { PenBox } from "lucide-react";

function AdminBillingPage({ username }) {
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
      <div className="grow bg-gray-100 w-full rounded-lg  grid place-items-center">
        <p>Under Development</p>
      </div>
    </AuthenticatedContainer>
  );
}

export default AdminBillingPage;
