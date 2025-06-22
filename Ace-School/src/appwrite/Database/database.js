import { Client, Databases, ID } from "appwrite";
import config from "..";
import { Query } from "appwrite";
import { showErrorToast, showSuccessToast } from "@/components/Templates/toast";
import NepaliDate from "nepali-datetime";
import { catchError } from "@/utils/catchError";
import authService from "../auth/auth";
const {
  appwriteDatabaseID,
  userMetaDataCollectionID,
  classScheduleDocumentID,
  appwritreProjectID,
  appwritreStaffsCollectionID,
  appwritreTeachersCollectionID,
  noticeCollectionID,
  emailCollectionID,
  appwritreURL,
  appwritreLibraryCollectionID,
  appwritreScheduleCollectionID,
  appwritreStudentCollectionID,
  teacherAttendenceCollectionId,
  staffAttendenceCollectionId,
  studentAttendenceCollectionId,
} = config;
const collectionObject = {
  inbox: emailCollectionID,
  notice: noticeCollectionID,
  teacher: appwritreTeachersCollectionID,
  staff: appwritreStaffsCollectionID,
  student: appwritreStudentCollectionID,
  studentAttendence: studentAttendenceCollectionId,
  staffAttendence: staffAttendenceCollectionId,
  teacherAttendence: teacherAttendenceCollectionId,
  getCollectionID: (collectionName) => {
    return collectionObject[collectionName];
  },
};
class DatabaseService {
  client = new Client();
  database;
  constructor() {
    this.client.setEndpoint(appwritreURL).setProject(appwritreProjectID);
    this.database = new Databases(this.client);
  }

