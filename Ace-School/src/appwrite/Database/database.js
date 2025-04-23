import { Client, Databases, ID } from 'appwrite';
import config from '..';
import { Query } from "appwrite";

class DatabaseService {
    client = new Client()
    database;
    constructor() {
        this.client.setEndpoint(config.appwritreURL)
            .setProject(config.appwritreProjectID)
        this.database = new Databases(this.client)
    }
    createMessage = async ({ message, phone, fullName }) => {



        try {
            const response = await this.database.createDocument(
                config.appwriteDatabaseID,
                config.emailCollectionID,
                ID.unique(),
                {
                    fullName,
                    phone,
                    message,
                    date: new Date().toLocaleDateString()
                }
            );
            return true
        } catch (error) {
            return error
            console.error(error);

        }
    }

    fetchMessages = async (lastId) => {
        const queries = [
            Query.limit(20),
            Query.orderDesc("$createdAt"),
        ]
        if (lastId) {
            queries.push(Query.cursorAfter(lastId))
        }
        try {
            const response = await this.database.listDocuments(
                config.appwriteDatabaseID,
                config.emailCollectionID,
                queries
            );
            console.log("res", response);

        } catch (error) {
            console.error(error)
        }
    }



}

const databaseService = new DatabaseService()
export default databaseService