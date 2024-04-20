import { InferSchemaType, Schema, model } from "mongoose";

const todoSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    created_by: {
        user_id: Schema.Types.ObjectId,
        email: String
    }
}, { versionKey: false });

export type Todo = InferSchemaType<typeof todoSchema>;
export const TodoModel = model<Todo>('todo', todoSchema);