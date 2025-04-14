import React from "react";

const Message = ({ imageURL, role, message }) => {
  return (
    <div className="flex  my-8 justify-center flex-wrap sm:flex-nowrap  gap-6">
      <img
        src={imageURL}
        alt="principal-photo"
        className="hover:scale-103  transition-all w-full aspect-square rounded-lg sm:w-[40%] md:w-[30%]"
      />
      <div id="message-principal" className="flex flex-col sm:gap-2">
        <h3 className="text-3xl text-red-500 font-semibold text-center my:3 sm:mt-16 sm:mb-5">
          Message From {role}{" "}
          <span className="text-yellow-500 text-5xl">"</span>
        </h3>
        <p className="text-justify">{message}</p>
      </div>
    </div>
  );
};

export default Message;
