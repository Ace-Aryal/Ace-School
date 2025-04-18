import React from "react";

const Calenderpage = () => {
  return (
    <div className="calender w-full flex justify-center ">
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
