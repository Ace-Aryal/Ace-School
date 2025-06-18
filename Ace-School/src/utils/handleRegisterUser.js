import { showErrorToast, showSuccessToast } from "@/components/Templates/toast";
import databaseService from "@/appwrite/Database/database";
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
  if (userRole === "Student") {
    email = `${data.studentName}${data.grade}${data.rollNo}@sbss.edu`
      .toLowerCase()
      .replaceAll(" ", "");
    name = data.studentName;

    documentData = {
      ...data,
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
    console.log(documentData);
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

    if (userCollectionResponse?.$id && userMetaDataCollectionResponse?.$id) {
      showSuccessToast(`User registered sucessfully`);
      reset();
      return true;
    }
    showErrorToast(`Error registering user`);
  } catch (error) {
    console.error(error);
    showErrorToast(`Error registering user`);
  }
};
