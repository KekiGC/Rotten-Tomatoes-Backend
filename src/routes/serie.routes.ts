import { Router } from "express";
const router = Router();

import { serieFilter, getSerie, deleteSerie, 
    addSerieComment, getSerieComments, addSerieRating } from "../controllers/serie.controller";

// Routes

// Gets
router.get('/series/:serieId', getSerie)
router.get('/series/:serieId/comments', getSerieComments)

// Posts
router.post('/series/discovery', serieFilter)
router.post('/series/:serieId/comments', addSerieComment)
router.post('/series/:serieId/rating', addSerieRating)

// Deletes
router.delete('/series/:serieId', deleteSerie)

export default router;