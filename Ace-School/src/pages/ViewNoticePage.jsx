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
  console.log(notices);

  return (
    <div className="w-full mx-2 my-2 min-h-[100dvh] flex  flex-col items-center ">
      <h1 className="text-4xl text-center text-indigo-500 font-bold">
        Notices
      </h1>
      {roles.includes("admin") && (
        <Button
          onClick={() => {
            dispatch(clearEditingNotice());
            navigate("/notice/publish");
          }}
          className="w-fit self-end hover:bg-orange-600 text-gray-50 bg-red-500 cursor-pointer my-3"
        >
          Publish New Notice <Pin />
        </Button>
      )}
      <div className="my-4 w-[95vw] sm:w-[90%] text-sm sm:text-[1rem] overflow-x-scroll ">
        <div className="grid grid-cols-10 sm:grid-cols-9 my-1  bg-orange-500  space-x-0 px-1 max-h-[70vh]  rounded w-full  ">
          <div className="grid grid-cols-9   space-x-0 bg-orange-500  text-white p-2 text-[1rem] sm:text-lg col-span-8 text-center">
            <div className="col-span-2 sm:min-w-30">Published</div>

            <div className="col-span-3 sm:min-w-40">Author</div>
            <div className="col-span-4 sm:min-w-50">Subject</div>
          </div>
          <div className="col-span-2 sm:min-w-20 sm:col-span-1   text-white grid grid-cols-1 justify-center items-center ">
            <span className=" w-full text-center ">Actions</span>
          </div>
        </div>
        <div className="grid grid-cols-9 my-1 space-y-2 max-h-[70vh] overflow-y-scroll rounded ">
          {notices.map((notice) => {
            return (
              <NoticeListElement
                key={notice.$id}
                role={roles[0]}
                data={notice}
              />
            );
          })}
          <div ref={ref} className="w-full col-span-9 text-center">
            {!hasNextPage
              ? `End of results. Showed ${notices.length}/${notices.length}  entries`
              : "Scroll to load more"}
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default ViewNoticePage;
