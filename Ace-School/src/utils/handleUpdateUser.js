import { showErrorToast, showSuccessToast } from "@/components/Templates/toast";

import functionService from "@/appwrite/functions/function";
import databaseService from "@/appwrite/Database/database";
export const updateUser = async (data, { reset, documentID, collectionID, userRole, originalEmail, originalDOB, originalJoiningDate }) => {

    // expecting captalized user role
    let formattedDOB
    if (data.DOB !== originalDOB) {

        formattedDOB = data.DOB ? data.DOB.format("YYYY-MM-DD") : "";
    }
    if ((userRole.toLowerCase() === "teacher" || userRole.toLowerCase() === "staff") && data.joiningDate !== originalJoiningDate) { }

    let email;
    let name;
    let updatedDocument;
    if (userRole.toLowerCase() === "student") {
        email = `${data.studentName}${data.grade}${data.rollNo}@sbss.edu`.toLowerCase().replaceAll(" ", "")

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
        email = data.email
        name = data.teacherName
        const formattedJoiningDate = data.joiningDate ? data.joiningDate.format("YYYY-MM-DD") : "";
        updatedDocument = {
            ...data,

            joiningDate: formattedJoiningDate,
            DOB: formattedDOB,

        };
    }
    if (userRole.toLowerCase() === "staff") {
        email = data.email
        name = data.fullName
        const formattedJoiningDate = data.joiningDate ? data.joiningDate.format("YYYY-MM-DD") : "";
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
            const response = await functionService.deleteUser(originalEmail)
            console.log(response)
            if (response?.status === "failed") {
                showErrorToast("Failed to delete user")
            }
            return
        }
        // only update
        const response = await databaseService.updateUserDocument(collectionID, documentID, updatedDocument)
        if (response) {
            console.log(response)
        }
        showSuccessToast("Document Updated sucessfully")
        reset()
    } catch (error) {
        console.error(error)
        showErrorToast("Failed to update document")
    }
}