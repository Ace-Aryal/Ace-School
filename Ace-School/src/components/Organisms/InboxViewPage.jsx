import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import dayjs from "dayjs";

const InboxViewPage = () => {
  const { id } = useParams();
  const inbox = useSelector((state) =>
    state?.inbox?.inbox.find((message) => message?.$id === id)
  );
  console.log(inbox);

  const { fullName, $createdAt, message, phone } = inbox;

  const date = dayjs($createdAt).format("DD/MM/YYYY/HH:mm");

  return (
    <main className="w-full flex justify-center">
      <div className="w-full gap-2 sm:w-[70%] md:w-[60%] mt-4 px-auto  flex flex-col border-1 m-2 p-2">
        <div>{fullName}</div>
        <hr />
        <div>{date}</div>
        <hr />
        <div className="my-3 text-justify">{message}</div>
        <div>{phone}</div>
      </div>
    </main>
  );
};

export default InboxViewPage;
