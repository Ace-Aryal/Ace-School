import { Client, Users, ID } from 'node-appwrite';
import config from '../../../src/appwrite';

class CreateUser {

    client = new Client()
    users
    constructor(parameters) {

        this.client.setEndpoint('https://fra.cloud.appwrite.io/v1') // Your API Endpoint
            .setProject(config.appwritreProjectID) // Your project ID
            .setKey(config.appwriteCreateUserAPIKey); // Your secret API key

        this.users = new Users(this.client)
    }



    // Create a new user

    createNewUser = async ({ username, email, password, labels }) => {
        try {
            const newUser = await users.create(
                ID.unique(),
                email,
                password,
                username
            );

            // Update user preferences
            await users.updateLabels(newUser.$id, labels)
            return true
        } catch (error) {
            console.error(error);

        }

    }


    // Assign labels to the user

}
const createUser = new CreateUser()
export default createUser