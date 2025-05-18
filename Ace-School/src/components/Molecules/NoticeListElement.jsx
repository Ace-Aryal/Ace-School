import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../Atoms/button";
import { Eye, PenSquare, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { setEditingNotice } from "@/features/noticeSlice";
import databaseService from "@/appwrite/Database/database";
import { useQueryClient } from "@tanstack/react-query";
import { showSuccessToast, showErrorToast } from "../Templates/toast";
const NoticeListElement = ({ data: notice, role }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deleting, setDeleting] = useState(false);
  const handleItemClick = async (seenStatus, noticeID) => {
    navigate(`/notice/${noticeID}`);
  };
  const handleNoticeUpdate = () => {
    dispatch(setEditingNotice(notice));
    navigate("/notice/update");
  };
  const handleNoticeDelete = async () => {
    setDeleting(false);
    const response = await databaseService.deleteNotice(notice.$id);
    if (response === true) {
      showSuccessToast("Notice deleted sucessfully !");
      setDeleting(false);
      queryClient.invalidateQueries(["notices"]);
      return;
    }
    setDeleting(false);
    showErrorToast("Error deleting message !");
  };
  return (
    <>
      <div
        onClick={() => {
          handleItemClick(notice.seen, notice.$id);
        }}
        className={`grid cursor-pointer grid-cols-9 col-span-8 text-center  p-2 h-10 ${
          notice.seen ? "bg-white" : "bg-white"
        }`}
      >
        <div className="col-span-2 min-w-30">
          {notice.$createdAt.slice(0, 10)}
        </div>

        <div className="col-span-3 min-w-40">{notice.author}</div>
        <div className="col-span-4 min-w-50">{notice.subject}</div>
      </div>
      <div
        className={`col-span-1 grid grid-cols-2 gap-1 content-center items-center h-10 min-w-20 ${
          notice.seen ? "bg-white" : "bg-white"
        }`}
      >
        {role === "admin" ? (
          <>
            <Button
              onClick={handleNoticeUpdate}
              className=" col-span-1 bg-blue-500 text-white"
            >
              {" "}
              <PenSquare />{" "}
            </Button>
            <Button
              onClick={handleNoticeDelete}
              className="col-span-1 bg-red-500 text-white"
            >
              {deleting ? "..." : <Trash2 />}{" "}
            </Button>
          </>
        ) : (
          <Button
            onClick={() => {
              navigate(`/notice/${notice.$id}`);
            }}
            className=" col-span-2 bg-blue-500 text-white"
          >
            {" "}
            <Eye />{" "}
          </Button>
        )}
      </div>
    </>
  );
};

export default NoticeListElement;
