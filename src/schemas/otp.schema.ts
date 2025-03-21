import { Document, model, Schema } from "mongoose";

export type TOtp = {
  email: string;
  code: string;
  expireAt: Date;
};

export interface IOTp extends TOtp, Document {}

const EXP_SECONDS: number = parseInt(process.env.OPT_EXP_SECONDS ?? "300");

export const otpSchema = new Schema(
  {
    email: {
      type: String,
    },
    code: {
      type: String,
    },
    expireAt: {
      type: Date,
      default: Date.now,
      index: {
        expireAfterSeconds: EXP_SECONDS,
        partialFilterExpression: { verified: false },
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: EXP_SECONDS,
    },
  },
  {
    timestamps: true,
    expireAfterSeconds: EXP_SECONDS,
  },
);

const Otp = model("otp", otpSchema);

export default Otp;
