import "dotenv/config";
import { z } from "zod";
const envSchema = z.object({
    PORT: z.coerce.number().int().positive().default(4000),
    FRONTEND_ORIGIN: z.string().url().default("http://localhost:3000"),
    MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
    JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});
export const env = envSchema.parse(process.env);
