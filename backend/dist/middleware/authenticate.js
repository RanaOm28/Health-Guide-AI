import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
const cookieName = "healthguide_session";
export const authenticate = (request, response, next) => {
    const token = request.cookies[cookieName];
    if (!token) {
        response.status(401).json({ message: "Please sign in to continue." });
        return;
    }
    try {
        const payload = jwt.verify(token, env.JWT_SECRET);
        if (typeof payload.sub !== "string") {
            response.status(401).json({ message: "Your session is invalid. Please sign in again." });
            return;
        }
        response.locals.userId = payload.sub;
        next();
    }
    catch (error) {
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
    sameSite: "lax",
    path: "/",
};
export function createSessionToken(userId) {
    return jwt.sign({}, env.JWT_SECRET, {
        subject: userId,
        expiresIn: 60 * 60 * 24 * 7,
    });
}
export function sessionCookieName() {
    return cookieName;
}
