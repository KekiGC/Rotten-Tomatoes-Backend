import { Document, Schema, model } from "mongoose";
import { IUser } from "./user";

export interface IComment extends Document {
    user: IUser['_id'];
    text: string;
    replies: {
      user: IUser['_id'];
      text: string;
    }[];
}

const replySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
});
  
const commentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
    replies: [replySchema],
});

export default model<IComment>('Comment', commentSchema);