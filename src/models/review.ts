import { Document, Schema, model } from "mongoose";
import { IUser } from "./user";
import { IMovie } from "./movie";
import { ISerie } from "./serie";

export interface IReview extends Document {
  user: IUser["_id"];
  movie: IMovie["_id"];
  serie: ISerie["_id"];
  rating: number;
  content: string;
}

const reviewSchema = new Schema<IReview>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    movie: { type: Schema.Types.ObjectId, ref: "Movie", required: false },
    serie: { type: Schema.Types.ObjectId, ref: "Serie", required: false },
    rating: { type: Number, required: true },
    content: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<IReview>('Review', reviewSchema)