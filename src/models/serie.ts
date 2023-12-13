import { Document, Schema, model } from "mongoose";

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
    title: string;
    image: string;
    genres: IGenre[];
    description: string;
    trailer: string;
    apiRating: {
        average: number;
        count: number;
    };
    seasons: ISeasons[];
}

const serieSchema = new Schema<ISerie>({
    apiId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    genres: [{ type: String, required: true }],
    description: { type: String, required: true },
    trailer: { type: String, required: false },
    apiRating: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 },
    },
    seasons: [{
        id: { type: Number, required: true },
        name: { type: String, required: true },
        image: { type: String, required: true },
        episodeCount: { type: Number, required: true },
        description: { type: String, required: true },
        voteAverage: { type: Number, required: true }
    }],
});


export default model<ISerie>('Serie', serieSchema);