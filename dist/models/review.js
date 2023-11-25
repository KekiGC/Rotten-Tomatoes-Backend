"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    movieId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Movie" },
    review: { type: String, required: true },
    rating: { type: Number, required: true },
});
exports.default = (0, mongoose_1.model)("Review", reviewSchema);
