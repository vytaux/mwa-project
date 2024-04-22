import { InferSchemaType, Schema, model } from "mongoose";

export const todoSchema = new Schema({
    title: { type: String, required: true, trim: true },
    body: { type: String, trim: true },
    dueDate: { type: Date, required: false },
    completedAt: { type: Date },
    created_by: {
        user_id: Schema.Types.ObjectId,
        email: String
    },
    category: {
        type: String,
        enum: ['personal', 'work', 'other'],
        default: 'personal',
    },
    tags: [String],
    deletedAt: { type: Date, default: null }
}, { timestamps: true, versionKey: false });

export type Todo = InferSchemaType<typeof todoSchema>;