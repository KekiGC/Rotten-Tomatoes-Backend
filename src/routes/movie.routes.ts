import { Router } from 'express';
const router = Router();

import { getMovies, getMovie, deleteMovie, addPublicRating } from '../controllers/movie.controller';

router.get('/movies', getMovies)
router.get('/movies/:movieId', getMovie)
router.delete('/movies/:movieId', deleteMovie)
router.post('/movies/:movieId/rating', addPublicRating)

export default router;