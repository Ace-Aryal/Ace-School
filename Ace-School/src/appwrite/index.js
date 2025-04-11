
const config = {
    appwritreURL: String(import.meta.env.VITE_APPWRITE_URL),
    appwritreProjectID: String(import.meta.env.VITE_PROJECT_ID),
    appwritreDatabaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwritreStdentCollectionID: String(import.meta.env.VITE_STUDENT_COLLECTION_ID),
    appwritreLibraryCollectionID: String(import.meta.env.VITE_LIBRARY_COLLECTION_ID),
    appwritrefFeeCollectionID: String(import.meta.env.VITE_FEE_COLLECTION_ID),
    appwritreScheduleCollectionID: String(import.meta.env.VITE_SCHEDULE_COLLECTION_ID)




}
export default config

