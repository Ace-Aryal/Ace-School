import React, { useState } from "react";
import { Button } from "../Atoms/button";
import { Link, useNavigate } from "react-router";
import { Trash2 } from "lucide-react";
import databaseService from "@/appwrite/Database/database";
import { showErrorToast, showSuccessToast } from "../Templates/toast";
import { useQueryClient } from "@tanstack/react-query";
const InboxElement = ({ message }) => {
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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
    <div
      key={message.$id}
      id={message.$id}
      className={`w-full my-1.5  rounded p-1  text-[#212121] shadow-lg ${
        message.seen ? "bg-[#E0E0E0]" : "bg-[#FAFAFA]"
      } grid grid-cols-5 text-center  items-center `}
    >
      <div
        onClick={() => {
          handleItemClick(message.seen, message.$id);
        }}
        className="col-span-4 grid grid-cols-4 cursor-pointer"
      >
        <p className=" col-span-2">{message.fullName}</p>{" "}
        <p className=" col-span-2">{message.date}</p>{" "}
      </div>

      <Button
        onClick={() => handleItemDelete(message.$id)}
        className={` col-span-1 hover:bg-orange-600 ${
          message.seen ? "bg-red-400" : "bg-red-600"
        }`}
        variant="destructive"
      >
        {deleting ? "Deleting.." : <Trash2 />}
      </Button>
    </div>
  );
};

export default InboxElement;
