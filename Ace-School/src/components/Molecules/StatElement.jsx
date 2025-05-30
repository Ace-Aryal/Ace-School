import React from "react";

const StatElement = ({ color, icon, statNumber, statHeading, classNames }) => {
  return (
    <div className={`p-4 flex  rounded items-center justify-between w-full   `}>
      <div className="flex flex-col text-zinc-800 ">
        <h3 className="text-3xl  font-semibold">{statNumber}</h3>
        <p className="text text-gray-600">{statHeading}</p>
      </div>
      <div>{icon}</div>
    </div>
  );
};

export default StatElement;
