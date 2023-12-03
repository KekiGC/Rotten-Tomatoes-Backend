"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const movieSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String, required: true },
    trailer: { type: String, required: true },
    publicRating: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 },
    },
    criticRating: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 },
    },
    comments: [
        {
            user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
            text: { type: String, required: false },
        },
    ],
});
exports.default = (0, mongoose_1.model)('Movie', movieSchema);
