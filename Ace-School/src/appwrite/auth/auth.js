import { Client, Account } from 'appwrite';
import config from '..';
class AuthService {
    client = new Client()
    account;
    constructor() {
        this.client.setEndpoint(config.appwritreURL)
            .setProject(config.appwritreProjectID)
        this.account = new Account(this.client)
    }

    login = async ({ email, password }) => {
        try {
            return await this.account.createEmailPasswordSession(email, password);

        } catch (error) {

            return false

        }
    }
    logout = async () => {
        try {



            await this.account.deleteSessions()
            return true

        } catch (error) {
            return false
        }
    }
    changePassword = async (currentPassword, newPassword) => {
        try {
            const response = await this.account.updatePassword(newPassword, currentPassword);


            if (response) {

                return true
            }

        } catch (error) {
            console.error("Error updating password:", error);
            return error.message
        }
    };
    recoverAccount = async ({ phoneNumber }) => {

    }
    getCurrentUser = async () => {
        try {
            return await this.account.get()
        } catch (error) {
            console.error(error)
            return false
        }
    }

}

const authService = new AuthService()
export default authService