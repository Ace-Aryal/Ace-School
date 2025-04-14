import { Client, Storage, ImageGravity, ImageFormat } from "appwrite";
import { Query } from "appwrite";
import config from '..';
class StorageService {
    client = new Client()
    storage;
    constructor() {
        this.client.setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
            .setProject(config.appwritreProjectID); // Your project ID

        this.storage = new Storage(this.client);
    }

    getImage = (imageId) => {
        try {
            const response = this.storage.getFileView(config.appwriteBucketID, imageId)
            console.log("resp", response);
            return response.href
        } catch (error) {
            console.error(error)
        }

    }

    getImagesPreview = async (pageParams) => {

        const queryArray = [Query.limit(20)]
        if (pageParams) {
            queryArray.push(Query.cursorAfter(pageParams))
        }
        console.log("page params", pageParams);

        try {
            const result = await this.storage.listFiles(
                config.appwriteBucketID, // bucketId
                queryArray


            );

            console.log("result", result);


            const imagesURLS = result.files.map((image) => (this.storage.getFileView(config.appwriteBucketID, image.$id))

            )
            console.log("imaeg uls", imagesURLS);

            return imagesURLS
        }
        catch (error) {
            console.error(error)
        }
    }
}

const storageService = new StorageService()
export default storageService