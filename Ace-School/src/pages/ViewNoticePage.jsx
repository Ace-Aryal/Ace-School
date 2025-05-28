import { Button } from "@/components/Atoms/button";
import NoticeListElement from "@/components/Molecules/NoticeListElement";
import { Pin } from "lucide-react";
import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import databaseService from "@/appwrite/Database/database";
import LoadingPage from "@/pages/LoadingPage";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { clearEditingNotice, setNotices } from "@/features/noticeSlice";
import NoticeElement from "@/components/Molecules/NoticeElementPage";
const ViewNoticePage = () => {
  const { fetchNotices } = databaseService;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notices = useSelector((state) => state.notice.notices);
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const roles = useSelector((state) => state.auth.user.roles);
  const { data, fetchNextPage, hasNextPage, isLoading, error } =
    useInfiniteQuery({
      queryKey: ["notices", NoticeElement],
      queryFn: fetchNotices,
      staleTime: 10 * 60 * 1000,
      refetchOnWindowFocus: true,

      getNextPageParam: (lastPage, allPages) => {
        // Return the cursor or pageParam for next fetch

        if (lastPage?.length === 20) {
          return lastPage[19].$id;
        }
        return undefined;
      },
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (data) {
      const dataArray = data?.pages?.flat(1);
      dispatch(setNotices(dataArray));
    }
  }, [data, NoticeElement]);

  if (isLoading) {
    return (
      <div className="w-full justify-center items-center">
        <LoadingPage />
      </div>
    );
  }
  if (error) {
    return <div>Error Fetching</div>;
  }

  return (
    <div className="w-full my-2 min-h-[100dvh] flex  flex-col items-center ">
      <div className="flex justify-between w-full items-center sm:w-4/5">
        <h1 className="text-3xl w-full sm:w-[80%]  text-zinc-800 font-semibold">
          Notices
        </h1>
        {roles.includes("admin") && (
          <Button
            onClick={() => {
              dispatch(clearEditingNotice());
              navigate("/notice/publish");
            }}
            className="w-fit self-end mr-3 hover:bg-zinc-600 text-gray-50 bg-zinc-800 cursor-pointer my-3"
          >
            Publish New Notice <Pin />
          </Button>
        )}
      </div>
      <div className="my-4 w-9/10 sm:w-4/5  text-sm sm:text-[1rem]  ">
        <div className="overflow-x-scroll w-full">
          <table className="min-w-full table-auto border border-gray-500 rounded-2xl   text-center text-zinc-700 ">
            <thead className=" text-zinc-800   ">
              <tr>
                <th className="px-4 py-2 border-r border-gray-300">
                  Published
                </th>
                <th className="px-4 py-3 border-r border-gray-300">Author</th>
                <th className="px-4 py-3 border-r border-gray-300">Subject</th>
                <th className="px-4 py-3 "> Actions</th>
              </tr>
            </thead>

            {notices.map((notice) => {
              return (
                <NoticeListElement
                  key={notice.$id}
                  role={roles[0]}
                  data={notice}
                />
              );
            })}
          </table>
        </div>
        <div ref={ref} className="w-full col-span-10 text-center">
          {!hasNextPage
            ? `End of results. Showed ${notices.length}/${notices.length}  entries`
            : "Scroll to load more"}
        </div>
      </div>{" "}
    </div>
  );
};

export default ViewNoticePage;
