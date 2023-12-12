import { Document, Schema, model } from "mongoose";
import { IComment } from "./comment";

interface IGenre {
  id: number;
  name: string;
}

export interface IMovie extends Document {
  apiId: string;
  title: string;
  image: string;
  genres: IGenre[];
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
  comments: IComment["_id"][];
}

const movieSchema = new Schema<IMovie>({
  apiId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  genres: [{ id: Number, name: String }],
  description: { type: String, required: true },
  trailer: { type: String, required: false },
  publicRating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
  criticRating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

export default model<IMovie>('Movie', movieSchema);
