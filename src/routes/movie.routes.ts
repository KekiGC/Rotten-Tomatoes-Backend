import { Router } from 'express';
const router = Router();

import { getMovies, getMovie, deleteMovie, addRating,
getMoviesByGenre, getActors, getTopRatedMovies, getMoviesByDuration,
addComment, getComments, getMovieByTitle, getLatestMovies, getMovieReviews } from '../controllers/movie.controller';

// Routes
// Gets
router.get('/movies', getMovies)
router.get('/movies/:movieId', getMovie)
router.get('/movies/search/latest', getLatestMovies)
router.get('/movies/genre/:genre', getMoviesByGenre)
router.get('/movies/duration/:duration', getMoviesByDuration)
router.get('/movies/rating/toprated', getTopRatedMovies)
router.get('/movies/search/:title', getMovieByTitle)
router.get('/movies/:movieId/reviews', getMovieReviews)
router.get('/actors', getActors)
router.get('/movie/:title', getMovieByTitle);
router.get('/movies/:movieId/comments', getComments)

// Posts
router.post('/movies/:movieId/comment', addComment)
router.post('/movies/:movieId/rating', addRating)
// router.post('/movies/:movieId/rating/public', addPublicRating)
// router.post('/movies/:movieId/rating/critic', addCriticRating)

router.delete('/movies/:movieId', deleteMovie)

export default router;