  /// inquiry messages from visitors
  createMessage = async ({ message, phone, fullName }) => {
    try {
      const response = await this.database.createDocument(
        appwriteDatabaseID,
        emailCollectionID,
        ID.unique(),
        {
          fullName,
          phone,
          message,
          date: new Date().toLocaleDateString(),
          seen: false,
        }
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  fetchMessages = async ({ pageParam = undefined, dashboardFetch = false }) => {
    let queries = [Query.limit(20), Query.orderDesc("$createdAt")];
    if (pageParam) {
      queries.push(Query.cursorAfter(pageParam));
    }
    if (dashboardFetch) {
      queries = [
        Query.limit(10),
        Query.orderDesc("$createdAt"),
        Query.equal("seen", false),
      ];
    }
    try {
      const response = await this.database.listDocuments(
        appwriteDatabaseID,
        emailCollectionID,
        queries
      );
      return response.documents;
    } catch (error) {
      console.error(error);
    }
  };
  updateMessages = async ({ adjustObject, documentID }) => {
    try {
      const result = await this.database.updateDocument(
        appwriteDatabaseID, // databaseId
        emailCollectionID, // collectionId
        documentID, // documentId
        adjustObject // data (optional)
      );
      return true;
    } catch (error) {
      console.error(error);
    }
  };
  deleteMessages = async (documentID) => {
    try {
      const response = await this.database.deleteDocument(
        appwriteDatabaseID, // Your database ID
        emailCollectionID, // Your collection ID
        documentID // The ID of the document to delete
      );
      if (response) {
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  //// notice
  createNotice = async ({ author, subject, message, role }) => {
    try {
      const response = await this.database.createDocument(
        appwriteDatabaseID,
        noticeCollectionID,
        ID.unique(),
        {
          author,
          subject,
          message,
          seen: false,
          role,
        }
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  fetchNotices = async ({ pageParam = undefined, dashboardFetch = false }) => {
    let queries = [Query.limit(20), Query.orderDesc("$createdAt")];
    if (pageParam) {
      queries.push(Query.cursorAfter(pageParam));
    }
    if (dashboardFetch) {
      queries = [Query.limit(10), Query.orderDesc("$createdAt")];
    }

    try {
      const response = await this.database.listDocuments(
        appwriteDatabaseID,
        noticeCollectionID,
        queries
      );
      return response.documents;
    } catch (error) {
      console.error(error);
    }
  };
  updateNotice = async ({ adjustObject, documentID }) => {
    try {
      const result = await this.database.updateDocument(
        appwriteDatabaseID, // databaseId
        noticeCollectionID, // collectionId
        documentID, // documentId
        adjustObject // data (optional)
      );
      return true;
    } catch (error) {
      console.error(error);
    }
  };
  deleteNotice = async (documentID) => {
    try {
      const response = await this.database.deleteDocument(
        appwriteDatabaseID, // Your database ID
        noticeCollectionID, // Your collection ID
        documentID // The ID of the document to delete
      );
      if (response) {
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  /// handle users collections

  createteacherDocument = async (data) => {
    // teacher form data
    try {
      const resposne = this.database.createDocument(
        appwriteDatabaseID,
        appwritreTeachersCollectionID,
        ID.unique(),
        data
      );
      return resposne;
    } catch (error) {}
  };
  getTeacherDocument = async (email) => {
    try {
      const response = await this.database.listDocuments(
        appwriteDatabaseID,
        appwritreTeachersCollectionID,
        [Query.equal("email", email)]
      );
      if (response) {
        return response;
      }
    } catch (error) {
      console.error(error);
    }
  };

  createUserDocment = async (data) => {
    // {email : "" , role : ""}
    try {
      const response = this.database.createDocument(
        appwriteDatabaseID,
        userMetaDataCollectionID,
        ID.unique(),
        data
      );
      if (response) {
        return response;
      }
    } catch (error) {
      console.error(error);
    }
  };
  getUserDocument = async (email) => {
    try {
      const response = await this.database.listDocuments(
        appwriteDatabaseID,
        userMetaDataCollectionID,
        [Query.equal("email", email)]
      );
      if (response) {
        return response;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  createStudentDocument = async (data) => {
    // teacher form data
    try {
      const resposne = this.database.createDocument(
        appwriteDatabaseID,
        appwritreStudentCollectionID,
        ID.unique(),
        data
      );
      return resposne;
    } catch (error) {
      console.error(error);
    }
  };
  getStudentDocument = async (email) => {
    try {
      const response = await this.database.listDocuments(
        appwriteDatabaseID,
        appwritreStudentCollectionID,
        [Query.equal("email", email)]
      );
      if (response) {
        return response;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  createStaffsDocument = async (data) => {
    // teacher form data
    try {
      const resposne = this.database.createDocument(
        appwriteDatabaseID,
        appwritreStaffsCollectionID,
        ID.unique(),
        data
      );
      return resposne;
    } catch (error) {}
  };
  getStaffsDocument = async (email) => {
    try {
      const response = await this.database.listDocuments(
        appwriteDatabaseID,
        appwritreStaffsCollectionID,
        [Query.equal("email", email)]
      );
      if (response) {
        return response;
      }
    } catch (error) {
      console.error(error);
    }
  };

  getAllStudentsDocs = async (grade) => {
    let queries = [Query.orderAsc("studentName"), Query.limit(70)];
    if (grade) {
      queries = [
        Query.limit(70),
        ,
        Query.equal("grade", grade),
        Query.orderAsc("rollNo"),
      ];
    }
    try {
      const response = await this.database.listDocuments(
        appwriteDatabaseID,
        appwritreStudentCollectionID,
        queries
      );

      return response.documents;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  getAllTeachersDocument = async () => {
    try {
      const response = await this.database.listDocuments(
        appwriteDatabaseID,
        appwritreTeachersCollectionID,

        [Query.orderAsc("teacherName"), Query.limit(50)]
      );

      return response.documents;
    } catch (error) {
      console.error(error);
    }
  };
  getAllStaffsDocument = async () => {
    try {
      const response = await this.database.listDocuments(
        appwriteDatabaseID,
        appwritreStaffsCollectionID,
        [Query.orderAsc("fullName"), Query.limit(50)]
      );

      return response.documents;
    } catch (error) {
      console.error(error);
    }
  };

  updateUserMetaData = async (updatedDocument, documentID) => {
    console.log(documentID);
    try {
      const result = await this.database.updateDocument(
        appwriteDatabaseID, // databaseId
        userMetaDataCollectionID, // collectionId
        documentID, // documentId
        updatedDocument // data (optional)
      );

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  updateUserDocument = async (collectionID, documentID, updatedDocument) => {
    console.log(documentID, collectionID, updatedDocument);

    try {
      const result = await this.database.updateDocument(
        appwriteDatabaseID, // databaseId
        collectionID, // collectionId
        documentID, // documentId
        updatedDocument // data (optional)
      );
      console.log(result);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  // document delete fn
  deleteCollection = async (collectionID, documentID) => {
    try {
      await this.database.deleteDocument(
        appwriteDatabaseID,
        collectionID,
        documentID
      );

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  };

  // schedule update fn : note : Already createed and initialized on database so only update fn is here

  getClassSchedule = async () => {
    try {
      const response = await this.database.getDocument(
        appwriteDatabaseID,
        appwritreScheduleCollectionID,
        classScheduleDocumentID
      );
      console.log(JSON.parse(response.scheduleJSON));
      return await JSON.parse(response.scheduleJSON);
    } catch (error) {
      console.error(error);
    }
  };

  updateClassSchedule = async (updatedData) => {
    try {
      await this.database.updateDocument(
        appwriteDatabaseID,
        appwritreScheduleCollectionID,
        classScheduleDocumentID,
        { scheduleJSON: JSON.stringify(updatedData) }
      );
      showSuccessToast("Sucessfully updated data !");
      return true;
    } catch (error) {
      console.error(error);
      showErrorToast("Failed to update schedule");
      return false;
    }
  };
  batchUpdateDocument = async (data, role) => {
    const { documentId, attendance, date } = data;
    console.log(data);
    let userCollectionId;
    if (role.toLowerCase() === "student") {
      userCollectionId = appwritreStudentCollectionID;
    }
    if (role.toLowerCase() === "staff") {
      userCollectionId = appwritreStaffsCollectionID;
    }
    if (role.toLowerCase() === "teacher") {
      userCollectionId = appwritreTeachersCollectionID;
    }
    const { error, response: userDataRespone } = await catchError(() =>
      this.getDocument(userCollectionId, documentId)
    );
    if (error) {
      console.error("Error fetching user data");
      return;
    }
    const attendanceRecord = JSON.parse(
      userDataRespone.attendanceRecord || "{}"
    );
    try {
      const response = await this.database.updateDocument(
        appwriteDatabaseID,
        userCollectionId,
        documentId,
        {
          attendance,
          attendanceRecord: JSON.stringify({
            ...attendanceRecord,
            [date]: attendance,
          }),
        }
      );
      return {
        status: "fulfilled",
        value: response,
        sentData: { [documentId]: attendance },
      };
    } catch (error) {
      console.error(error);
      return {
        status: "rejected",
        reason: error,
        sentData: { [documentId]: attendance },
      };
    }
  };

  getDocument = async (collectionID, documentId) => {
    try {
      const response = await this.database.getDocument(
        appwriteDatabaseID,
        collectionID,
        documentId
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error(error.message);
      if (
        error.message === "Document with the requested ID could not be found."
      ) {
        return 404;
      }
    }
  };

  createDocument = async (collectionID, documentId, data) => {
    try {
      const response = await this.database.createDocument(
        appwriteDatabaseID,
        collectionID,
        documentId,
        data
      );
      console.log("resp", response);
      return response;
    } catch (error) {
      console.error(error);
    }
  };
  updateAttendenceRecords = async (collectionId, documentId, data) => {
    try {
      console.log("data in attendance", data);
      const response = await this.database.updateDocument(
        appwriteDatabaseID,
        collectionId,
        documentId,
        {
          Report: JSON.stringify(data),
        }
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  };
  getAttendanceStats = async (collectionID, documentId, role) => {
    console.log(documentId);
    try {
      const response = await this.database.getDocument(
        appwriteDatabaseID,
        collectionID,
        documentId
      );
      let parsedReport = JSON.parse(response.Report);
      let attendanceDataReport = {
        present: 0,
        absent: 0,
        onleave: 0,
      };
      if (role === "student") {
        for (const grade in parsedReport) {
          parsedReport[grade].forEach((attendee) => {
            if (attendee.att === "present") {
              attendanceDataReport.present++;
              return;
            }
            if (attendee.att === "onleave") {
              attendanceDataReport.onleave++;
              return;
            }
            attendanceDataReport.absent++;
          });
        }
        return attendanceDataReport;
      }
      parsedReport.forEach((attendee) => {
        if (attendee.att === "present") {
          attendanceDataReport.present++;
          return;
        }
        if (attendee.att === "onleave") {
          attendanceDataReport.onleave++;
          return;
        }
        attendanceDataReport.absent++;
      });
      return attendanceDataReport;
    } catch (error) {
      console.error(error);
      return {
        present: 0,
        absent: 0,
        onleave: 0,
      };
    }
  };
  getFeeTemplate = async () => {
    console.log(config.feeTemplateId);
    try {
      const response = await this.database.getDocument(
        appwriteDatabaseID,
        config.feeTemplateId,
        "fee-template"
      );
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  modifyFeeTemplate = async (adjustObject) => {
    try {
      const currentuser = await authService.getCurrentUser();
      const roles = currentuser.labels;
      if (!roles.includes("admin")) {
        return false;
      }
      const response = await this.database.updateDocument(
        appwriteDatabaseID,
        config.feeTemplateId,
        "fee-template",
        adjustObject
      );
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  getClassFeeStats = async (grade) => {
    const queries = [Query.equal("grade", grade)];
    try {
      const respone = await this.database.listDocuments(
        appwriteDatabaseID,
        config.feeRecordColletionId,
        queries
      );
      return respone;
    } catch (error) {
      console.error(error);
    }
  };
}
const databaseService = new DatabaseService();
export default databaseService;
