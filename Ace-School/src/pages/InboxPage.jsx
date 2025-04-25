import { Button } from "@/components/Atoms/button";
import React, { useEffect } from "react";
import { Link } from "react-router";
import { Trash2 } from "lucide-react";
import databaseService from "@/appwrite/Database/database";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import LoadingPage from "@/components/Organisms/LoadingPage";
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

  const messages = data?.pages?.flat(1);
  dispatch(setMessages(messages));

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-4xl text-indigo-500 text-center font-semibold my-4">
        Inbox
      </h1>

      <div className="w-full sm:w-[80%] md:w-[70%] flex  flex-col">
        <div
          className={`w-full grid text-center my-0.5 grid-cols-5 bg-orange-600 rounded col-span-4  p-2 font-semibold text-gray-100  shadow-lg  justify-around items-center `}
        >
          <p className="col-span-2"> Sender</p>
          <p className="col-span-2">Date</p>

          <div className="col-span-1 flex items-center font-semibold rounded text-gray-100 bg-orange-600">
            Actions
          </div>
        </div>
        <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 max-h-[70dvh]">
          {/* content */}

          {messages?.map((message) => (
            <InboxElement message={message} />
          ))}
          <div ref={ref} className="w-full text-center">
            {!hasNextPage ? "End of results" : "Scroll to load more"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxPage;
