import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
export const colorMap = {
  red: {
    background: "bg-red-100",
    text: "text-red-600",
    heading: "text-red-700",
  },
  blue: {
    background: "bg-blue-100",
    text: "text-blue-600",
    heading: "text-blue-700",
  },
  lime: {
    background: "bg-lime-100",
    text: "text-lime-600",
    heading: "text-lime-700",
  },
  yellow: {
    background: "bg-yellow-100",
    text: "text-yellow-600",
    heading: "text-yellow-700",
  },
  green: {
    background: "bg-green-100",
    text: "text-green-600",
    heading: "text-green-700",
  },
  violet: {
    background: "bg-violet-100",
    text: "text-violet-600",
    heading: "text-violet-700",
  },
  orange: {
    background: "bg-orange-100",
    text: "text-orange-600",
    heading: "text-orange-700",
  },
  rose: {
    background: "bg-rose-100",
    text: "text-rose-600",
    heading: "text-rose-700",
  },
  cyan: {
    background: "bg-cyan-100",
    text: "text-cyan-600",
    heading: "text-cyan-700",
  },
  indigo: {
    background: "bg-indigo-100",
    text: "text-indigo-600",
    heading: "text-indigo-700",
  },
  teal: {
    background: "bg-teal-100",
    text: "text-teal-600",
    heading: "text-teal-700",
  },
  pink: {
    background: "bg-pink-100",
    text: "text-pink-600",
    heading: "text-pink-700",
  },
  // Default fallback (zinc)
  default: {
    background: "bg-zinc-50",
    text: "text-zinc-700",
    heading: "text-zinc-800",
  },
};
const StatElement = ({ color, icon, statNumber, statHeading, item }) => {
  const { roles } = useSelector((state) => state.auth.user);
  const [colorSet, setColorSet] = useState(colorMap.default);

  useEffect(() => {
    setColorSet(colorMap[color] ?? colorMap.default);
  }, []);

  return (
    <Link
      className={`shadow-lg statEntry ${colorSet.background}    hover:bg-gray-100 shadow-black/30 border myshadow  rounded-xl border-gray-200 flex items-center justify-center sm:justify-between`}
      to={
        item.readers.some((reader) => roles?.includes(reader)) ? item.link : "/"
      }
      key={item.statHeading}
    >
      <div
        className={`p-4 flex  rounded items-center justify-between w-full   `}
      >
        <div className={`flex flex-col  `}>
          <h3 className={`text-3xl  font-medium ${colorSet.heading}`}>
            {statNumber}
          </h3>
          <p className={`text ${colorSet.text}`}>{statHeading}</p>
        </div>
        <div>{icon}</div>
      </div>
    </Link>
  );
};

export default StatElement;
