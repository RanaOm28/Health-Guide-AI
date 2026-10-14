import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { rateLimit } from "express-rate-limit";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/error-handler.js";
import authRouter from "./routes/auth.js";
import weightEntriesRouter from "./routes/weight-entries.js";
const app = express();
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { message: "Too many sign-in attempts. Please try again later." },
});
app.disable("x-powered-by");
app.use(cors({ origin: env.FRONTEND_ORIGIN, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());
app.get("/api/health", (_request, response) => {
    response.json({ status: "ok" });
});
app.use("/api/auth", authLimiter, authRouter);
app.use("/api/weight-entries", weightEntriesRouter);
app.use(errorHandler);
export default app;
