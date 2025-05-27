import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../Atoms/button";
import { Eye, PenSquare, Trash2, Trash2Icon } from "lucide-react";
import { useDispatch } from "react-redux";
import { setEditingNotice } from "@/features/noticeSlice";
import databaseService from "@/appwrite/Database/database";
import { useQueryClient } from "@tanstack/react-query";
import { showSuccessToast, showErrorToast } from "../Templates/toast";
import Spinner from "../Atoms/Spinner";
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
    setDeleting(true);
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
    <tbody className="bg-gray-200 border-2 border-white ">
      <tr>
        <td
          className="border-r border-white"
          onClick={() => {
            handleItemClick(notice.seen, notice.$id);
          }}
        >
          {notice.$createdAt.slice(0, 10)}
        </td>
        <td
          className="border-r border-white"
          onClick={() => {
            handleItemClick(notice.seen, notice.$id);
          }}
        >
          {" "}
          {notice.author}
        </td>
        <td
          className="border-r border-white"
          onClick={() => {
            handleItemClick(notice.seen, notice.$id);
          }}
        >
          {notice.subject}
        </td>
        <td>
          {" "}
          {role === "admin" ? (
            <>
              <button
                onClick={handleNoticeUpdate}
                className="bg-zinc-800 text-white px-2 mx-1 py-1 rounded text-xs"
              >
                <PenSquare />
              </button>
              {deleting ? (
                <Button className="bg-red-500 text-white">
                  <Spinner />
                </Button>
              ) : (
                <button
                  onClick={handleNoticeDelete}
                  className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                >
                  <Trash2Icon />
                </button>
              )}
            </>
          ) : (
            <button
              onClick={() => navigate(`/notice/${notice.$id}`)}
              className="bg-zinc-800 text-white px-2 py-1 rounded text-xs"
            >
              <Eye />
            </button>
          )}
        </td>
      </tr>
    </tbody>
  );
};

export default NoticeListElement;
