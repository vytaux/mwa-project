import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
}, { versionKey: false })

export type User = InferSchemaType<typeof userSchema>;
export const UserModel = model<User>('user', userSchema);