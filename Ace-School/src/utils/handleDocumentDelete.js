
import config from "@/appwrite"
import databaseService from "@/appwrite/Database/database"
import functionService from "@/appwrite/functions/function"
import { showErrorToast, showSuccessToast } from "@/components/Templates/toast"
export const handleDocumentDelete = async ({ documentId, email, collectionId }) => {


    try {
        const [deleteAccountResponse, fetchMetaDataResponse] = await Promise.all([functionService.deleteUser(email), databaseService.getUserDocument(email)])
        if (deleteAccountResponse?.responseStatusCode !== 200 || !fetchMetaDataResponse) {
            showErrorToast("Failed to delete user")
            return
        }
        const responseBody = JSON.parse(deleteAccountResponse.responseBody)
        if (!responseBody.success) {
            showErrorToast("Failed to delete user")
            return
        }
        showSuccessToast("Account Deleted Sucessfully!")
        const metadataId = fetchMetaDataResponse?.documents[0]?.$id || null
        if (!metadataId) {
            showErrorToast("Cant find metadata on database")
            return
        }
        const deleteUserMetadataRespone = await databaseService.deleteCollection(config.userMetaDataCollectionID, metadataId)
        if (!deleteUserMetadataRespone) {
            showErrorToast("Failed to delete metadata")
            return
        }
        showSuccessToast("Metadata deleted sucessfully")
        const deleteUserDocumentResponse = await databaseService.deleteCollection(collectionId, documentId)
        if (!!deleteUserDocumentResponse) {
            showErrorToast("Metadata deleted. Could'nt delete user document please use appwrite console for the user")
        }
        showSuccessToast("User document deleted sucessfully")

    } catch (error) {
        showErrorToast("Error deleting user data")
        console.error(error)
    }
}