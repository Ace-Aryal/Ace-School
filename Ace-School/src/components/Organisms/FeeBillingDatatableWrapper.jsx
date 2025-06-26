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
      const response = await databaseService.getClassFeeStats(grade);
      return response;
    },
  });
  if (isError) {
    return <p>Error</p>;
  }
  if (isLoading) {
    return (
      <div className="w-full h-full grid place-items-center">
        <p>Loading....</p>
      </div>
    );
  }

  let studentFeeStatusArray = [];
  const feeTotalsForClass = {
    totalDue: 0,
    totalPaid: 0,
  };
  if (studentsAttedanceRecods.documents.length > 0) {
    const monthlyRecords = studentsAttedanceRecods.documents.map((document) => {
      const splittedArray = document.$id.split("_");
      const studentDetails = {
        fname: splittedArray[0],
        lname: "",
        mname: "",
        roll: "",
        grade: "",
      };
      if (splittedArray.length === 5) {
        studentDetails.mname = splittedArray[1];
        studentDetails.lname = splittedArray[2];
        studentDetails.roll = splittedArray[3];
        studentDetails.grade = splittedArray[4];
      } else {
        studentDetails.lname = splittedArray[1];
        studentDetails.roll = splittedArray[2];
        studentDetails.grade = splittedArray[3];
      }

      return {
        monthlyRecord: [...JSON.parse(document.monthlyRecords)],
        name: studentDetails.fname + " " + studentDetails.lname,
        grade: studentDetails.grade,
        roll: studentDetails.roll,
        studentDocument: document,
      };
    });

    studentFeeStatusArray = monthlyRecords.map((student) => {
      console.log(student, "penalties");
      const studentFeeStatusObject = {
        name: student.name,
        grade: student.grade,
        rollNo: student.roll,
        monthPaid: 0,
        monthDue: 0,
        totalPaid: 0,
        totalDue: student.studentDocument.penalties || 0,
        studentDoc: student.studentDocument,
      };
      for (let index = 0; index < student.monthlyRecord.length; index++) {
        const recordMonth = student.monthlyRecord[index]; // recored month => month in student records
        studentFeeStatusObject.totalPaid += recordMonth.paid;
        studentFeeStatusObject.totalDue += recordMonth.due;
        feeTotalsForClass.totalDue += recordMonth.paid;
        feeTotalsForClass.totalDue += recordMonth.due;
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
        feeTotalsForClass={feeTotalsForClass}
      />
    </div>
  );
}

export default FeeBillingDatatableWrapper;
