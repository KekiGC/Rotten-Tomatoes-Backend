import { Document, Schema, model } from "mongoose";
import { IComment } from "./comment";
import { IReview } from "./review";

interface IGenre {
  id: number;
  name: string;
}

interface ISeasons {
  id: number;
  name: string;
  image: string;
  episodeCount: number;
  description: string;
  voteAverage: number;
}

export interface ISerie extends Document {
  apiId: string;
  name: string;
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
  seasons: ISeasons[];
  comments: IComment["_id"][];
  reviews: IReview["_id"][];
}

const genreSchema = new Schema<IGenre>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
});

const serieSchema = new Schema<ISerie>({
  apiId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String, required: false },
  genres: [genreSchema],
  description: { type: String, required: false },
  trailer: { type: String, required: false },
  publicRating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
  criticRating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
  seasons: [
    {
      id: { type: Number, required: false },
      name: { type: String, required: false },
      image: { type: String, required: false },
      episodeCount: { type: Number, required: false },
      description: { type: String, required: false },
      voteAverage: { type: Number, required: false },
    },
  ],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

export default model<ISerie>("Serie", serieSchema);
