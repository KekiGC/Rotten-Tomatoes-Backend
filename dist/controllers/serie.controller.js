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
exports.getSimilarSeries = exports.getSerieComments = exports.addSerieComment = exports.addSerieRating = exports.deleteSerie = exports.getSerie = exports.serieFilter = void 0;
const serie_1 = __importDefault(require("../models/serie"));
const user_1 = __importDefault(require("../models/user"));
const comment_1 = __importDefault(require("../models/comment"));
const axios_1 = __importDefault(require("axios"));
// serie filter
const serieFilter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { genre, duration, year, sortBy } = req.body;
        let query = `https://api.themoviedb.org/3/discover/tv?api_key=ddeb2fc989f1840de99b5c1371708693`;
        if (genre)
            query += `&with_genres=${genre}`;
        if (duration)
            query += `&with_runtime.gte=${duration}`;
        if (year)
            query += `&first_air_date_year=${year}`;
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
exports.serieFilter = serieFilter;
// get serie by id
const getSerie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { serieId } = req.params;
        // verificar si la serie ya existe en la base de datos
        const existingSerie = yield serie_1.default.findOne({ apiId: serieId });
        if (existingSerie) {
            return res.status(200).json(existingSerie);
        }
        else {
            const response = yield axios_1.default.get(`https://api.themoviedb.org/3/tv/${serieId}?api_key=ddeb2fc989f1840de99b5c1371708693`);
            const serieData = response.data;
            console.log(serieData.seasons);
            const genres = serieData.genres.map((genre) => ({
                id: genre.id,
                name: genre.name,
            }));
            // guardar la serie en la base de datos
            const serie = new serie_1.default({
                apiId: serieData.id,
                name: serieData.name,
                image: `https://image.tmdb.org/t/p/w500${serieData.poster_path}`,
                genres: genres,
                description: serieData.overview,
                seasons: serieData.seasons,
            });
            yield serie.save();
            return res.status(200).json(serieData);
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.getSerie = getSerie;
// delete serie by id
const deleteSerie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { serieId } = req.params;
        yield serie_1.default.findOneAndDelete({ apiId: serieId });
        return res.status(200).json({ msg: "Serie deleted successfully" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.deleteSerie = deleteSerie;
const addSerieRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { serieId } = req.params;
        const { rating, userId } = req.body;
        const serie = yield serie_1.default.findOne({ apiId: serieId });
        if (!serie) {
            return res.status(404).json({ msg: "Serie not found" });
        }
        // check if rating is between 1 and 10
        if (rating < 1 || rating > 10) {
            return res.status(400).json({ msg: "Rating must be between 1 and 10" });
        }
        if (userId) {
            const user = yield user_1.default.findById(userId);
            if (!user) {
                return res.status(404).json({ msg: "User not found" });
            }
            // check if user is critic
            if (!user.isCritic) {
                const newAverage = (serie.publicRating.average * serie.publicRating.count + rating) /
                    (serie.publicRating.count + 1);
                serie.publicRating.average = newAverage;
                serie.publicRating.count++;
            }
            else {
                const newAverage = (serie.criticRating.average * serie.criticRating.count + rating) /
                    (serie.criticRating.count + 1);
                serie.criticRating.average = newAverage;
                serie.criticRating.count++;
            }
        }
        yield serie.save();
        return res.status(200).json(serie);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.addSerieRating = addSerieRating;
const addSerieComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { serieId } = req.params;
        const { userId, text } = req.body;
        const serie = yield serie_1.default.findOne({ apiId: serieId });
        if (!serie) {
            return res.status(404).json({ msg: "Serie not found" });
        }
        const comment = new comment_1.default({
            user: userId,
            text,
            replies: [],
        });
        yield comment.save();
        serie.comments.push(comment._id);
        yield serie.save();
        return res.status(200).json(serie);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.addSerieComment = addSerieComment;
const getSerieComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { serieId } = req.params;
        const serie = yield serie_1.default.findOne({ apiId: serieId })
            .populate({
            path: "comments",
            populate: {
                path: "user",
                select: "username",
            },
        })
            .populate({
            path: "comments",
            populate: {
                path: "replies.user",
                select: "username",
            },
        });
        if (!serie) {
            return res.status(404).json({ msg: "Serie not found" });
        }
        return res.status(200).json(serie.comments);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.getSerieComments = getSerieComments;
// get similar series
const getSimilarSeries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { serieId } = req.params;
        const response = yield axios_1.default.get(`https://api.themoviedb.org/3/tv/${serieId}/similar?api_key=ddeb2fc989f1840de99b5c1371708693`);
        return res.status(200).json(response.data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.getSimilarSeries = getSimilarSeries;
