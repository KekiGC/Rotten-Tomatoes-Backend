import { Router } from 'express';
const router = Router();

import { getMovies, getMovie, deleteMovie, addRating,
getMoviesByGenre, getTopRatedMovies, getMoviesByDuration,
addComment, getComments, getMovieByTitle, getMovieReviews, searchFilter } from '../controllers/movie.controller';

// Routes

// Gets
router.get('/movies', getMovies)
router.get('/movies/:movieId', getMovie)

//router.get('/movies/discover/:genre', getMoviesByGenre)
router.get('/movies/duration/:duration', getMoviesByDuration)
router.get('/movies/rating/toprated', getTopRatedMovies)
router.get('/movies/search/:title', getMovieByTitle)

router.get('/movies/:movieId/reviews', getMovieReviews)
router.get('/movies/:movieId/comments', getComments)

router.post('/movies/discovery', searchFilter)

// Posts
router.post('/movies/:movieId/comment', addComment)
router.post('/movies/:movieId/rating', addRating)

// Deletes
router.delete('/movies/:movieId', deleteMovie)

export default router;