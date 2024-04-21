import { InferSchemaType, Schema, model } from "mongoose";

const workspaceSchema = new Schema({
    name: { type: String, required: true },
    owner_id: { type: Schema.Types.ObjectId },
    members: [{
        user_id: Schema.Types.ObjectId,
        email: String
    }]
}, { versionKey: false });

export type Workspace = InferSchemaType<typeof workspaceSchema>;
export const WorkspaceModel = model<Workspace>('workspace', workspaceSchema);