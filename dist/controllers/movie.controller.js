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
exports.addComment = exports.addCriticRating = exports.addPublicRating = exports.deleteMovie = exports.getMovieTrailer = exports.getActors = exports.getTopRatedMovies = exports.getMoviesByDuration = exports.getMoviesByGenre = exports.getMovie = exports.getMovies = void 0;
const movie_1 = __importDefault(require("../models/movie"));
const user_1 = __importDefault(require("../models/user"));
const axios_1 = __importDefault(require("axios"));
// get popular movies
const getMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get("https://api.themoviedb.org/3/movie/popular?api_key=30cddc8f56542b9d585e5b5c035aab19");
        return res.status(200).json(response.data);
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
        // Verificar si la película ya existe en la base de datos
        const existingMovie = yield movie_1.default.findOne({ apiId: movieId });
        if (existingMovie) {
            return res.status(200).json(existingMovie);
        }
        else {
            // Obtener la película de la API
            const response = yield axios_1.default.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=30cddc8f56542b9d585e5b5c035aab19`);
            const movieData = response.data;
            // Obtener los géneros de la respuesta de la API
            const genres = movieData.genres.map((genre) => ({
                id: genre.id,
                name: genre.name,
            }));
            // Guardar la película en la base de datos
            const movie = new movie_1.default({
                apiId: movieData.id,
                title: movieData.title,
                image: `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,
                genres: genres,
                description: movieData.overview,
            });
            yield movie.save();
            return res.status(200).json(movieData);
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.getMovie = getMovie;
// getmovies by genre with trycatch
const getMoviesByGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { genre } = req.params;
        const response = yield axios_1.default.get(`https://api.themoviedb.org/3/discover/movie?api_key=30cddc8f56542b9d585e5b5c035aab19&with_genres=${genre}`);
        return res.status(200).json(response.data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.getMoviesByGenre = getMoviesByGenre;
// getmovies by duration with trycatch
const getMoviesByDuration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { duration } = req.params;
        const response = yield axios_1.default.get(`https://api.themoviedb.org/3/discover/movie?api_key=30cddc8f56542b9d585e5b5c035aab19&with_runtime.gte=${duration}`);
        return res.status(200).json(response.data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.getMoviesByDuration = getMoviesByDuration;
// get top rated movies
const getTopRatedMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get("https://api.themoviedb.org/3/movie/top_rated?api_key=30cddc8f56542b9d585e5b5c035aab19");
        return res.status(200).json(response.data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.getTopRatedMovies = getTopRatedMovies;
const getActors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get("https://api.themoviedb.org/3/search/multi?api_key=30cddc8f56542b9d585e5b5c035aab19&query=brad%20pitt");
        return res.status(200).json(response.data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.getActors = getActors;
// getMovieTrailer with trycatch
const getMovieTrailer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieId } = req.params;
        const response = yield axios_1.default.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=30cddc8f56542b9d585e5b5c035aab19`);
        return res.status(200).json(response.data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.getMovieTrailer = getMovieTrailer;
// deletemovie with trycatch
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieId } = req.params;
        yield movie_1.default.findOneAndDelete({ apiId: movieId });
        return res.status(200).json({ msg: "Movie deleted successfully" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.deleteMovie = deleteMovie;
// add public rating with trycatch
const addPublicRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieId } = req.params;
        const { rating } = req.body;
        const movie = yield movie_1.default.findOne({ apiId: movieId });
        if (!movie)
            return res.status(404).json({ msg: "Movie not found" });
        // validar que el rating sea un número entre 1 y 5
        if (rating < 1 || rating > 5)
            return res.status(400).json({ msg: "Rating must be between 1 and 5" });
        const newAverage = (movie.publicRating.average * movie.publicRating.count + rating) /
            (movie.publicRating.count + 1);
        movie.publicRating.average = newAverage;
        movie.publicRating.count++;
        yield movie.save();
        return res.status(200).json(movie);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.addPublicRating = addPublicRating;
// add critic rating with trycatch
const addCriticRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieId } = req.params;
        const { rating, userId } = req.body;
        const movie = yield movie_1.default.findOne({ apiId: movieId });
        if (!movie) {
            return res.status(404).json({ msg: "Movie not found" });
        }
        // validar que el rating sea un número entre 1 y 5
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ msg: "Rating must be between 1 and 5" });
        }
        // validar que el usuario sea crítico
        const user = yield user_1.default.findById(userId);
        if (!(user === null || user === void 0 ? void 0 : user.isCritic)) {
            return res.status(401).json({ msg: "Only critics can add critic ratings" });
        }
        const newAverage = (movie.criticRating.average * movie.criticRating.count + rating) /
            (movie.criticRating.count + 1);
        movie.criticRating.average = newAverage;
        movie.criticRating.count++;
        yield movie.save();
        return res.status(200).json(movie);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.addCriticRating = addCriticRating;
// add comment with trycatch
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieId } = req.params;
        const { userId, text } = req.body;
        const movie = yield movie_1.default.findOne({ apiId: movieId });
        if (!movie)
            return res.status(404).json({ msg: "Movie not found" });
        movie.comments.push({ user: userId, text: text });
        yield movie.save();
        return res.status(200).json(movie);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.addComment = addComment;
