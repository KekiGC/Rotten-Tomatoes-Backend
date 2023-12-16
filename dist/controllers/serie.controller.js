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
exports.deleteSerie = exports.getSerie = exports.serieFilter = void 0;
const serie_1 = __importDefault(require("../models/serie"));
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
