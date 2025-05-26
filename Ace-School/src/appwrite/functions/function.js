import { Client, Functions } from "appwrite";
import config from "..";
import { showErrorToast, showSuccessToast } from "@/components/Templates/toast";


class FunctionService {
    client = new Client()
    functions
    constructor() {
        this.client.setEndpoint(config.appwritreURL)
            .setProject(config.appwritreProjectID)
        this.functions = new Functions(this.client)

        deleteUser = (email) => {
            this.functions.createExecution(config.deleteUserFunctionID, JSON.stringify({ email: email }))
                .then((response) => {
                    console.log("Function executed successfully", response);
                    showSuccessToast("User account deleted sucessfully")
                })
                .catch((error) => {
                    showErrorToast("Unable to delete user account")
                    console.error("Execution failed", error);
                });
        }
    }
}
const functionService = new FunctionService()
export default functionService