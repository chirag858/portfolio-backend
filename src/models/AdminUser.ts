import { Schema, model } from "mongoose";

const adminUserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

export const AdminUser = model("AdminUser", adminUserSchema);
