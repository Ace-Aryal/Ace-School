import React from "react";
import { Link } from "react-router";
import { Button } from "../Atoms/button";
import { Eye, PenSquare, Trash2 } from "lucide-react";

const NoticeListElement = ({ data, role }) => {
  console.log(data);

  return (
    <>
      <Link className="grid grid-cols-9 col-span-8 text-center bg-white p-2 h-10 ">
        <div className="col-span-2 min-w-30">
          {data.$createdAt.slice(0, 10)}
        </div>

        <div className="col-span-3 min-w-40">{data.author}</div>
        <div className="col-span-4 min-w-50">{data.subject}</div>
      </Link>
      <div className="col-span-1 grid grid-cols-2 gap-1 content-center items-center h-10 min-w-20 bg-white">
        {role === "admin" ? (
          <>
            <Button className=" col-span-1 bg-blue-500 text-white">
              {" "}
              <PenSquare />{" "}
            </Button>
            <Button className="col-span-1 bg-red-500 text-white">
              <Trash2 />{" "}
            </Button>
          </>
        ) : (
          <Button className=" col-span-2 bg-blue-500 text-white">
            {" "}
            <Eye />{" "}
          </Button>
        )}
      </div>
    </>
  );
};

export default NoticeListElement;
