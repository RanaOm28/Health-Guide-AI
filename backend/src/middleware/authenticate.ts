import type { RequestHandler } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { env } from "../config/env.js";

const cookieName = "healthguide_session";

export const authenticate: RequestHandler = (request, response, next) => {
  const token = request.cookies[cookieName] as string | undefined;

  if (!token) {
    response.status(401).json({ message: "Please sign in to continue." });
    return;
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    if (typeof payload.sub !== "string") {
      response.status(401).json({ message: "Your session is invalid. Please sign in again." });
      return;
    }

    response.locals.userId = payload.sub;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
      response.clearCookie(cookieName, cookieOptions);
      response.status(401).json({ message: "Your session has expired. Please sign in again." });
      return;
    }
    next(error);
  }
};

export const cookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export function createSessionToken(userId: string) {
  return jwt.sign({}, env.JWT_SECRET, {
    subject: userId,
    expiresIn: 60 * 60 * 24 * 7,
  });
}

export function sessionCookieName() {
  return cookieName;
}
