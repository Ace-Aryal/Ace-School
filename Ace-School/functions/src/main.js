import { Client, Databases } from "node-appwrite";

export default async ({ req, res, log }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const databases = new Databases(client);

  try {
    const response = await databases.listDocuments(
      process.env.DATABASE_ID,
      process.env.COLLECTION_ID
    );

    for (const doc of response.documents) {
      await databases.deleteDocument(
        process.env.DATABASE_ID,
        process.env.COLLECTION_ID,
        doc.$id
      );
      log(`Deleted document: ${doc.$id}`);
    }

    log("All mails deleted successfully.");
    return res.send("All mails deleted successfully."); // ✅ good

  } catch (error) {
    log("Error deleting mails: " + error.message);
    return res.send("Error deleting mails."); // ✅ also good
  }

  // 🔁 If you somehow exit the try/catch without hitting return
  return res.empty("empty"); // ✅ fallback to avoid warning
};
