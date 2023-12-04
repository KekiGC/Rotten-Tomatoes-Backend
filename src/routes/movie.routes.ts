import { Router } from 'express';
const router = Router();

import { getMovies, getMovie, deleteMovie, addPublicRating,
getMoviesByGenre, getActors, getTopRatedMovies, getMoviesByDuration } from '../controllers/movie.controller';


// Routes
// Gets
router.get('/movies', getMovies)
router.get('/movies/:movieId', getMovie)
router.get('/movies/genre/:genre', getMoviesByGenre)
router.get('/movies/duration/:duration', getMoviesByDuration)
router.get('/movies/rating/toprated', getTopRatedMovies)
router.get('/actors', getActors)

router.delete('/movies/:movieId', deleteMovie)
router.post('/movies/:movieId/rating', addPublicRating)

export default router;