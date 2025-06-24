import React, { useState } from "react";
import { Select } from "../ui/select";
import { classLabels } from "@/utils/class";
import ClassFeeStatDisplay from "./ClassFeeStatDisplay";
import NepaliDate from "nepali-datetime";
import { monthMap, monthValue } from "@/utils/month";

function ClassFeeStatWrapper() {
  const [grade, setGrade] = useState("nursery");

  const [month, setMonth] = useState(monthValue);

  return (
    <div className="w-full ">
      <div className="flex justify-between items-center">
        <select
          className="p-1 border rounded-md border-zinc-500"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        >
          {classLabels.map((grade) => {
            return (
              <option key={grade.label} value={grade.grade}>
                {grade.label}
              </option>
            );
          })}
        </select>
        <select
          className="p-1 border rounded-md border-zinc-500"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          {monthMap.map((month) => {
            return (
              <option key={month.label} value={month.value}>
                {month.label}
              </option>
            );
          })}
        </select>
      </div>
      <div className="mt-2">
        <ClassFeeStatDisplay month={month} grade={grade} />
      </div>
    </div>
  );
}

export default ClassFeeStatWrapper;
