"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const serie_controller_1 = require("../controllers/serie.controller");
// Routes
// Gets
router.get('/series/:serieId', serie_controller_1.getSerie);
router.get('/series/:serieId/comments', serie_controller_1.getSerieComments);
// Posts
router.post('/series/discovery', serie_controller_1.serieFilter);
router.post('/series/:serieId/comments', serie_controller_1.addSerieComment);
router.post('/series/:serieId/rating', serie_controller_1.addSerieRating);
// Deletes
router.delete('/series/:serieId', serie_controller_1.deleteSerie);
exports.default = router;
