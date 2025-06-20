import { Button } from "@/components/Atoms/button";
import React, { useEffect } from "react";
import { Link } from "react-router";
import { Trash2 } from "lucide-react";
import databaseService from "@/appwrite/Database/database";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import LoadingPage from "@/pages/LoadingPage";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import InboxElement from "@/components/Molecules/InboxElement";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "@/features/inboxSlice";
const InboxPage = () => {
  const dispatch = useDispatch();
  const { fetchMessages } = databaseService;
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const messages = useSelector((state) => state.inbox.inbox);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
    isSuccess,
  } = useInfiniteQuery({
    queryKey: ["inboxMessages"],
    queryFn: fetchMessages,

    refetchOnMount: true,
    refetchOnWindowFocus: true,
    getNextPageParam: (lastPage, allPages) => {
      // Return the cursor or pageParam for next fetch

      if (lastPage.length === 20) {
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
    const messages = data?.pages?.flat(1);
    dispatch(setMessages(messages));
  }, [data]);

  if (isLoading) {
    return <LoadingPage />;
  }
  if (error) {
    return <div>Error Fetching</div>;
  }

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-3xl text-zinc-800 w-full md:max-w-[80%] font-semibold my-4">
        Inbox
      </h1>

      <div className="w-9/10 sm:w-[80%]  flex  flex-col">
        <div className="overflow-x-scroll w-full">
          <table className="min-w-full table-auto border border-gray-300   text-center text-zinc-700  ">
            <thead className=" text-zinc-800  ">
              <tr className="bg-gray-200 border-b  border-gray-300">
                <th className="px-4 py-2 border-r border-gray-300">
                  Published
                </th>
                <th className="px-4 py-3 border-r border-gray-300">Author</th>
                <th className="px-4 py-3 border-r border-gray-300">Subject</th>
                <th className="px-4 py-3 "> Actions</th>
              </tr>
            </thead>

            {messages?.map((message) => (
              <InboxElement message={message} />
            ))}
          </table>
          <div ref={ref} className="w-full text-center">
            {!hasNextPage ? "End of results" : "Scroll to load more"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxPage;
