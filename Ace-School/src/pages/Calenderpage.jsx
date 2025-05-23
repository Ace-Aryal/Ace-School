import React from "react";

const Calenderpage = () => {
  return (
    <div className="calender w-full p-5 flex flex-col items-center justify-center ">
      <h1 className="text-blue-500 text-2xl font-semibold  text-center">
        Calender
      </h1>
      <div className="w-full md:w-[70vw]">
        <iframe
          className=" w-full md:w-[70vw] aspect-square"
          src="https://ace-aryal.github.io/Learning_Web/03_Javascript/Calender/Calender.html"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Calenderpage;
