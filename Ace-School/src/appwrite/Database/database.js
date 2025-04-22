import { Client, Databases, ID } from 'appwrite';
import config from '..';
class DatabaseService {
    client = new Client()
    database;
    constructor() {
        this.client.setEndpoint(config.appwritreURL)
            .setProject(config.appwritreProjectID)
        this.database = new Databases(this.client)
    }
    createMessage = async ({ message, phone, fullName }) => {
        console.log("message", message, phone, fullName);
        console.log(config.emailCollectionID);


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



}

const databaseService = new DatabaseService()
export default databaseService