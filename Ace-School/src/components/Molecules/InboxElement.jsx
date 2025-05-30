import React, { useState } from "react";
import { Button } from "../Atoms/button";
import { Link, useNavigate } from "react-router";
import { Eye, Trash2 } from "lucide-react";
import databaseService from "@/appwrite/Database/database";
import { showErrorToast, showSuccessToast } from "../Templates/toast";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "../Atoms/Spinner";
import { useSelector } from "react-redux";
const InboxElement = ({ message }) => {
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const roles = useSelector((state) => state.auth.user.roles);
  const handleItemClick = async (seenStatus, messageID) => {
    navigate(`/inbox/${message.$id}`);
    if (seenStatus === true) {
      return;
    }

    await databaseService.updateMessages({
      adjustObject: { seen: true },
      documentID: messageID,
    });
    queryClient.invalidateQueries(["inboxMessages"]);
  };
  const handleItemDelete = async (documentID) => {
    setDeleting(true);
    const response = await databaseService.deleteMessages(documentID);
    if (response === true) {
      queryClient.invalidateQueries(["inboxMessages"]);
      showSuccessToast("Message deleted sucessfully !");
      setDeleting(false);
      return;
    }
    setDeleting(false);
    showErrorToast("Error deleting message !");
  };
  return (
    <tbody className="statEntry border-t border-gray-300">
      <tr
        className={
          message.seen
            ? "bg-gray-100 border-t border-gray-300"
            : "border-t border-gray-300"
        }
      >
        <td
          className="border-r border-gray-300"
          onClick={() => {
            handleItemClick(message.seen, message.$id);
          }}
        >
          {message.date}
        </td>
        <td
          className="border-r border-gray-300"
          onClick={() => {
            handleItemClick(message.seen, message.$id);
          }}
        >
          {" "}
          {message.fullName}
        </td>
        <td
          className="border-r border-gray-300"
          onClick={() => {
            handleItemClick(message.seen, message.$id);
          }}
        >
          {message.message}
        </td>
        {roles.includes("admin") ? (
          <td>
            {" "}
            {deleting ? (
              <Button className="bg-red-500 text-white">
                <Spinner />
              </Button>
            ) : (
              <button
                onClick={() => handleItemDelete(message.$id)}
                className="bg-red-500 text-white px-2 py-1 rounded text-xs"
              >
                <Trash2 />
              </button>
            )}
          </td>
        ) : (
          <td>
            <button
              onClick={() => {
                handleItemClick(message.seen, message.$id);
              }}
              className="bg-zinc-800 text-white px-2 py-1 rounded text-xs"
            >
              <Eye />
            </button>
          </td>
        )}
      </tr>
    </tbody>

    // <div
    //   key={message.$id}
    //   id={message.$id}
    //   className={`w-full my-1.5  rounded p-1  text-[#212121] shadow-lg ${
    //     message.seen ? "bg-[#E0E0E0]" : "bg-[#FAFAFA]"
    //   } grid grid-cols-5 text-center  items-center `}
    // >
    //   <div
    //     onClick={() => {
    //       handleItemClick(message.seen, message.$id);
    //     }}
    //     className="col-span-4 grid grid-cols-4 cursor-pointer"
    //   >
    //     <p className=" col-span-2">{message.fullName}</p>{" "}
    //     <p className=" col-span-2">{message.date}</p>{" "}
    //   </div>

    //   <Button
    //     onClick={() => handleItemDelete(message.$id)}
    //     className={` col-span-1 hover:bg-orange-600 ${
    //       message.seen ? "bg-red-400" : "bg-red-600"
    //     }`}
    //     variant="destructive"
    //   >
    //     {deleting ? "Deleting.." : <Trash2 />}
    //   </Button>
    // </div>
  );
};

export default InboxElement;
