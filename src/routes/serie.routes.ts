import { Router } from "express";
const router = Router();

import { serieFilter, getSerie, deleteSerie } from "../controllers/serie.controller";
import { addRating, addComment, getComments } from "../controllers/movie.controller";

// Routes

// Gets
router.get('/series/:serieId', getSerie)
router.get('/series/:serieId/comments', getComments)

// Posts
router.post('/series/discovery', serieFilter)
router.post('/series/:serieId/rating', addRating)
router.post('/series/:serieId/comments', addComment)

// Deletes
router.delete('/series/:serieId', deleteSerie)

export default router;