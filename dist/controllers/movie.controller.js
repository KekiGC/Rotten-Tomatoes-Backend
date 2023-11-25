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
exports.getRating = exports.addRating = exports.deleteMovie = exports.updateMovie = exports.createMovie = exports.getMovie = exports.getMovies = void 0;
const movie_1 = __importDefault(require("../models/movie"));
const user_1 = __importDefault(require("../models/user"));
// getmovies with trycatch
const getMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield movie_1.default.find();
        return res.status(200).json(movies);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.getMovies = getMovies;
// getmovie with trycatch
const getMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieId } = req.params;
        const movie = yield movie_1.default.findById(movieId);
        return res.status(200).json(movie);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.getMovie = getMovie;
// createmovie with trycatch
const createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, synopsis, releaseYear } = req.body;
        const newMovie = new movie_1.default({
            title,
            synopsis,
            releaseYear,
        });
        yield newMovie.save();
        return res.status(201).json(newMovie);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.createMovie = createMovie;
// updatemovie with trycatch
const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieId } = req.params;
        const { title, synopsis, releaseYear } = req.body;
        const updatedMovie = yield movie_1.default.findByIdAndUpdate(movieId, { title, synopsis, releaseYear }, { new: true });
        return res.status(200).json(updatedMovie);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.updateMovie = updateMovie;
// deletemovie with trycatch
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieId } = req.params;
        yield movie_1.default.findByIdAndDelete(movieId);
        return res.status(200).json({ msg: 'Movie deleted successfully' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.deleteMovie = deleteMovie;
// addRating with trycatch
const addRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieId } = req.params;
        const { userId, rating } = req.body;
        const user = yield user_1.default.findById(userId);
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }
        const movie = yield movie_1.default.findById(movieId);
        if (!movie) {
            return res.status(400).json({ msg: 'Movie not found' });
        }
        const newRating = {
            userId,
            rating,
        };
        movie.ratings.push(newRating);
        let sum = 0;
        movie.ratings.forEach((rating) => {
            sum += rating.rating;
        });
        movie.averageRating = sum / movie.ratings.length;
        yield movie.save();
        return res.status(200).json(movie);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.addRating = addRating;
// getRating with trycatch
const getRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieId } = req.params;
        const { userId } = req.body;
        const movie = yield movie_1.default.findById(movieId);
        if (!movie) {
            return res.status(400).json({ msg: 'Movie not found' });
        }
        const rating = movie.ratings.find((rating) => rating.userId == userId);
        return res.status(200).json(rating);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.getRating = getRating;
