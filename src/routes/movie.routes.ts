import { Router } from 'express';
const router = Router();

import { getMovies, getMovie, deleteMovie, addRating,
getMoviesByGenre, getTopRatedMovies, getMoviesByDuration,
addComment, getComments, getMovieByTitle, 
movieFilter, getMovieTrailer, addReply } from '../controllers/movie.controller';

import { createReview, getMovieReviews } from '../controllers/review.controller';

// Routes

// Gets
router.get('/movies', getMovies)
router.get('/movies/:movieId', getMovie)

router.get('/movies/discover/:genre', getMoviesByGenre)
router.get('/movies/duration/:duration', getMoviesByDuration)
router.get('/movies/rating/toprated', getTopRatedMovies)
router.get('/movies/search/:title', getMovieByTitle)

router.get('/movies/:movieId/trailer', getMovieTrailer)

router.get('/movies/:movieId/reviews', getMovieReviews)
router.get('/movies/:movieId/comments', getComments)


// Posts
router.post('/movies/discovery', movieFilter)
router.post('/movies/:movieId/comments', addComment)
router.post('/movies/:movieId/rating', addRating)
router.post('/comments/:commentId/replies', addReply);
router.post('/movies/:movieId/reviews', createReview);

// Deletes
router.delete('/movies/:movieId', deleteMovie)

export default router;