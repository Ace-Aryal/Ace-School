import React from "react";
import { PiStarOfDavid } from "react-icons/pi";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import parse from "html-react-parser";
import ErrorPage from "@/pages/ErrorPage";
const NoticeElement = () => {
  const { id } = useParams();
  const notice = useSelector((state) =>
    state.notice?.notices?.find((notice) => notice.$id === id)
  );
  if (!notice) {
    return <ErrorPage />;
  }
  const { subject, message, author, $createdAt, $updatedAt, role } = notice;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg border my-8 print:p-4 print:shadow-none print:border-none">
      {/* Header */}
      <div className="flex flex-col items-center text-center border-b pb-4">
        <PiStarOfDavid size="3.5rem" />
        <h1 className="text-2xl font-bold uppercase">
          Shree Birendra Secondary School
        </h1>
        <p className="text-xs text-center">Bidur-6,Nuwakot</p>
        <p className="text-md text-gray-500">Official Notice</p>
      </div>

      {/* Dates */}
      <div className="flex justify-between text-sm text-gray-500 mt-4">
        <span>Created: {new Date($createdAt).toLocaleDateString()}</span>
        <span>Updated: {new Date($updatedAt).toLocaleDateString()}</span>
      </div>

      {/* Subject */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Subject: {subject}</h2>

      {/* Body */}
      <div className="text-base text-gray-800 whitespace-pre-wrap leading-relaxed">
        {parse(message)}
      </div>

      {/* Author */}
      <div className="text-left mt-8 text-gray-700 font-medium"> {author}</div>
      <div className="text-left text-gray-700 "> {role}</div>
    </div>
  );
};

export default NoticeElement;
