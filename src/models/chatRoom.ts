import { Schema, Document, model } from "mongoose";
import { IUser } from "./user";

export interface IChatRoom extends Document {
    participants: IUser["_id"][]; // Array de IDs de usuarios
}

const chatRoomSchema = new Schema<IChatRoom>({
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export default model<IChatRoom>("ChatRoom", chatRoomSchema);