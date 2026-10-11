import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { asyncHandler } from "../utils/async-handler.js";
import {
  authenticate,
  cookieOptions,
  createSessionToken,
  sessionCookieName,
} from "../middleware/authenticate.js";
import { User, wellnessGoals } from "../models/user.js";

const router = Router();
const credentialsSchema = z.object({
  email: z.string().trim().email().max(254).transform((email) => email.toLowerCase()),
  password: z.string().min(8).max(128),
});
const registrationSchema = credentialsSchema.extend({
  name: z.string().trim().min(1).max(80),
  goal: z.enum(wellnessGoals).default("wellbeing"),
});

const publicUser = (user: {
  id: string;
  name: string;
  email: string;
  goal: string;
}) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  goal: user.goal,
});

router.post(
  "/register",
  asyncHandler(async (request, response) => {
    const input = registrationSchema.parse(request.body);
    const passwordHash = await bcrypt.hash(input.password, 12);
    const user = await User.create({ ...input, passwordHash });
    response.cookie(sessionCookieName(), createSessionToken(user.id), {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    response.status(201).json({ user: publicUser(user) });
  }),
);

router.post(
  "/login",
  asyncHandler(async (request, response) => {
    const input = credentialsSchema.parse(request.body);
    const user = await User.findOne({ email: input.email }).select("+passwordHash");
    const passwordMatches =
      user !== null && (await bcrypt.compare(input.password, user.passwordHash));

    if (!user || !passwordMatches) {
      response.status(401).json({ message: "Email or password is incorrect." });
      return;
    }

    response.cookie(sessionCookieName(), createSessionToken(user.id), {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    response.json({ user: publicUser(user) });
  }),
);

router.post("/logout", (_request, response) => {
  response.clearCookie(sessionCookieName(), cookieOptions);
  response.status(200).json({ message: "Signed out successfully." });
});

router.get(
  "/me",
  authenticate,
  asyncHandler(async (_request, response) => {
    const user = await User.findById(response.locals.userId);
    if (!user) {
      response.clearCookie(sessionCookieName(), cookieOptions);
      response.status(401).json({ message: "Account not found. Please sign in again." });
      return;
    }
    response.json({ user: publicUser(user) });
  }),
);

export default router;
