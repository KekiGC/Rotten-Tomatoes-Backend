"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    movie: { type: mongoose_1.Schema.Types.ObjectId, ref: "Movie", required: false },
    serie: { type: mongoose_1.Schema.Types.ObjectId, ref: "Serie", required: false },
    rating: { type: Number, required: true },
    content: { type: String },
}, {
    timestamps: true,
    versionKey: false,
});
exports.default = (0, mongoose_1.model)('Review', reviewSchema);
