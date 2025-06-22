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
    feeId = `${data.studentName}_${data.grade}_${data.rollNo}_${formattedDOB}`
      .toLowerCase()
      .replaceAll(" ", "");
    const studentData = JSON.parse(JSON.stringify(data));
    delete studentData.admission;
    delete studentData.transportation;
    delete studentData.hostel;
    documentData = {
      ...studentData,
      feeDocumentId: feeId,
      email,
      phoneNumber: data.phoneNumber?.trim(),
      discount: Number(data.discount?.trim()),
      scholarship: Number(data.scholarship?.trim()),
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
    const miscellenous = parseFloat(FeeTemplateResponse.miscellenous);
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
    const uniform = parseFloat(gradeFees.uniform);

    const feeDataWithoutRecordFields = {
      grade: data.grade,
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
        parseFloat(data?.transportation ?? 0).toFixed(2)
      ),
      miscellenous: parseFloat(parseFloat(miscellenous ?? 0).toFixed(2)),
      uniform: parseFloat(parseFloat(uniform ?? 0).toFixed(2)),
      disc: parseFloat(parseFloat(data?.discount ?? 0).toFixed(2)),
      scholarship: parseFloat(parseFloat(data?.scholarship ?? 0).toFixed(2)),
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
    console.log("fee data w/0", feeDataWithoutRecordFields);
    const calculateMonthly = (month, total) => {
      return {
        month,
        totalPayable: parseFloat(total.toFixed(2)),
        due: parseFloat(total.toFixed(2)),
        paid: 0,
      };
    };
    const feeDataWithRecordFields = {
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
    console.log(feeDataWithRecordFields, "with records");

    const {
      response: createFeeDocumentResponse,
      error: createFeeDocumentError,
    } = await catchError(() =>
      databaseService.createDocument(
        config.feeRecordColletionId,
        feeId,
        feeDataWithRecordFields
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
