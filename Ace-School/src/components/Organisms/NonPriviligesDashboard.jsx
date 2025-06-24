import React from "react";
import AuthenticatedContainer from "../Templates/AuthenticatedContainer";
import { NavLink } from "react-router";
import { Button } from "../ui/button";

import PersonalInfo from "../Molecules/PersonalInfo";

function NonPriviligesDashboard() {
  return (
    <AuthenticatedContainer classnames="p-2 items-center flex sm:px-8">
      <div className="max-w-4xl w-full grow">
        <section id="header" className="flex justify-between">
          <h1 className="text-3xl font-semibold ">Dashboard</h1>
          <NavLink to="/notice">
            <Button
              variant="filled"
              className="bg-orange-100 text-lg text-orange-600 relative "
            >
              Notices{" "}
              <span className="absolute -top-1.5 -right-1.5 text-sm bg-red-600 text-white rounded-full block h-5 w-5">
                2
              </span>
            </Button>
          </NavLink>
        </section>
        <PersonalInfo />
      </div>
    </AuthenticatedContainer>
  );
}

export default NonPriviligesDashboard;
