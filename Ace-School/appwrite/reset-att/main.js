import { Client, Databases, Query } from "node-appwrite";

export default async ({ req, res, log }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);
  const databases = new Databases(client);

  const databaseId = process.env.DATABASE_ID;
  const collectionIds = [
    process.env.STAFF_ATT_COLLECTION,
    process.env.TEACHER_ATT_COLLECTION,
    process.env.STAFF_ATT_COLLECTION,
  ];
  try {
    collectionIds.forEach(async (collection) => {
      let offset = 0;
      const limit = 100;
      let totalFetched = 0;
      let hasMore = true;

      while (hasMore) {
        const res = await databases.listDocuments(databaseId, collection, [
          Query.limit(limit),
          Query.offset(offset),
        ]);

        if (res.documents.length === 0) break;

        for (const doc of res.documents) {
          await databases.updateDocument(databaseId, collection, doc.$id, {
            attendance: "noattendance", // Example field
          });
        }

        totalFetched += res.documents.length;
        offset += limit;
        hasMore = res.documents.length === limit; // If less than limit, we reached the end
      }
    });
    log("attendence reset complete");
    return res.send("Attendence Reset complete");
  } catch (error) {
    log("Error updating attendance");
    return res.send("Error reseting attendance");
  }

  return res.send("✅ Finished updating all documents.");
};
