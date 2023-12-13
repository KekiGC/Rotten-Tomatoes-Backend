"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMovieReviews = exports.createReview = void 0;
const review_1 = __importDefault(require("../models/review"));
const movie_1 = __importDefault(require("../models/movie"));
const user_1 = __importDefault(require("../models/user"));
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieId } = req.params;
        const { userId, rating, content } = req.body;
        const movie = yield movie_1.default.findOne({ apiId: movieId }).populate({
            path: 'reviews',
            populate: {
                path: 'user',
                select: 'username',
            },
        });
        if (!movie) {
            return res.status(404).json({ msg: "Movie not found" });
        }
        if (userId) {
            // Si se proporciona el ID del usuario, verificar si es crítico
            const user = yield user_1.default.findById(userId);
            if (!(user === null || user === void 0 ? void 0 : user.isCritic)) {
                return res.status(401).json({ msg: "User is not a critic" });
            }
            else {
                const review = new review_1.default({
                    user: userId,
                    movie: movie._id,
                    rating,
                    content,
                });
                yield review.save();
                movie.reviews.push(review._id);
                yield movie.save();
                return res.status(201).json(review);
            }
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.createReview = createReview;
const getMovieReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieId } = req.params;
        const movie = yield movie_1.default.findOne({ apiId: movieId }).populate({
            path: 'reviews',
            populate: {
                path: 'user',
                select: 'username',
            },
        });
        if (!movie) {
            return res.status(404).json({ msg: "Movie not found" });
        }
        console.log("holaaaaaa", movie.reviews);
        return res.status(200).json(movie.reviews);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.getMovieReviews = getMovieReviews;
