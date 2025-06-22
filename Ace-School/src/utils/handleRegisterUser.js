import { showErrorToast, showSuccessToast } from "@/components/Templates/toast";
import databaseService from "@/appwrite/Database/database";
import config from "@/appwrite";
import { catchError } from "./catchError";
import { classMapFromNumericToAlphanumeric } from "./class";
export const registerUser = async (
  data,
  {
    reset,
    getUserDocumentFn,
    createUserDocmentFn,
    userRole,
    setErrorDeletingDuplicate,
    errorDeletingDuplicate,
  }
) => {
  // expecting captalized user role
  const formattedDOB = data.DOB ? data.DOB.bsDate : "";
  setErrorDeletingDuplicate(false);
  let email;
  let name;
  let documentData;
  let feeId;
  if (userRole === "Student") {
    email = `${data.studentName}${data.grade}${data.rollNo}@sbss.edu`
      .toLowerCase()
      .replaceAll(" ", "");
    name = data.studentName;
    feeId = `${data.studentName}${data.grade}${data.rollNo}${formattedDOB}`
      .toLowerCase()
      .replaceAll(" ", "");
    const studentData = JSON.parse(JSON.stringify(data));
    delete studentData.admission;
    delete studentData.transportation;
    delete studentData.hostel;
    documentData = {
      ...studentData,
      "fee-document-id": feeId,
      email,
      phoneNumber: data.phoneNumber.trim(),
      discount: Number(data.discount.trim()),
      scholarship: Number(data.scholarship.trim()),
      DOB: formattedDOB,
      attendance: "Not Added",
      attendanceRecord: JSON.stringify({}),
    };
  }
  if (userRole === "Teacher") {
    email = data.email;
    name = data.teacherName;
    const formattedJoiningDate = data.joiningDate
      ? data.joiningDate.bsDate
      : "";
    documentData = {
      ...data,

      joiningDate: formattedJoiningDate,
      DOB: formattedDOB,
      classes: JSON.stringify(data.classes),
      attendance: "Not Added",
      subjectsTaught: JSON.stringify(data.subjectsTaught),
      attendanceRecord: JSON.stringify({}),
    };
  }
  if (userRole === "Staff") {
    email = data.email;
    name = data.fullName;
    const formattedJoiningDate = data.joiningDate
      ? data.joiningDate.bsDate
      : "";
    userRole = data.role; // staff has multiple roles so mutating userrole
    documentData = {
      ...data,
      joiningDate: formattedJoiningDate,
      DOB: formattedDOB,

      attendance: "No Attendence",

      attendanceRecord: JSON.stringify({}),
    };
  }

  try {
    console.log(documentData);

    const [userCollectionAlreadyExists, userMetadataCollectionExists] =
      await Promise.all([
        getUserDocumentFn(email),
        databaseService.getUserDocument(email),
      ]);

    if (
      userCollectionAlreadyExists.total !== 0 &&
      userMetadataCollectionExists.total !== 0
    ) {
      showErrorToast(` ${userRole} already exists`);
      return;
    }

    if (
      userCollectionAlreadyExists?.total === 0 &&
      userMetadataCollectionExists?.total !== 0
    ) {
      // delete all the instances of user
      const document = userMetadataCollectionExists.documents[0];
      if (document.role.toLowerCase() !== userRole.toLowerCase()) {
        showErrorToast(
          "Account already exists for provided email in another department"
        );
        setErrorDeletingDuplicate(true);
        return;
      }

      const response = await databaseService.deleteCollection(
        document.$collectionId,
        document.$id
      );
      if (!response) {
        setErrorDeletingDuplicate(true);
        throw new Error("Failed to delete duplicate document");
      }
    }

    if (
      userCollectionAlreadyExists.total !== 0 &&
      userMetadataCollectionExists.total === 0
    ) {
      // delete all instances of teacher
      const document = userCollectionAlreadyExists.documents[0];

      const response = await databaseService.deleteCollection(
        document.$collectionId,
        document.$id
      );
      if (!response) {
        setErrorDeletingDuplicate(true);
        throw new Error("Failed to delete duplicate document");
      }
    }

    if (errorDeletingDuplicate) {
      showErrorToast("Error creating user document");
      return;
    }

    const [userCollectionResponse, userMetaDataCollectionResponse] =
      await Promise.all([
        createUserDocmentFn(documentData),
        databaseService.createUserDocment({
          name,
          email,
          role: userRole.toLowerCase(),
        }),
      ]);

    if (userRole.toLowerCase() !== "student") return;
    const { response: getFeeDocumentResponse, error: getFeeDocumentError } =
      catchError(() =>
        databaseService.getDocument(config.feeRecordColletionId, feeId)
      );
    if (getFeeDocumentResponse !== 404 && getFeeDocumentResponse) {
      return showErrorToast("Another student with same fee Id already exists");
    }
    const { response: FeeTemplateResponse, error: FeeTemplateError } =
      await catchError(databaseService.getFeeTemplate);
    if (!FeeTemplateResponse || FeeTemplateError) {
      return showErrorToast("Failed to fetch fee template");
    }
    const miscellenous = Number(FeeTemplateResponse.miscellenous);
    console.log("ftr", FeeTemplateResponse);
    console.log(data.grade);
    const alphabeticalGrade = classMapFromNumericToAlphanumeric[data.grade];
    const gradeFees = JSON.parse(FeeTemplateResponse[alphabeticalGrade]);
    console.log(gradeFees, "gradeFees");
    const admissionFee =
      data.admission.toLowerCase() === "new"
        ? gradeFees.newAdmission
        : gradeFees.oldAdmission;
    const hostelFee =
      data.hostel.toLowerCase() === "yes" ? gradeFees.hostel : 0;
    const uniform = gradeFees.uniform;

    const feeData = {
      tuitionFees: parseFloat(gradeFees?.tuition ?? 0),
      admissionFees: parseFloat(admissionFee ?? 0),
      examinationFees: parseFloat(gradeFees?.examination ?? 0),
      labFees: parseFloat(gradeFees?.labFee ?? 0),
      hostelFees: parseFloat(hostelFee ?? 0),
      registrationFees: parseFloat(gradeFees?.nebRegistration ?? 0),
      transportationFees: parseFloat(data?.transportation ?? 0),
      miscellenous: parseFloat(miscellenous ?? 0),
      uniform: parseFloat(uniform),
      disc: parseFloat(data.discount),
      scholarship: parseFloat(data.scholarship),
    };

    const {
      response: createFeeDocumentResponse,
      error: createFeeDocumentError,
    } = await catchError(() =>
      databaseService.createDocument(
        config.feeRecordColletionId,
        feeId,
        feeData
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
    if (userCollectionResponse.$id && userMetaDataCollectionResponse.$id) {
      showSuccessToast(`User registered sucessfully`);
      reset();
      return true;
    }
  } catch (error) {
    console.error(error);
    showErrorToast(`Error registering user`);
  }
};
