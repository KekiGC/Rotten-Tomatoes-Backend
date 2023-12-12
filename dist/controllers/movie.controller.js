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
exports.movieFilter = exports.getMovieReviews = exports.getMovieByTitle = exports.addReply = exports.getComments = exports.addComment = exports.addRating = exports.deleteMovie = exports.getMovieTrailer = exports.getTopRatedMovies = exports.getMoviesByDuration = exports.getMoviesByGenre = exports.getMovie = exports.getMovies = void 0;
const movie_1 = __importDefault(require("../models/movie"));
const user_1 = __importDefault(require("../models/user"));
const comment_1 = __importDefault(require("../models/comment"));
const axios_1 = __importDefault(require("axios"));
// get popular movies
const getMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get("https://api.themoviedb.org/3/movie/popular?api_key=ddeb2fc989f1840de99b5c1371708693");
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
            const response = yield axios_1.default.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=ddeb2fc989f1840de99b5c1371708693`);
            const movieData = response.data;
            // Obtener los géneros de la respuesta de la API
            const genres = movieData.genres.map((genre) => ({
                id: genre.id,
                name: genre.name,
            }));
            // Guardar la película en la base de datos
            const movie = new movie_1.default({
                apiId: movieId,
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
        const response = yield axios_1.default.get(`https://api.themoviedb.org/3/discover/movie?api_key=ddeb2fc989f1840de99b5c1371708693&with_genres=${genre}`);
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
        const response = yield axios_1.default.get("https://api.themoviedb.org/3/movie/top_rated?api_key=ddeb2fc989f1840de99b5c1371708693");
        return res.status(200).json(response.data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.getTopRatedMovies = getTopRatedMovies;
// getMovieTrailer with trycatch
const getMovieTrailer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieId } = req.params;
        const response = yield axios_1.default.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=ddeb2fc989f1840de99b5c1371708693`);
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
const addRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieId } = req.params;
        const { rating, userId } = req.body;
        const movie = yield movie_1.default.findOne({ apiId: movieId });
        if (!movie) {
            return res.status(404).json({ msg: "Movie not found" });
        }
        // Validar que el rating sea un número entre 1 y 10
        if (rating < 1 || rating > 10) {
            return res.status(400).json({ msg: "Rating must be between 1 and 10" });
        }
        if (userId) {
            // Si se proporciona el ID del usuario, verificar si es crítico
            const user = yield user_1.default.findById(userId);
            if (!(user === null || user === void 0 ? void 0 : user.isCritic)) {
                return res
                    .status(401)
                    .json({ msg: "Only critics can add critic ratings" });
            }
            const newAverage = (movie.criticRating.average * movie.criticRating.count + rating) /
                (movie.criticRating.count + 1);
            movie.criticRating.average = newAverage;
            movie.criticRating.count++;
        }
        else {
            // Si no se proporciona el ID del usuario, utilizar rating público
            const newAverage = (movie.publicRating.average * movie.publicRating.count + rating) /
                (movie.publicRating.count + 1);
            movie.publicRating.average = newAverage;
            movie.publicRating.count++;
        }
        yield movie.save();
        return res.status(200).json(movie);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.addRating = addRating;
// add comment with trycatch
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieId } = req.params;
        const { userId, text } = req.body;
        const movie = yield movie_1.default.findOne({ apiId: movieId });
        if (!movie) {
            return res.status(404).json({ msg: "Movie not found" });
        }
        const comment = new comment_1.default({
            user: userId,
            text,
            replies: [],
        });
        yield comment.save();
        movie.comments.push(comment._id);
        yield movie.save();
        return res.status(200).json(movie);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.addComment = addComment;
// get the comments of a movie
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieId } = req.params;
        const movie = yield movie_1.default.findOne({ apiId: movieId }).populate({
            path: 'comments',
            populate: {
                path: 'user',
                select: 'username',
            },
        }).populate({
            path: 'comments',
            populate: {
                path: 'replies.user',
                select: 'username',
            },
        });
        if (!movie) {
            return res.status(404).json({ msg: "Movie not found" });
        }
        return res.status(200).json(movie.comments);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.getComments = getComments;
const addReply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId } = req.params;
        const { userId, text } = req.body;
        const parentComment = yield comment_1.default.findById(commentId);
        if (!parentComment) {
            return res.status(404).json({ msg: "Parent comment not found" });
        }
        const reply = new comment_1.default({
            user: userId,
            text,
        });
        yield reply.save();
        parentComment.replies.push(reply);
        yield parentComment.save();
        return res.status(200).json(parentComment);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.addReply = addReply;
// get movie by title
const getMovieByTitle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.params;
        const response = yield axios_1.default.get(`https://api.themoviedb.org/3/search/movie?api_key=ddeb2fc989f1840de99b5c1371708693&query=${encodeURIComponent(title)}`);
        const movieData = response.data.results; // array de películas
        if (!movieData) {
            return res.status(404).json({ msg: 'Movie not found' });
        }
        return res.status(200).json(movieData);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.getMovieByTitle = getMovieByTitle;
// get movie reviews
const getMovieReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieId } = req.params;
        const response = yield axios_1.default.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=ddeb2fc989f1840de99b5c1371708693`);
        return res.status(200).json(response.data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.getMovieReviews = getMovieReviews;
// filter movies by genre, duration, year and sort by
const movieFilter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { genre, duration, year, sortBy } = req.body;
        let query = `https://api.themoviedb.org/3/discover/movie?api_key=ddeb2fc989f1840de99b5c1371708693`;
        if (genre)
            query += `&with_genres=${genre}`;
        if (duration)
            query += `&with_runtime.gte=${duration}`;
        if (year)
            query += `&primary_release_year=${year}`;
        if (sortBy)
            query += `&sort_by=${sortBy}`;
        const response = yield axios_1.default.get(query);
        return res.status(200).json(response.data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.movieFilter = movieFilter;
