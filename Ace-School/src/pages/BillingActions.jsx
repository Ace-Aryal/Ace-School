import AuthenticatedContainer from "@/components/Templates/AuthenticatedContainer";
import React from "react";
import { useLocation } from "react-router";

function BillingActions() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  if (!location.state || !location.state.data) {
    return <p>Please Naviate Via Buttons</p>;
  }

  const { data } = location.state;

  const penaltyData = {
    totalPenalty: data.studentDoc.penalties,
    penaltyArray: data.studentDoc.penaltiesRecord,
  };
  const [penalties, setPenalties] = useState({
    amount: penaltyData.totalPenalty,
    penaltiesArray:
      penaltyData.penaltyArray.length > 0
        ? JSON.parse(penaltyData.penaltyArray[0])
        : [],
  });

  console.log("penaltyArr", penaltyData.penaltyArray);
  const documentId = data.studentDoc.$id;
  return (
    <AuthenticatedContainer classnames="justify-center">
      <div className="w-full flex justify-center  flex-col sm:flex-row gap-3">
        <section className="transactions-section sm:w-2/3  w-full grow ">
          <StudentBillingUI documentId={documentId} />
        </section>
        <section className="w-full h-full sm:w-1/3 grow">
          <AddPenaltyCard
            setPenalties={setPenalties}
            prevPenaltyData={penaltyData}
            documentId={documentId}
          />
          <div className="flex p-4 mt-3 items-center justify-between border border-gray-300 rounded-xl mb-4">
            <Button
              onClick={() => setOpen(true)}
              className="bg-blue-100 text-blue-600 hover:bg-blue-200 font-semibold w-full"
            >
              View Penalties
            </Button>
            <PenaltyTableModal
              open={open}
              onOpenChange={setOpen}
              penalties={penalties.penaltiesArray}
              studentDoc={data.studentDoc}
            />
          </div>
          <div className="hidden sm:block mb-3 w-full">
            <TinyCalculator />
          </div>

          <div>{/* <input value={set} type="text" disabled /> */}</div>
        </section>
      </div>
    </AuthenticatedContainer>
  );
}

