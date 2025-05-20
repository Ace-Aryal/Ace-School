import { Client, Databases } from "node-appwrite";


export default async ({ req, res, log, env }) => {
  const client = new Client()
    .setEndpoint(env.APPWRITE_ENDPOINT)
    .setProject(env.APPWRITE_PROJECT_ID)
    .setKey(env.APPWRITE_API_KEY);

  const databases = new Databases(client);

  const inboxCleaner = databases.listDocuments(
    env.DATABASE_ID,
    env.INBOX_COLLECTION_ID
  );
  const noticeCleaner = databases.listDocuments(
    env.DATABASE_ID,
    env.NOTICE_COLLECTION_ID
  );
  try {

    const [inboxResponse, noticeResponse] = await Promise.all([inboxCleaner, noticeCleaner])
    const now = new Date();
    const cutoff = new Date(now.getTime() - /*15 * 24 * 60 * */ 60 * 1000); // 15 day ago

    for (const doc of inboxResponse.documents) {
      const createdAt = new Date(doc.$createdAt);

      if (createdAt < cutoff) {
        await databases.deleteDocument(
          env.DATABASE_ID,
          env.INBOX_COLLECTION_ID,
          doc.$id
        );
        log(`Deleted old document: ${doc.$id}`);
      }
    }

    for (const doc of noticeResponse.documents) {
      const createdAt = new Date(doc.$createdAt);

      if (createdAt < cutoff) {
        await databases.deleteDocument(
          env.DATABASE_ID,
          env.NOTICE_COLLECTION_ID,
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
