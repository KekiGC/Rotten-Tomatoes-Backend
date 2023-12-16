import { Router } from "express";
const router = Router();

import { serieFilter, getSerie, deleteSerie, 
addSerieComment, getSerieComments, addSerieRating, getSimilarSeries } from "../controllers/serie.controller";

import { createSerieReview, getSerieReviews } from "../controllers/review.controller";

// Routes

// Gets
router.get('/series/:serieId', getSerie)
router.get('/series/:serieId/comments', getSerieComments)
router.get('/series/:serieId/similar', getSimilarSeries)
router.get('/series/:serieId/reviews', getSerieReviews)

// Posts
router.post('/series/discovery', serieFilter)
router.post('/series/:serieId/comments', addSerieComment)
router.post('/series/:serieId/rating', addSerieRating)
router.post('/series/:serieId/reviews', createSerieReview);

// Deletes
router.delete('/series/:serieId', deleteSerie)

export default router;