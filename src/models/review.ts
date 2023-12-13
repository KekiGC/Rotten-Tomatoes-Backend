import { Document, Schema, model } from "mongoose";
import { IUser } from "./user";
import { IMovie } from "./movie";

export interface IReview extends Document {
  user: IUser["_id"];
  movie: IMovie["_id"];
  rating: number;
  content: string;
}

const reviewSchema = new Schema<IReview>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    movie: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
    rating: { type: Number, required: true },
    content: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<IReview>('Review', reviewSchema)