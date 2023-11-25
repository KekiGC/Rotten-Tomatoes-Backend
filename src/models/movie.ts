import { Document, Schema, model } from "mongoose";
import { IUser } from "./user";

export interface IMovie extends Document {
  title: string;
  image: string;
  genre: string;
  description: string;
  trailer: string;
  publicRating: {
    average: number;
    count: number;
  };
  criticRating: {
    average: number;
    count: number;
  };
  comments: {
    user: IUser['_id'];
    text: string;
  }[];
}

const movieSchema = new Schema<IMovie>({
  title: { type: String, required: true },
  image: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String, required: true },
  trailer: { type: String, required: true },
  publicRating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
  criticRating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
  comments: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      text: { type: String, required: false },
    },
  ],
});

export default model<IMovie>('Movie', movieSchema);