export default BillingActions;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import NepaliDate from "nepali-datetime";
import { todayDate } from "@/utils/datetime";
import { catchError } from "@/utils/catchError";
import databaseService from "@/appwrite/Database/database";
import config from "@/appwrite";
import { useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "@/components/Templates/toast";
import Spinner from "@/components/Atoms/Spinner";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function AddPenaltyCard({ documentId, setPenalties }) {
  const accountant = useSelector((state) => state.auth.user.username);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const {
    data: studentFeeData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["studentFeeStat"],
    queryFn: async () => {
      try {
        const response = await databaseService.getDocument(
          config.feeRecordColletionId,
          documentId
        );
        return response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });

  if (isError) {
    return <p>Error</p>;
  }
  if (isLoading) {
    return <div className="w-full h-full">Loading....</div>;
  }
  const handlePenalty = async (data) => {
    const prevPenaltyArray =
      studentFeeData.penaltiesRecord.length > 0
        ? JSON.parse(studentFeeData.penaltiesRecord[0] || [])
        : [];
    const penaltyAmount =
      studentFeeData.penalties + parseInt(data.penaltyAmount);
    const newPenaltyArray = [
      {
        amt: parseInt(data.penaltyAmount),
        date: todayDate,
        reason: data.reason,
        acc: accountant,
      },
    ];
    const penaltyRecord = JSON.stringify([
      ...prevPenaltyArray,
      ...newPenaltyArray,
    ]);
    const { response } = await catchError(() =>
      databaseService.updateUserDocument(
        config.feeRecordColletionId,
        documentId,
        {
          penalties: penaltyAmount,
          penaltiesRecord: [penaltyRecord],
        }
      )
    );
    if (!response) {
      return showErrorToast("Error registering penalty");
    }

    showSuccessToast("Added penalty succesfully !");
    setPenalties({
      amount: penaltyAmount,
      penaltiesArray: JSON.parse(penaltyRecord),
    });
    reset();
    queryClient.invalidateQueries(["classFeeStat", "studentFeeStat"]);
  };

  return (
    <Card className=" bg-orange-100 text-orange-700 shadow-md flex flex-col">
      <CardHeader>
        <CardTitle className="text-orange-700 text-xl">Add Penalty</CardTitle>
      </CardHeader>

      <form action="" onSubmit={handleSubmit(handlePenalty)}>
        <CardContent className="flex flex-col gap-4 flex-1">
          <div>
            <label className="block mb-1 font-medium text-sm">
              Amount(Rs.)
            </label>
            <Input
              step="0.01"
              {...register("penaltyAmount", {
                required: "Penalty is required",
                min: {
                  value: 0,
                  message: "Enter valid value",
                },
              })}
              type="number"
              placeholder="Enter amount"
              className="bg-white text-orange-700"
            />
            {errors.penaltyAmount && (
              <p className="text-sm text-red-500">
                {errors.penaltyAmount.message}
              </p>
            )}
          </div>

          <div className="flex-1">
            <label className="block mb-1 font-medium text-sm">Reason</label>
            <Textarea
              {...register("reason", {
                required: "Reason is required",
                minLength: {
                  value: 10,
                  message: "Value must be at least 10 chars long",
                },
              })}
              placeholder="Enter reason (max 64 characters,min 10)"
              className="h-full bg-white text-orange-700 resize-none"
              maxLength={64}
            />
            {errors.reason && (
              <p className="text-sm text-red-500">{errors.reason.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="mt-auto self-end bg-orange-600 hover:bg-orange-700 text-white"
          >
            {isSubmitting ? <Spinner /> : "Submit"}
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}

import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AlertDialogComponent from "@/components/Molecules/AlertDialog";
import GeneralErrorPage from "./GeneralErrorPage";
import LoadingPage from "./LoadingPage";
import { getMonthlyAndTotalFeeData } from "@/utils/studentFeeStat";
import PenaltyTableModal from "./PenaltiesViewPage";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller } from "react-hook-form";
import { feeBillingSchema } from "@/utils/schemas";
import TinyCalculator from "@/components/Organisms/TinyCalculator";
export function StudentBillingUI({ documentId }) {
  const queryClient = useQueryClient();
  const {
    data: studentFeeData,
    isError: feeError,
    isLoading: feeLoading,
  } = useQuery({
    queryKey: ["studentFeeStat"],
    queryFn: async () => {
      try {
        const response = await databaseService.getDocument(
          config.feeRecordColletionId,
          documentId
        );
        return response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });
  const { username, roles } = useSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    control,
    reset,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(feeBillingSchema),
  });

  if (feeError) {
    return <GeneralErrorPage message="Internal server error" />;
  }
  if (feeLoading) {
    return (
      <div className="w-full h-full">
        <LoadingPage />
      </div>
    );
  }
  if (!studentFeeData.$id) {
    return <GeneralErrorPage message="Document not found" />;
  }
  const {
    name,
    grade,
    rollNo,
    scholarship,
    disc,
    penalties,
    transactionsRecord: statementsRecord,
  } = studentFeeData;
  const {
    dueTotal,
    paidTotal,
    paidFees: paidThisMonth,
    dueFees: dueThisMonth,
    payableFeesWholeYear,
  } = getMonthlyAndTotalFeeData(studentFeeData);
  const handleFeeBilling = async (formData) => {
    const {
      amount: originalAmount,
      payer,
      methodOfPayment,
      remarks,
    } = formData;
    console.log(formData, "form data");
    let amount = originalAmount;
    const prevMonthlyRecords = JSON.parse(studentFeeData.monthlyRecords[0]);
    const penaltyAmount = parseFloat(studentFeeData.penalties);
    let updatedPenaltyAmount = penaltyAmount;
    let updatedUserMonthlyRecord = prevMonthlyRecords;
    let yearCredit = 0;
    if (amount < penaltyAmount) {
      updatedPenaltyAmount = penaltyAmount - amount;
      amount = 0;
    }

    if (amount > penaltyAmount) {
      amount = amount - penaltyAmount;
      updatedPenaltyAmount = 0;
      updateMonthlyRecord();
    }
    function updateMonthlyRecord() {
      updatedUserMonthlyRecord = prevMonthlyRecords.map((record) => {
        if (amount === 0 || record.due === 0) {
          return record;
        }
        if (amount < record.due) {
          const due = record.due - amount;
          amount = 0;
          return {
            ...record,
            due,
            paid: record.totalPayable - due,
          };
        }
        amount = amount - record.totalPayable;
        console.log(record);
        return {
          ...record,
          due: 0,
          paid: record.totalPayable,
        };
      });
      yearCredit = amount;
    }
    const statement = {
      date: todayDate,
      payer,
      methodOfPayment,
      amount: originalAmount,
      remarks,
    };
    console.log("statement rec", statementsRecord);
    const prevStatementRecord = statementsRecord[0];
    const updatedStatementsRecord = {
      yearCredit,
      statements: statementsRecord[0]
        ? [...statementsRecord[0].statements, statement]
        : [statement],
    };
    const studentFeeTransaction = {
      date: todayDate,
      accountant: username,
      studentName: name,
      grade,
      roll: rollNo,
      amount: originalAmount,
      method: methodOfPayment,
      payer,
    };

    const { response: updatingStudentFeeRes } = await catchError(() =>
      databaseService.updateStudentFeeRecord(documentId, {
        penalties: updatedPenaltyAmount,
        monthlyRecords: [JSON.stringify(updatedUserMonthlyRecord)],
        transactionsRecord: [JSON.stringify(updatedStatementsRecord)],
      })
    );
    console.log(updatingStudentFeeRes, "fee 1 res");
    if (!updatingStudentFeeRes) {
      return showErrorToast("Failed to update student fees 1");
    }
    const { response: creatingStudentTransactionRes } = await catchError(() =>
      databaseService.createFeeTransaction(studentFeeTransaction)
    );
    if (!creatingStudentTransactionRes) {
      await databaseService.updateStudentFeeRecord(documentId, {
        penalties: penaltyAmount,
        monthlyRecords: [JSON.stringify(prevMonthlyRecords)],
        transactionsRecord: prevStatementRecord,
      });
      return showErrorToast("Failed to update student fees 2");
    }
    const { response: handleFeeStatRespone } = await catchError(() =>
      databaseService.createOrUpdateSchoolTransactionsStatRecord(originalAmount)
    );
    if (!handleFeeStatRespone) {
      await databaseService.updateStudentFeeRecord(documentId, {
        penalties: penaltyAmount,
        monthlyRecords: [JSON.stringify(prevMonthlyRecords)],
        transactionsRecord: prevStatementRecord,
      });
      await databaseService.deleteCollection(
        config.dailyFeeTransactionsId,
        creatingStudentTransactionRes.$id
      );
      return showErrorToast("Failed to update student fees 3");
    }
    const { response: createLogRespone } = await catchError(() =>
      databaseService.createActivityLog(
        "Fee Billing",
        `Fee Billing of Rs.${originalAmount} for ${name}, grade ${grade}, roll ${rollNo}`,
        `Name : ${username} , Role : ${roles[0]}`
      )
    );

    console.log("create log response", createLogRespone);
    if (!createLogRespone) {
      await databaseService.updateStudentFeeRecord(documentId, {
        penalties: penaltyAmount,
        monthlyRecords: [JSON.stringify(prevMonthlyRecords)],
        transactionsRecord: prevStatementRecord,
      });
      await databaseService.deleteCollection(
        config.dailyFeeTransactionsId,
        creatingStudentTransactionRes.$id
      );
      await databaseService.createOrUpdateSchoolTransactionsStatRecord(
        originalAmount,
        true
      );
      return showErrorToast("Failed to update student fees 4");
    }
    queryClient.invalidateQueries("studentFeeStat");
    reset();
    return showSuccessToast("Billing sucessful!");
  };
  return (
    <div className="w-full px-2 mx-auto  grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* Left Section: Student Info */}
      <Card className="border border-gray-300">
        <CardHeader>
          <CardTitle>Student Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="capitalize">
            <strong>Name:</strong> {name}
          </div>
          <div>
            <strong>Roll:</strong> {rollNo}
          </div>
          <div className="capitalize ">
            <strong>Grade:</strong> {grade}
          </div>
          <div>
            <strong>Due Fee (This Month):</strong> Rs. {dueThisMonth}
          </div>
          <div>
            <strong>Total Due Fee:</strong> Rs. {dueTotal}
          </div>
          <div>
            <strong>Total Payable Fee (Year):</strong> Rs.{" "}
            {payableFeesWholeYear}
          </div>
          <div>
            <strong>Scholarship (%):</strong> {scholarship}%
          </div>
          <div>
            <strong>Discount:</strong> Rs. {disc}
          </div>
          <div>
            <strong>Paid (This Month):</strong> Rs. {paidThisMonth}
          </div>
          <div>
            <strong>Total Paid (Till Now):</strong> Rs. {paidTotal}
          </div>
          <div>
            <strong>Penalty Amount:</strong> Rs. {penalties}
          </div>
          <Button className="mt-4 w-full  bg-blue-100 font-semibold text-blue-600 hover:bg-blue-200">
            View Statements
          </Button>
        </CardContent>
      </Card>

      {/* Right Section: Fee Billing Form */}
      <Card className="border border-gray-300">
        <CardHeader>
          <CardTitle>Billing Form</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 flex flex-col h-full">
          <div className="space-y-1">
            <Label>Amount Paid</Label>
            <Input
              {...register("amount", {
                required: "This field is required",
              })}
              type="number"
              className="focus:ring-gray-300"
              placeholder="Enter amount"
            />
            {errors.amount && (
              <p className="text-red-600 text-sm">{errors.amount.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label>Payment Method</Label>

            <Controller
              name="methodOfPayment"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="digital">Digital</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.methodOfPayment && (
              <p className="text-red-600 text-sm">
                {errors.methodOfPayment.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label>Paid By</Label>

            <Input
              {...register("payer")}
              placeholder="Enter payer's name "
              className="focus:ring-gray-300"
            />
            {errors.payer && (
              <p className="text-red-600 text-sm">{errors.payer.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label>Remarks</Label>
            <Input
              {...register("remarks")}
              placeholder="Optional remarks (max 32 chars)"
              className="focus:ring-gray-300"
            />
            {errors.remarks && (
              <p className="text-red-600 text-sm"> {errors.remarks.message}</p>
            )}
          </div>
          <div className="mt-auto w-full">
            <AlertDialogComponent
              onContinueFn={handleSubmit(handleFeeBilling)}
              cancelButtonColor="bg-red-100 text-red-600 hover:bg-red-200"
              continueButtonColor="bg-blue-100 text-blue-600 hover:bg-blue-200"
              title="Sure want to bill this payment ?"
              description="This will bill the fee of the student, make sure all entries are correct. This action is irreversible and 
              may take a few seconds."
              buttonText="Submit payment"
            ></AlertDialogComponent>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
