import { Router } from 'express';
const router = Router();

import { getMovies, getMovie, deleteMovie, addPublicRating, addCriticRating,
getMoviesByGenre, getActors, getTopRatedMovies, getMoviesByDuration,
addComment, getMovieByTitle } from '../controllers/movie.controller';

// Routes
// Gets
router.get('/movies', getMovies)
router.get('/movies/:movieId', getMovie)
router.get('/movies/genre/:genre', getMoviesByGenre)
router.get('/movies/duration/:duration', getMoviesByDuration)
router.get('/movies/rating/toprated', getTopRatedMovies)
router.get('/movies/search/:title', getMovieByTitle)
router.get('/actors', getActors)
router.get('/movie/:title', getMovieByTitle);

// Posts
router.post('/movies/:movieId/comment', addComment)
router.post('/movies/:movieId/rating/public', addPublicRating)
router.post('/movies/:movieId/rating/critic', addCriticRating)

router.delete('/movies/:movieId', deleteMovie)

export default router;