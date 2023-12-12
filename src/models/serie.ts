import { Document, Schema, model } from "mongoose";

export interface ISerie extends Document {
    apiId: string;
    title: string;
    image: string;
    genres: string[];
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
}

const serieSchema = new Schema<ISerie>({
    apiId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    genres: [{ type: String, required: true }],
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
});


export default model<ISerie>('Serie', serieSchema);