import { withMiddleware } from "next/server";
import { middleware as authMiddleware } from "./src/middleware/auth";

export default withMiddleware(authMiddleware);
