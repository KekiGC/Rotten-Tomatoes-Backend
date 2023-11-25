"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const movieSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    synopsis: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    averageRating: { type: Number, default: 0 },
    ratings: [
        {
            userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
            rating: { type: Number, required: true },
        },
    ],
});
exports.default = (0, mongoose_1.model)("Movie", movieSchema);
