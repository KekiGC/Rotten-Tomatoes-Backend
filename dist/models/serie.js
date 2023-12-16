"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const genreSchema = new mongoose_1.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
});
const serieSchema = new mongoose_1.Schema({
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
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Comment" }],
    reviews: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Review" }],
});
exports.default = (0, mongoose_1.model)("Serie", serieSchema);
