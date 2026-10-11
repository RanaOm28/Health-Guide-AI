import { Schema, model, type InferSchemaType } from "mongoose";

export const wellnessGoals = ["wellbeing", "lose", "gain", "maintain"] as const;

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
    },
    passwordHash: { type: String, required: true, select: false },
    goal: {
      type: String,
      enum: wellnessGoals,
      required: true,
      default: "wellbeing",
    },
  },
  { timestamps: true },
);

export type UserDocument = InferSchemaType<typeof userSchema>;
export const User = model("User", userSchema);
