"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const movie_controller_1 = require("../controllers/movie.controller");
// Routes
// Gets
router.get('/movies', movie_controller_1.getMovies);
router.get('/movies/:movieId', movie_controller_1.getMovie);
router.get('/movies/search/latest', movie_controller_1.getLatestMovies);
router.get('/movies/genre/:genre', movie_controller_1.getMoviesByGenre);
router.get('/movies/duration/:duration', movie_controller_1.getMoviesByDuration);
router.get('/movies/rating/toprated', movie_controller_1.getTopRatedMovies);
router.get('/movies/search/:title', movie_controller_1.getMovieByTitle);
router.get('/movies/:movieId/reviews', movie_controller_1.getMovieReviews);
router.get('/actors', movie_controller_1.getActors);
router.get('/movie/:title', movie_controller_1.getMovieByTitle);
router.get('/movies/:movieId/comments', movie_controller_1.getComments);
// Posts
router.post('/movies/:movieId/comment', movie_controller_1.addComment);
router.post('/movies/:movieId/rating', movie_controller_1.addRating);
// router.post('/movies/:movieId/rating/public', addPublicRating)
// router.post('/movies/:movieId/rating/critic', addCriticRating)
router.delete('/movies/:movieId', movie_controller_1.deleteMovie);
exports.default = router;
