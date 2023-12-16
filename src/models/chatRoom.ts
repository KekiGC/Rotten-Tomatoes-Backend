import { Schema, Document, model } from "mongoose";
import { IUser } from "./user";
import { IMessage } from "./messages";

export interface IChatRoom extends Document {
    name: string;
    isPrivate: boolean;
    participants: IUser["_id"][]; // Array de IDs de usuarios
    messages: IMessage["_id"][]; // Array de IDs de mensajes
}

const chatRoomSchema = new Schema<IChatRoom>({
    name: { type: String, required: true },
    isPrivate: { type: Boolean, required: true, default: false  },
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});

export default model<IChatRoom>("ChatRoom", chatRoomSchema);