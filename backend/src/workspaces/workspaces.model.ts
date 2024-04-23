import { InferSchemaType, Schema, model } from "mongoose";
import { todoSchema } from "../todos/todos.model";

const workspaceSchema = new Schema({
    name: { type: String, required: true, unique: true },
    owner_id: { type: Schema.Types.ObjectId },
    members: [{ 
        user_id: String,
        email: String
    }],
    todos: [todoSchema],
    isPrivate: { type: Boolean, default: false },
}, { versionKey: false });

export type Workspace = InferSchemaType<typeof workspaceSchema>;
export const WorkspaceModel = model<Workspace>('workspace', workspaceSchema);