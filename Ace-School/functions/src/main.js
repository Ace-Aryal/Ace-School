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

    const now = new Date();
    const cutoff = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000); // 1 day ago

    for (const doc of response.documents) {
      const createdAt = new Date(doc.$createdAt);

      if (createdAt < cutoff) {
        await databases.deleteDocument(
          process.env.DATABASE_ID,
          process.env.COLLECTION_ID,
          doc.$id
        );
        log(`Deleted old document: ${doc.$id}`);
      }
    }

    log("Old mails deleted.");
    return res.send("Old mails deleted.");



  } catch (error) {
    log("Error deleting mails: " + error.message);
    return res.send("Error deleting mails."); // ✅ also good
  }

  // 🔁 If you somehow exit the try/catch without hitting return
  return res.empty("empty"); // ✅ fallback to avoid warning
};
