import React from "react";

const AuthenticatedContainer = ({ children, classnames }) => {
  return (
    <main
      id="container"
      className={`w-full p-5 m-2 flex flex-col ${classnames} `}
    >
      {children}
    </main>
  );
};

export default AuthenticatedContainer;
