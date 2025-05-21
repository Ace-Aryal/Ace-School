
const config = {
    appwritreURL: String(import.meta.env.VITE_APPWRITE_URL),
    appwritreProjectID: String(import.meta.env.VITE_PROJECT_ID),
    appwriteDatabaseID: String(import.meta.env.VITE_DATABASE_ID),
    appwritreStudentCollectionID: String(import.meta.env.VITE_STUDENTS_COLLECTION_ID),
    appwritreStaffsCollectionID: String(import.meta.env.VITE_STAFFS_COLLECTION_ID),
    appwritreTeachersCollectionID: String(import.meta.env.VITE_TEACHERS_COLLECTION_ID),
    appwritreLibraryCollectionID: String(import.meta.env.VITE_LIBRARY_COLLECTION_ID),
    appwritrefFeeCollectionID: String(import.meta.env.VITE_FEE_COLLECTION_ID),
    appwritreScheduleCollectionID: String(import.meta.env.VITE_SCHEDULE_COLLECTION_ID),
    appwriteBucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    emailCollectionID: String(import.meta.env.VITE_EMAIL_COLLECTION_ID),
    noticeCollectionID: String(import.meta.env.VITE_NOTICE_COLLECTION_ID),
    userMetaDataCollectionID: String(import.meta.env.VITE_USER_COLLECTION_ID)


}
export default config

