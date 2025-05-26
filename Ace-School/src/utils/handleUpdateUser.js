import { showErrorToast, showSuccessToast } from "@/components/Templates/toast";
import databaseService from "@/appwrite/Database/database";
import { capitalize } from "./capitalize";
export const updateUser = async (data, { reset, getUserDocumentFn, toDelete, setToDelete, updateUserDocmentFn, userRole, setErrorUpdating, errorUpdating }) => {

    // expecting captalized user role
    const formattedDOB = data.DOB ? data.DOB.format("YYYY-MM-DD") : "";
    setErrorDeletingDuplicate(false)
    let email;
    let name;
    let updatedDocument;
    if (userRole === "Student") {
        email = `${data.studentName}${data.grade}${data.rollNo}@sbss.edu`.toLowerCase().replaceAll(" ", "")

        updatedDocument = {
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
        updatedDocument = {
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
        userRole = data.role // staff has multiple roles so mutating userrole 
        updatedDocument = {
            ...data,
            joiningDate: formattedJoiningDate,
            DOB: formattedDOB,

            attendance: false,

            attendanceRecord: JSON.stringify([]),
        };
        console.log(updatedDocument);

    }

    try {
        if (toDelete) {
            // delete then update
            return
        }
        // only update

    } catch (error) {

    }
}