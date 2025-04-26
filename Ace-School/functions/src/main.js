const { Client, Databases, Query } = require("node-appwrite");

module.exports = async ({ req, res, log }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const databases = new Databases(client);

  try {
    const mails = await databases.listDocuments(
      process.env.DATABASE_ID,
      process.env.COLLECTION_ID
    );

    for (const mail of mails.documents) {
      await databases.deleteDocument(
        process.env.DATABASE_ID,
        process.env.COLLECTION_ID,
        mail.$id
      );
      log(`Deleted: ${mail.$id}`);
    }

    res.send("All mails deleted.");
  } catch (err) {
    log("Error: " + err.message);
    res.send("Failed: " + err.message);
  }
};
