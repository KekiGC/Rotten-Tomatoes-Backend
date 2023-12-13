import { Router } from "express";
const router = Router();

import { serieFilter, getSerie } from "../controllers/serie.controller";

router.post('/series/discovery', serieFilter)
router.get('/series/:serieId', getSerie)

export default router;