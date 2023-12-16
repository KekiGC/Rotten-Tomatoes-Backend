"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const serie_controller_1 = require("../controllers/serie.controller");
const review_controller_1 = require("../controllers/review.controller");
// Routes
// Gets
router.get('/series/:serieId', serie_controller_1.getSerie);
router.get('/series/:serieId/comments', serie_controller_1.getSerieComments);
router.get('/series/:serieId/similar', serie_controller_1.getSimilarSeries);
router.get('/series/:serieId/reviews', review_controller_1.getSerieReviews);
// Posts
router.post('/series/discovery', serie_controller_1.serieFilter);
router.post('/series/:serieId/comments', serie_controller_1.addSerieComment);
router.post('/series/:serieId/rating', serie_controller_1.addSerieRating);
router.post('/series/:serieId/reviews', review_controller_1.createSerieReview);
// Deletes
router.delete('/series/:serieId', serie_controller_1.deleteSerie);
exports.default = router;
