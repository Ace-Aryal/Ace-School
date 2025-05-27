
import config from "@/appwrite"
import databaseService from "@/appwrite/Database/database"
import functionService from "@/appwrite/functions/function"
import { showErrorToast, showSuccessToast } from "@/components/Templates/toast"
import { clearLoading } from "@/features/loadingStateTrackerSlice"
import { store } from "@/store/store"
export const handleDocumentDelete = async ({ documentId, email, collectionId, refetch }) => {


    try {
        const [deleteAccountResponse, fetchMetaDataResponse] = await Promise.all([functionService.deleteUser(email), databaseService.getUserDocument(email)])
        if (deleteAccountResponse?.responseStatusCode !== 200 || !fetchMetaDataResponse) {
            showErrorToast("Failed to delete user")
            return
        }
        const responseBody = await JSON.parse(deleteAccountResponse.responseBody)
        if (!responseBody.success) {
            showErrorToast("Failed to delete user")
            return
        }
        showSuccessToast("Account Deleted Sucessfully!")
        const metadataId = fetchMetaDataResponse?.documents[0]?.$id || null
        if (!metadataId) {
            showErrorToast("Can't find metadata on database, please delete from console")
            return
        }
        const deleteUserMetadataRespone = await databaseService.deleteCollection(config.userMetaDataCollectionID, metadataId)
        if (!deleteUserMetadataRespone) {
            showErrorToast("Failed to delete metadata")
            return
        }
        showSuccessToast("Metadata deleted sucessfully")
        const deleteUserDocumentResponse = await databaseService.deleteCollection(collectionId, documentId)
        if (!deleteUserDocumentResponse) {
            showErrorToast("Metadata deleted. Could'nt delete user document please use appwrite console for the user")
        }
        showSuccessToast("User document deleted sucessfully")

    } catch (error) {
        showErrorToast("Error deleting user data")
        console.error(error)
    } finally {
        store.dispatch(clearLoading())

        refetch()


    }
}