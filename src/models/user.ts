import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import { IMovie } from "./movie";

export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  name: string;
  lastname: string;
  isCritic: boolean;
  moviesRated: {
    movie: IMovie["_id"];
    rating: number;
  }[];
  comparePassword: (password: string) => Promise<boolean>;
  // editProfile: (username: string, bio: string) => Promise<void>;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    isCritic: {
      type: Boolean,
      default: false,
    },
    moviesRated: [
      {
        movie: { type: Schema.Types.ObjectId, ref: "Movie" },
        rating: { type: Number, required: true },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre<IUser>("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

// userSchema.methods.editProfile = async function (
//   username: string,
//   bio: string
// ): Promise<void> {
//   this.username = username;
//   this.bio = bio;
//   await this.save();
// };

export default model<IUser>("User", userSchema);