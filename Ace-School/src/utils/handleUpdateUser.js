import { showErrorToast, showSuccessToast } from "@/components/Templates/toast";

import functionService from "@/appwrite/functions/function";
import databaseService from "@/appwrite/Database/database";
export const updateUser = async (data, { reset, navigate, documentID, collectionID, userRole, originalEmail, originalDOB, originalJoiningDate }) => {

    // expecting captalized user role
    let formattedDOB
    let formattedJoiningDate
    let navigationLocation
    if (data.DOB !== originalDOB) {
        console.log(data.DOB, originalDOB);

        formattedDOB = data.DOB ? data.DOB.format("YYYY-MM-DD") : "";
    }
    if ((userRole.toLowerCase() === "teacher" || userRole.toLowerCase() === "staff") && data.joiningDate !== originalJoiningDate) {
        formattedJoiningDate = data.joiningDate ? data.joiningDate.format("YYYY-MM-DD") : ""
    }

    let email;
    let name;
    let updatedDocument;


    if (userRole.toLowerCase() === "student") {
        console.log(data);

        email = `${data.studentName}${data.grade}${data.rollNo}@sbss.edu`.toLowerCase().replaceAll(" ", "")
        navigationLocation = "/view-students"
        name = data.studentName
        updatedDocument = {
            ...data,
            email,
            phoneNumber: data.phoneNumber.trim(),
            discount: Number(data.discount.trim()),
            scholarship: Number(data.scholarship.trim()),
            DOB: formattedDOB,

        };
    }
    if (userRole.toLowerCase() === "teacher") {
        console.log((data.subjectsTaught))
        email = data.email
        name = data.teacherName
        navigationLocation = "/view-teachers"
        updatedDocument = {
            ...data,

            joiningDate: formattedJoiningDate,
            DOB: formattedDOB,
            classes: JSON.stringify(data.classes), // Assuming classes is an array of objects {value, label}
            subjectsTaught: JSON.stringify(data.subjectsTaught)

        };
    }
    if (userRole.toLowerCase() === "staff") {
        email = data.email
        name = data.fullName
        navigationLocation = "/view-staffs"
        userRole = data.role // staff has multiple roles so mutating userrole 
        updatedDocument = {
            ...data,
            joiningDate: formattedJoiningDate,
            DOB: formattedDOB,


        };
        console.log(updatedDocument);

    }


    try {
        if (email !== originalEmail) {
            const [response, metadataFetchResponse] = await Promise.all([functionService.deleteUser(originalEmail), await databaseService.getUserDocument(originalEmail)])
            console.log(response)
            if (response?.responseStatusCode !== 200) {
                showErrorToast("Failed to delete user")
                return
            }

            const responseBody = JSON.parse(response.responseBody)


            if (!responseBody.success) {
                showErrorToast("Failed to delete user")
                return
            }
            showSuccessToast("User Deleted Sucessfully")
            const updatedMetadataDocument = { email, name, role: userRole }
            if (!metadataFetchResponse) {
                showErrorToast("Could'nt fetch metadata")
                return
            }
            const documentID = metadataFetchResponse.documents[0].$documentId
            const metadataUpdateResponse = await databaseService.updateUserMetaData(updatedMetadataDocument, documentID)
            if (!metadataUpdateResponse) {
                showErrorToast("Could'nt update metadata  ")
                return
            }
            showSuccessToast("Metadata Updated sucessfully")
        }
        // only update
        const response = await databaseService.updateUserDocument(collectionID, documentID, updatedDocument)
        if (!response) {
            showErrorToast("Error updating user document")
            return
        }
        showSuccessToast("Document Updated sucessfully")
        reset()

        navigate(navigationLocation)
    } catch (error) {
        console.error(error)
        showErrorToast("Failed to update document")
    }
}