import React, { useState } from "react";
import FeeBillingDatatable from "./Datatable/FeeBillingDatatable";
import { useQuery } from "@tanstack/react-query";
import databaseService from "@/appwrite/Database/database";
import { monthValue } from "@/utils/month";

function FeeBillingDatatableWrapper() {
  const [grade, setGrade] = useState("nursery");

  const {
    data: studentsAttedanceRecods,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["classFeeStat", grade],
    queryFn: async () => {
      console.log(grade);
      const response = await databaseService.getClassFeeStats(grade);
      return response;
    },
  });
  if (isError) {
    return <p>Error</p>;
  }
  if (isLoading) {
    return <div className="w-full h-full">Loading....</div>;
  }

  console.log(studentsAttedanceRecods, "att rec");
  let studentFeeStatusArray = [];
  if (studentsAttedanceRecods.documents.length > 0) {
    const monthlyRecords = studentsAttedanceRecods.documents.map((document) => {
      const [fname, lname, grade, roll] = document.$id.split("_");
      return {
        monthlyRecord: [...JSON.parse(document.monthlyRecords)],
        name: fname + " " + lname,
        grade,
        roll,
      };
    });

    studentFeeStatusArray = monthlyRecords.map((student) => {
      const studentFeeStatusObject = {
        name: student.name,
        grade: student.grade,
        rollNo: student.roll,
        monthPaid: 0,
        monthDue: 0,
        totalPaid: 0,
        totalDue: 0,
      };
      console.log("student", student);
      for (let index = 0; index < student.monthlyRecord.length; index++) {
        const recordMonth = student.monthlyRecord[index];
        studentFeeStatusObject.totalPaid += recordMonth.paid;
        studentFeeStatusObject.totalDue += recordMonth.due;
        if (recordMonth.month.toLowerCase() === monthValue.toLowerCase()) {
          studentFeeStatusObject.monthPaid = recordMonth.paid;
          studentFeeStatusObject.monthDue = recordMonth.due;
          break;
        }
      }
      return studentFeeStatusObject;
    });
  }

  return (
    <div>
      <FeeBillingDatatable
        grade={grade}
        setGrade={setGrade}
        data={studentFeeStatusArray}
      />
    </div>
  );
}

export default FeeBillingDatatableWrapper;
