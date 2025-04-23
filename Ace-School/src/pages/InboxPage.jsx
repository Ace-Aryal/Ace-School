import { Button } from "@/components/Atoms/button";
import React, { useEffect } from "react";
import { Link } from "react-router";
import { Trash2 } from "lucide-react";
import databaseService from "@/appwrite/Database/database";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
const InboxPage = () => {
  const { fetchMessages } = databaseService;
  const { data, isLoading, error, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["inboxMessages"],
      queryFn: async ({ pageParam = undefined }) => {
        return await fetchMessages(pageParam);
      },
      getNextPageParam: (lastpage, allpages) => {
        return undefined;
      },
    });
  const { ref, inView } = useInView({
    threshold: 1,
  });
  const messages = [
    {
      id: 1,
      name: "Ace",
      meaasge: " I Love You ",
      phone: "9703995700",
      date: "2025-04-09",
      seen: false,
    },
    {
      id: 2,
      name: "Dipesh Aryal",
      meaasge: " I Love You Baby ",
      phone: "9703995700",
      date: "2025-04-09",
      seen: true,
    },
  ];
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-4xl text-indigo-500 text-center font-semibold my-4">
        Inbox
      </h1>
      <div className="w-full sm:w-[80%] md:w-[70%] flex space-y-2  flex-col">
        <div
          className={`w-full grid text-center grid-cols-5 bg-orange-600 rounded-l col-span-4  p-2 font-semibold text-gray-100  shadow-lg  justify-around items-center `}
        >
          <p className="col-span-2"> Sender</p>
          <p className="col-span-2">Date</p>

          <div className="col-span-1 flex items-center font-semibold rounded-r text-gray-100 bg-orange-600">
            Actions
          </div>
        </div>

        {messages.map((message) => (
          <div
            key={message.id}
            id={message.id}
            className={`w-full  rounded-l p-1  text-[#212121] shadow-lg ${
              message.seen ? "bg-[#E0E0E0]" : "bg-[#FAFAFA]"
            } grid grid-cols-5 text-center  items-center `}
          >
            <Link className=" col-span-2">
              <p>{message.name}</p>
            </Link>
            <Link className="col-span-2">
              {" "}
              <p>{message.date}</p>{" "}
            </Link>

            <Button className="bg-red-600 col-span-1" variant="destructive">
              <Trash2 />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InboxPage;
