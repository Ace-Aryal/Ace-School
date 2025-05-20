import { Client, Account, ID } from 'appwrite';
import config from '..';
import { showErrorToast } from '@/components/Templates/toast';
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
            showErrorToast("Error logging in")
            console.error(error);

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
    initiateAccountRecovery = async (email) => {
        try {

            await this.account.createRecovery(email, 'http://localhost:5173/recover-account')
            console.log("here");

            return true
        } catch (error) {
            console.error(error)
            return false
        }

    }
    recoverAccount = async ({ secretID, userID, password }) => {
        try {
            const promise = await this.account.updateRecovery(
                userID,
                secretID,
                password
            );
            if (promise) {
                return true
            }
            return false
        } catch (error) {
            console.error(error);

            return false
        }

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