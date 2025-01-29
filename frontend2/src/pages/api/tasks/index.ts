import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { AuthService } from "@/domain/services/AuthService";
import { UserService } from "@/domain/services/UserService";
import { client } from "@/infrastructure/graphql/apollo-client";

const userService = new UserService(client);
const authService = new AuthService(userService);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({
      error: "You must be signed in to access this endpoint.",
    });
  }

  const user = await authService.validateSession(session);
  if (!user) {
    return res.status(401).json({
      error: "Invalid session.",
    });
  }

  switch (req.method) {
    case "GET":
      try {
        // Your task fetching logic here using your service layer
        return res.status(200).json({ tasks: [] });
      } catch (error) {
        return res.status(500).json({ error: "Failed to fetch tasks" });
      }
    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
