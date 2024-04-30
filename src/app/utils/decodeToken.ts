import jwt from "jsonwebtoken";

export interface JwtPayload {
  type: string;
  sub: string;
}

export function decodeToken(token: string | undefined): JwtPayload | null {
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.decode(token) as JwtPayload | null;
    if (decoded && typeof decoded === "object" && "type" in decoded) {
      return decoded;
    }
  } catch (error) {
    console.error("Failed to decode token:", error);
  }

  return null;
}
