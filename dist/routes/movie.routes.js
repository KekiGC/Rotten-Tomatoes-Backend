"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const movie_controller_1 = require("../controllers/movie.controller");
// Routes
// Gets
router.get('/movies', movie_controller_1.getMovies);
router.get('/movies/:movieId', movie_controller_1.getMovie);
router.get('/movies/genre/:genre', movie_controller_1.getMoviesByGenre);
router.get('/movies/duration/:duration', movie_controller_1.getMoviesByDuration);
router.get('/movies/rating/toprated', movie_controller_1.getTopRatedMovies);
router.get('/actors', movie_controller_1.getActors);
router.delete('/movies/:movieId', movie_controller_1.deleteMovie);
router.post('/movies/:movieId/rating', movie_controller_1.addPublicRating);
exports.default = router;
