// next.config.mjs
import { withMiddleware } from "next/server";
import { middleware } from "./src/middleware/auth";

export default withMiddleware({
  "/auth/*": middleware,
});
