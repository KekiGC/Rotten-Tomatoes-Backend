import { Document, Schema, model } from 'mongoose';
import { IUser } from './user';
import { IChatRoom } from './chatRoom';

export interface IMessage extends Document {
    chatRoomId: IChatRoom['_id'];
    sender: IUser['_id'];
    text: string;
}

const messageSchema = new Schema<IMessage>({
    chatRoomId: { type: Schema.Types.ObjectId, ref: 'ChatRoom' },
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
});

export default model<IMessage>('Message', messageSchema);