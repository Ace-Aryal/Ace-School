import { Client, Functions } from "appwrite";
import config from "..";
import { showErrorToast, showSuccessToast } from "@/components/Templates/toast";

class FunctionService {
  client = new Client();
  functions;
  constructor() {
    this.client
      .setEndpoint(config.appwritreURL)
      .setProject(config.appwritreProjectID);
    this.functions = new Functions(this.client);
  }
  deleteUser = async (email) => {
    try {
      const response = await this.functions.createExecution(
        config.deleteUserFunctionID,
        JSON.stringify({ email: email })
      );
      return response;
    } catch (error) {
      console.error("Execution failed", error);
    }
  };
}
const functionService = new FunctionService();
export default functionService;
