import { showErrorToast, showSuccessToast } from "@/components/Templates/toast";

import functionService from "@/appwrite/functions/function";
import databaseService from "@/appwrite/Database/database";
import { catchError } from "./catchError";
import { classMapFromNumericToAlphanumeric } from "./class";
import config from "@/appwrite";
import NepaliDate from "nepali-datetime";
import { monthMap } from "./month";
export const updateUser = async (
  data,
  {
    reset,
    navigate,
    documentID,
    collectionID,
    userRole,
    originalEmail,
    originalDOB,
    originalJoiningDate,
    authorInfo,
  }
) => {
  // expecting captalized user role
  let formattedDOB;
  let formattedJoiningDate;
  let navigationLocation;
  let description;
  if (data.DOB !== originalDOB) {
    formattedDOB = data.DOB ? data.DOB.bsDate : "";
  }
  if (
    (userRole.toLowerCase() === "teacher" ||
      userRole.toLowerCase() === "staff") &&
    data.joiningDate !== originalJoiningDate
  ) {
    formattedJoiningDate = data.joiningDate ? data.joiningDate.bsDate : "";
  }

  let email;
  let name;
  let updatedDocument;
  let feeId;
  if (userRole.toLowerCase() === "student") {
    email = `${data.studentName}${data.grade}${data.rollNo}@sbss.edu`
      .toLowerCase()
      .replaceAll(" ", "");
    feeId = `${data.studentName.replaceAll(" ", "_")}_${data.grade}_${
      data.rollNo
    }`
      .toLowerCase()
      .replaceAll(" ", "");
    const studentData = JSON.parse(JSON.stringify(data));
    delete studentData.admission;
    delete studentData.transportation;
    delete studentData.hostel;
    navigationLocation = "/view-students";
    name = data.studentName;
    updatedDocument = {
      ...studentData,
      email,
      phoneNumber: data.phoneNumber.trim(),
      discount: Number(data.discount.trim()),
      scholarship: Number(data.scholarship.trim()),
      DOB: formattedDOB,
    };
    description = `Registered ${name} grade: ${data.grade} roll: ${data.rollNo}`;
  }
  if (userRole.toLowerCase() === "teacher") {
    email = data.email;
    name = data.teacherName;
    navigationLocation = "/view-teachers";
    updatedDocument = {
      ...data,

      joiningDate: formattedJoiningDate,
      DOB: formattedDOB,
      classes: JSON.stringify(data.classes), // Assuming classes is an array of objects {value, label}
      subjectsTaught: JSON.stringify(data.subjectsTaught),
    };
    description = `Registered ${name} Id: ${data.teacherId}`;
  }
  if (userRole.toLowerCase() === "staff") {
    email = data.email;
    name = data.fullName;
    navigationLocation = "/view-staffs";
    userRole = data.role; // staff has multiple roles so mutating userrole
    updatedDocument = {
      ...data,
      joiningDate: formattedJoiningDate,
      DOB: formattedDOB,
    };
    description = `Registered ${name} Id: ${data.staffId}`;
  }

  try {
    if (email !== originalEmail) {
      const emailAlreadyExists = await databaseService.getUserDocument(email);

      if (emailAlreadyExists.total !== 0) {
        showErrorToast("Updated email already exists in database");
        return;
      }
      const [response, metadataFetchResponse] = await Promise.all([
        functionService.deleteUser(originalEmail),
        await databaseService.getUserDocument(originalEmail),
      ]);
      if (response?.responseStatusCode !== 200) {
        showErrorToast("Failed to delete user");
        return;
      }

      const responseBody = JSON.parse(response.responseBody);

      if (!responseBody.success) {
        showErrorToast("Failed to update user");
        return;
      }

      if (!metadataFetchResponse) {
        showErrorToast("Could'nt fetch metadata");
        return;
      }
      const updatedMetadataDocument = { email, name, role: userRole };
      const documentID = metadataFetchResponse.documents[0]?.$id;
      const metadataUpdateResponse = await databaseService.updateUserMetaData(
        updatedMetadataDocument,
        documentID
      );
      if (!metadataUpdateResponse) {
        showErrorToast("Could'nt update metadata  ");
        return;
      }
      showSuccessToast("Metadata Updated sucessfully");
    }
    // only update
    const response = await databaseService.updateUserDocument(
      collectionID,
      documentID,
      updatedDocument
    );
    if (!response) {
      showErrorToast("Error updating user document");
      return;
    }
    // update fee bill
    const { response: getRecordDocRes, error } = await catchError(() =>
      databaseService.getDocument(config.feeRecordColletionId, feeId)
    );
    if (!response) {
      return showErrorToast("Failed to get fee data, retry");
    }
    console.log(getRecordDocRes, "get resp");

    const { response: FeeTemplateResponse, error: FeeTemplateError } =
      await catchError(databaseService.getFeeTemplate);
    if (!FeeTemplateResponse || FeeTemplateError) {
      return showErrorToast("Failed to fetch fee template");
    }
    const alphabeticalGrade = classMapFromNumericToAlphanumeric[data.grade];
    const gradeFees = JSON.parse(FeeTemplateResponse[alphabeticalGrade]);
    const updatedHostelFee =
      data.hostel.toLowerCase() === "yes" ? Number(gradeFees.hostel) : 0;
    const {
      transportationFees,
      scholarship,
      disc,
      hostelFees,
      monthlyRecords,
    } = getRecordDocRes;
    const {
      transportation: updatedTransportation,
      discount: updatedDiscount,
      scholarship: updatedScholarship,
    } = data;
    console.log(hostelFees, updatedHostelFee);
    if (
      transportationFees === Number(updatedTransportation || 0) &&
      disc === Number(updatedDiscount) &&
      scholarship === Number(updatedScholarship) &&
      hostelFees === Number(updatedHostelFee)
    ) {
      return showSuccessToast("Document Updated sucessfully");
    }

    const monthIndex = new NepaliDate().getMonth();
    const monthlyRecordsArray = JSON.parse(monthlyRecords);
    const updatedMonthlyRecordArray = monthlyRecordsArray.map(
      (month, index) => {
        if (index < monthIndex) {
          return month;
        }
        const originalTotalPayable =
          month.totalPayable - transportationFees - hostelFees; // this removes extra fees

        const updatedTotalpayable =
          originalTotalPayable +
          Number(updatedTransportation) +
          updatedHostelFee;
        const updatedDue = updatedTotalpayable - month.paid;
        return {
          ...month,
          due: updatedDue,
          totalPayable: updatedTotalpayable,
        };
      }
    );
    console.log(monthlyRecordsArray, "rcds");

    console.log(updatedMonthlyRecordArray, "arr");

    const { response: updateFeeRes } = await catchError(() =>
      databaseService.updateUserDocument(config.feeRecordColletionId, feeId, {
        transportationFees: parseFloat(updatedTransportation),
        hostelFees: parseFloat(updatedHostelFee),
        disc: parseFloat(updatedDiscount),
        scholarship: parseFloat(updatedScholarship),
        monthlyRecords: [JSON.stringify(updatedMonthlyRecordArray)],
      })
    );
    showSuccessToast("Document Updated sucessfully");
    if (!updateFeeRes) {
      return showErrorToast("Server error, couldn't update fees, retry later");
    }
    const activityLogCreationResp = await catchError(() =>
      databaseService.createActivityLog(
        `updated ${userRole}`,
        description,
        authorInfo
      )
    );

    // navigate(navigationLocation);
  } catch (error) {
    console.error(error);
    showErrorToast("Failed to update document");
  }
};
