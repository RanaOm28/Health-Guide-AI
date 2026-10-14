import { Router } from "express";
import { z } from "zod";
import { authenticate } from "../middleware/authenticate.js";
import { WeightEntry } from "../models/weight-entry.js";
import { asyncHandler } from "../utils/async-handler.js";
const router = Router();
const entrySchema = z.object({
    weightKg: z.coerce.number().min(0.1).max(1000),
    recordedAt: z.coerce.date().optional(),
});
router.use(authenticate);
router.get("/", asyncHandler(async (_request, response) => {
    const entries = await WeightEntry.find({ userId: response.locals.userId })
        .sort({ recordedAt: 1 })
        .limit(365)
        .lean();
    response.json({
        entries: entries.map(({ _id, weightKg, recordedAt }) => ({
            id: _id.toString(),
            weightKg,
            recordedAt,
        })),
    });
}));
router.post("/", asyncHandler(async (request, response) => {
    const input = entrySchema.parse(request.body);
    const entry = await WeightEntry.create({
        ...input,
        userId: response.locals.userId,
    });
    response.status(201).json({
        entry: {
            id: entry.id,
            weightKg: entry.weightKg,
            recordedAt: entry.recordedAt,
        },
    });
}));
export default router;
