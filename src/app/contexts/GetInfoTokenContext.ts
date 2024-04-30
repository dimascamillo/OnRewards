import { decodeToken } from "../utils/decodeToken";
import cookie from "cookie";
import { NextRequest } from "next/server";

export function getInfoTokenContext(request: NextRequest) {
  const cookies = cookie.parse(request.headers.get("Cookie") || "");
  const token = cookies["token"];

  const decode = decodeToken(token);

  console.log(decode);
}
