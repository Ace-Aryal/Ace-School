import { Client, Databases, ID } from 'appwrite';
import config from '..';
import { Query } from "appwrite";
const { appwriteDatabaseID, appwritreProjectID, noticeCollectionID, emailCollectionID, appwritreURL, appwritreLibraryCollectionID, appwritreScheduleCollectionID, appwritreStdentCollectionID, appwritrefFeeCollectionID } = config
class DatabaseService {
    client = new Client()
    database;
    constructor() {
        this.client.setEndpoint(appwritreURL)
            .setProject(appwritreProjectID)
        this.database = new Databases(this.client)
    }
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
                    seen: false
                }
            );
            return true
        } catch (error) {

            console.error(error);
            return false

        }
    }

    fetchMessages = async ({ pageParam = undefined }) => {
        console.log("last id", pageParam);

        const queries = [
            Query.limit(20),
            Query.orderDesc("$createdAt"),
        ]
        if (pageParam) {
            queries.push(Query.cursorAfter(pageParam))
        }
        try {
            const response = await this.database.listDocuments(
                appwriteDatabaseID,
                emailCollectionID,
                queries
            );
            console.log("res", response.documents);
            return response.documents

        } catch (error) {
            console.error(error)
        }
    }
    updateMessages = async ({ adjustObject, documentID }) => {
        try {
            const result = await this.database.updateDocument(
                appwriteDatabaseID, // databaseId
                emailCollectionID, // collectionId
                documentID, // documentId
                adjustObject, // data (optional)

            );
            return true
        } catch (error) {

        }
    }
    deleteMessages = async (documentID) => {
        try {
            const response = await this.database.deleteDocument(
                appwriteDatabaseID,     // Your database ID
                emailCollectionID,   // Your collection ID
                documentID   // The ID of the document to delete
            );
            if (response) {

                return true
            }
            return false
        } catch (error) {
            console.error(error)
            return false
        }
    }

    createNotice = async ({ author, subject, message }) => {
        try {
            const response = await this.database.createDocument(
                appwriteDatabaseID,
                noticeCollectionID,
                ID.unique(),
                {
                    author,
                    subject,
                    message,
                    seen: false
                }
            );
            return true
        } catch (error) {

            console.error(error);
            return false

        }
    }





}

const databaseService = new DatabaseService()
export default databaseService