import React from "react";

const Message = ({ imageURL, role, message, className }) => {
  return (
    <div
      className={`flex  ${className}  my-8 justify-center  flex-wrap sm:flex-nowrap  gap-6`}
    >
      <img
        src={imageURL}
        alt="principal-photo"
        className={` w-full aspect-square object-cover rounded-xl sm:w-[40%] md:w-[30%]`}
      />
      <div
        id="message-principal"
        className="flex flex-col justify-center items-center sm:gap-2 py-12 pt-3 "
      >
        <h3 className="text-3xl text-red-500 font-semibold text-center ">
          Message From {role}{" "}
          <span className="text-yellow-500 text-5xl">"</span>
        </h3>
        <p className="text-justify">{message}</p>
      </div>
    </div>
  );
};

export default Message;
