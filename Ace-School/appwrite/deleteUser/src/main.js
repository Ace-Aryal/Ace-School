import { Query } from 'appwrite';
import { Client, Users } from 'node-appwrite';

// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {
  // You can use the Appwrite SDK to interact with other services
  // For this example, we're using the Users service
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.DELETE_USER_API_KEY);
  const users = new Users(client);

  try {
    const payload = JSON.parse(req.bodyRaw || '{}');
    const email = payload["email"];

    log(email)

    if (!email) {
      return res.json({ error: "Missing email in payload" });
    }
    const userList = await users.list([
      Query.equal("email", [email])
    ]);

    if (userList.total === 0) {
      return res.json({ success: true, error: "Account not created yet" });
    }

    const userId = userList.users[0].$id;

    await users.delete(userId);

    return res.json({ success: true, deletedUser: userId });

  } catch (err) {
    error("Could not delete user: " + err.message);
    return res.json({ success: false, error: err.message });
  }

  // The req object contains the request data
  if (req.path === "/ping") {
    // Use res object to respond with text(), json(), or binary()
    // Don't forget to return a response!
    return res.text("Pong");
  }

  return res.json({
    motto: "Build like a team of hundreds_",
    learn: "https://appwrite.io/docs",
    connect: "https://appwrite.io/discord",
    getInspired: "https://builtwith.appwrite.io",
  });
};
