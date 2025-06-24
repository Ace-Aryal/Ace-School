import AuthenticatedContainer from "@/components/Templates/AuthenticatedContainer";
import React from "react";
import { useLocation } from "react-router";

function BillingActions() {
  const location = useLocation();
  if (!location.state) {
    return <p>Please Naviate Via Buttons</p>;
  }

  const { data } = location.state;
  const penaltyData = {
    totalPenalty: data.studentDoc.penalties,
    penaltyArray: data.studentDoc.penaltiesRecord,
  };
  const documentId = data.studentDoc.$id;
  return (
    <AuthenticatedContainer>
      <div className="w-full flex gap-3">
        <section className="transactions-section sm:w-2/3 bg-gray-100 w-full grow ">
          <p>This is transations section</p>
        </section>
        <section className="w-full sm:w-1/3 grow">
          <AddPenaltyCard
            prevPenaltyData={penaltyData}
            documentId={documentId}
          />
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

export function AddPenaltyCard({ documentId }) {
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
      } catch (error) {}
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
    const { response, error } = await catchError(() =>
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
