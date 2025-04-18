import React from "react";

const StatElement = ({ color, icon, statNumber, statHeading, classNames }) => {
  return (
    <div
      className={`p-4 flex rounded items-center justify-between ${classNames}  `}
    >
      <div className="flex flex-col text-white ">
        <h3 className="text-3xl md:text-4xl font-semibold">{statNumber}</h3>
        <p className="text-md">{statHeading}</p>
      </div>
      <div>{icon}</div>
    </div>
  );
};

export default StatElement;
