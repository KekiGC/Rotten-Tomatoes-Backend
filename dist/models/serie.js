"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const serieSchema = new mongoose_1.Schema({
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
exports.default = (0, mongoose_1.model)('Serie', serieSchema);
