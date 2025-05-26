import { showErrorToast, showSuccessToast } from "@/components/Templates/toast";
import databaseService from "@/appwrite/Database/database";
export const useRegisterUser = async (data, { reset, getUserDocumentFn, createUserDocmentFn, userRole, setErrorDeletingDuplicate, errorDeletingDuplicate }) => {

    // expecting captalized user role
    const formattedDOB = data.DOB ? data.DOB.format("YYYY-MM-DD") : "";

    let email;
    let name;
    let documentData;
    if (userRole === "Student") {
        email = `${data.studentName}${data.grade}${data.rollNo}@sbss.edu`.toLowerCase().replaceAll(" ", "")
        name = data.studentName

        documentData = {
            ...data,
            email,
            phoneNumber: data.phoneNumber.trim(),
            discount: Number(data.discount.trim()),
            scholarship: Number(data.scholarship.trim()),
            DOB: formattedDOB,
            attendance: false,
            attendanceRecord: JSON.stringify([]),
        };
    }
    if (userRole === "Teacher") {
        email = data.email
        name = data.teacherName
        const formattedJoiningDate = data.joiningDate ? data.joiningDate.format("YYYY-MM-DD") : "";
        documentData = {
            ...data,

            joiningDate: formattedJoiningDate,
            DOB: formattedDOB,
            classes: JSON.stringify(data.classes),
            attendance: false,
            subjectsTaught: JSON.stringify(data.subjectsTaught),
            attendanceRecord: JSON.stringify([]),
        };
    }
    if (userRole === "Staff") {
        email = data.email
        name = data.fullName
        const formattedJoiningDate = data.joiningDate ? data.joiningDate.format("YYYY-MM-DD") : "";
        userRole = data.role
        documentData = {
            ...data,
            joiningDate: formattedJoiningDate,
            DOB: formattedDOB,

            attendance: false,

            attendanceRecord: JSON.stringify([]),
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
        console.log(userCollectionAlreadyExists, userMetadataCollectionExists);
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

            userMetadataCollectionExists.documents.map(async (document) => {
                console.log(document.role, userRole)
                if (document.role !== userRole.toLowerCase()) {
                    return
                }
                try {

                    const response = await databaseService.deleteCollection(
                        document.$collectionId,
                        document.$id
                    );
                    if (!response) {
                        throw new Error("Failed to delete duplicate document");
                    }
                } catch (error) {
                    console.log("Here");

                    console.error(error);
                    setErrorDeletingDuplicate(true);
                }
            });
        }

        if (
            userCollectionAlreadyExists.total !== 0 &&
            userMetadataCollectionExists.total === 0
        ) {
            // delete all instances of teacher
            userCollectionAlreadyExists.documents.map(async (document) => {
                console.log(document.role, userRole)
                try {

                    const response = await databaseService.deleteCollection(
                        document.$collectionId,
                        document.$id
                    );
                    if (!response) {
                        throw new Error("Failed to delete duplicate document");
                    }
                } catch (error) {
                    console.error(error);
                    setErrorDeletingDuplicate(true);
                }
            });
        }

        if (errorDeletingDuplicate) {
            showErrorToast("Error creating user document")
            return;
        }
        console.log("creating...");

        const [userCollectionResponse, userMetaDataCollectionResponse] =
            await Promise.all([
                createUserDocmentFn(documentData),
                databaseService.createUserDocment({
                    name,
                    email,
                    role: userRole.toLowerCase(),
                }),
            ]);
        console.log(userCollectionResponse, userMetaDataCollectionResponse);
        if (userCollectionResponse?.$id && userMetaDataCollectionResponse?.$id) {
            showSuccessToast(`${userRole} registered sucessfully`);
            reset()
            return true;
        }
        showErrorToast(`Error registering ${userRole}`);
    } catch (error) {
        console.error(error)
        showErrorToast(`Error registering ${userRole}`);
    }
}