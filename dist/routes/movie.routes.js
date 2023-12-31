"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const movie_controller_1 = require("../controllers/movie.controller");
const review_controller_1 = require("../controllers/review.controller");
// Routes
// Gets
router.get('/movies', movie_controller_1.getMovies);
router.get('/movies/:movieId', movie_controller_1.getMovie);
router.get('/movies/discover/:genre', movie_controller_1.getMoviesByGenre);
router.get('/movies/:movieId/similar', movie_controller_1.getSimilarMovies);
router.get('/movies/rating/toprated', movie_controller_1.getTopRatedMovies);
router.get('/movies/search/:title', movie_controller_1.getMovieByTitle);
router.get('/movies/:movieId/trailer', movie_controller_1.getMovieTrailer);
router.get('/movies/:movieId/reviews', review_controller_1.getMovieReviews);
router.get('/movies/:movieId/comments', movie_controller_1.getComments);
// Posts
router.post('/movies/discovery', movie_controller_1.movieFilter);
router.post('/movies/:movieId/comments', movie_controller_1.addComment);
router.post('/movies/:movieId/rating', movie_controller_1.addRating);
router.post('/comments/:commentId/replies', movie_controller_1.addReply);
router.post('/movies/:movieId/reviews', review_controller_1.createMovieReview);
// Deletes
router.delete('/movies/:movieId', movie_controller_1.deleteMovie);
exports.default = router;
