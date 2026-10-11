import { Schema, model, type InferSchemaType } from "mongoose";

const weightEntrySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    weightKg: { type: Number, required: true, min: 0.1, max: 1000 },
    recordedAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true },
);

weightEntrySchema.index({ userId: 1, recordedAt: -1 });

export type WeightEntryDocument = InferSchemaType<typeof weightEntrySchema>;
export const WeightEntry = model("WeightEntry", weightEntrySchema);
