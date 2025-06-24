import { showErrorToast, showSuccessToast } from "@/components/Templates/toast";

import functionService from "@/appwrite/functions/function";
import databaseService from "@/appwrite/Database/database";
import { catchError } from "./catchError";
import { classMapFromNumericToAlphanumeric } from "./class";
import config from "@/appwrite";
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
  }
) => {
  // expecting captalized user role
  let formattedDOB;
  let formattedJoiningDate;
  let navigationLocation;
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
    const { response: FeeTemplateResponse, error: FeeTemplateError } =
      await catchError(databaseService.getFeeTemplate);
    if (!FeeTemplateResponse || FeeTemplateError) {
      return showErrorToast("Failed to fetch fee template");
    }
    const miscellenous = parseFloat(FeeTemplateResponse.miscellenous);
    const alphabeticalGrade = classMapFromNumericToAlphanumeric[data.grade];
    const gradeFees = JSON.parse(FeeTemplateResponse[alphabeticalGrade]);
    const admissionFee =
      data.admission.toLowerCase() === "new"
        ? gradeFees.newAdmission
        : gradeFees.oldAdmission;
    const hostelFee =
      data.hostel.toLowerCase() === "yes" ? gradeFees.hostel : 0;
    const uniform = parseFloat(gradeFees.uniform);

    const feeDataWithoutRecordFields = {
      tuitionFees: parseFloat(parseFloat(gradeFees?.tuition ?? 0).toFixed(2)),
      admissionFees: parseFloat(parseFloat(admissionFee ?? 0).toFixed(2)),
      examinationFees: parseFloat(
        parseFloat(gradeFees?.examination ?? 0).toFixed(2)
      ),
      labFees: parseFloat(parseFloat(gradeFees?.labFee ?? 0).toFixed(2)),
      hostelFees: parseFloat(parseFloat(hostelFee ?? 0).toFixed(2)),
      registrationFees: parseFloat(
        parseFloat(gradeFees?.nebRegistration ?? 0).toFixed(2)
      ),
      transportationFees: parseFloat(
        parseFloat(data.transportation || 0).toFixed(2)
      ),
      miscellenous: parseFloat(parseFloat(miscellenous ?? 0).toFixed(2)),
      uniform: parseFloat(parseFloat(uniform ?? 0).toFixed(2)),
      disc: parseFloat(parseFloat(data?.discount || 0).toFixed(2)),
      scholarship: parseFloat(parseFloat(data?.scholarship || 0).toFixed(2)),
    };

    const {
      tuitionFees,
      admissionFees,
      examinationFees,
      uniform: parsedUniform,
      miscellenous: parsedMiscellenous,
      labFees,
      hostelFees,
      registrationFees,
      transportationFees,
      disc,
      scholarship,
    } = feeDataWithoutRecordFields;
    const calculateMonthly = (month, total) => {
      return {
        month,
        totalPayable: parseFloat(total.toFixed(2)),
        due: parseFloat(total.toFixed(2)),
        paid: 0,
      };
    };
    const feeDataWithRecordFieldsUpdated = {
      ...feeDataWithoutRecordFields,
      monthlyRecords: [
        JSON.stringify([
          calculateMonthly(
            "Baisakh",
            tuitionFees +
              admissionFees +
              labFees +
              hostelFees +
              transportationFees +
              parsedMiscellenous +
              parsedUniform
          ),
          calculateMonthly(
            "Jestha",
            tuitionFees +
              labFees +
              hostelFees +
              transportationFees +
              parsedMiscellenous -
              disc / 12 -
              (tuitionFees + labFees) * ((100 - scholarship) / 100)
          ),
          calculateMonthly(
            "Ashar",
            tuitionFees +
              labFees +
              hostelFees +
              transportationFees +
              parsedMiscellenous -
              disc / 12 -
              (tuitionFees + labFees) * ((100 - scholarship) / 100)
          ),
          calculateMonthly(
            "Shrawan",
            tuitionFees +
              labFees +
              hostelFees +
              transportationFees +
              examinationFees +
              parsedMiscellenous -
              disc / 12 -
              (tuitionFees + labFees) * ((100 - scholarship) / 100)
          ),
          calculateMonthly(
            "Bhadra",
            tuitionFees +
              labFees +
              hostelFees +
              transportationFees +
              parsedMiscellenous -
              disc / 12 -
              (tuitionFees + labFees) * ((100 - scholarship) / 100)
          ),
          calculateMonthly(
            "Ashoj",
            tuitionFees +
              labFees +
              hostelFees +
              transportationFees +
              parsedMiscellenous -
              disc / 12 -
              (tuitionFees + labFees) * ((100 - scholarship) / 100)
          ),
          calculateMonthly(
            "Kartik",
            tuitionFees +
              labFees +
              hostelFees +
              transportationFees +
              parsedMiscellenous -
              disc / 12 -
              (tuitionFees + labFees) * ((100 - scholarship) / 100)
          ),
          calculateMonthly(
            "Mangsir",
            tuitionFees +
              labFees +
              hostelFees +
              transportationFees +
              examinationFees +
              parsedMiscellenous -
              disc / 12 -
              (tuitionFees + labFees) * ((100 - scholarship) / 100)
          ),
          calculateMonthly(
            "Poush",
            tuitionFees +
              labFees +
              hostelFees +
              transportationFees +
              registrationFees +
              parsedMiscellenous -
              disc / 12 -
              (tuitionFees + labFees) * ((100 - scholarship) / 100)
          ),
          calculateMonthly(
            "Magh",
            tuitionFees +
              labFees +
              hostelFees +
              transportationFees +
              parsedMiscellenous -
              disc / 12 -
              (tuitionFees + labFees) * ((100 - scholarship) / 100)
          ),
          calculateMonthly(
            "Falgun",
            tuitionFees +
              labFees +
              hostelFees +
              transportationFees +
              parsedMiscellenous -
              disc / 12 -
              (tuitionFees + labFees) * ((100 - scholarship) / 100)
          ),
          calculateMonthly(
            "Chaitra",
            tuitionFees +
              labFees +
              hostelFees +
              transportationFees +
              examinationFees +
              parsedMiscellenous -
              disc / 12 -
              (tuitionFees + labFees) * ((100 - scholarship) / 100)
          ),
        ]),
      ],

      transactionsRecord: {},
    };

    const {
      response: createFeeDocumentResponse,
      error: createFeeDocumentError,
    } = await catchError(() =>
      databaseService.updateUserDocument(
        config.feeRecordColletionId,
        feeId,
        feeDataWithRecordFieldsUpdated
      )
    );
    console.log(
      "cerate fee doc resp",
      createFeeDocumentResponse,
      createFeeDocumentError
    );
    if (!createFeeDocumentResponse) {
      return showErrorToast(`Error creating fee document`);
    }
    showSuccessToast("Document Updated sucessfully");
    reset();

    navigate(navigationLocation);
  } catch (error) {
    console.error(error);
    showErrorToast("Failed to update document");
  }
};
