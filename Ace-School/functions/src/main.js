import { Client, Databases } from "node-appwrite";

export default async ({ req, res, log }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)  // Your Appwrite endpoint
    .setProject(process.env.APPWRITE_PROJECT_ID)  // Your Appwrite project ID
    .setKey(process.env.APPWRITE_API_KEY);  // API key with permissions to delete documents

  const databases = new Databases(client);

  try {
    // List all documents (mails) in the collection
    const response = await databases.listDocuments(
      process.env.DATABASE_ID,  // Your database ID
      process.env.COLLECTION_ID  // Your collection ID
    );

    // Loop through each mail/document and delete it
    for (const doc of response.documents) {
      await databases.deleteDocument(
        process.env.DATABASE_ID,
        process.env.COLLECTION_ID,
        doc.$id
      );
      log(`Deleted document: ${doc.$id}`);
    }

    log("All mails deleted successfully.");
    res.send("All mails deleted successfully.");
  } catch (error) {
    log("Error deleting mails: " + error.message);
    res.send("Error deleting mails.");
  }
};

