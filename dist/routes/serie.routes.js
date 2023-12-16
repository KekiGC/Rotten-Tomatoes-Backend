"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const serie_controller_1 = require("../controllers/serie.controller");
const movie_controller_1 = require("../controllers/movie.controller");
// Routes
// Gets
router.get('/series/:serieId', serie_controller_1.getSerie);
router.get('/series/:serieId/comments', movie_controller_1.getComments);
// Posts
router.post('/series/discovery', serie_controller_1.serieFilter);
router.post('/series/:serieId/rating', movie_controller_1.addRating);
router.post('/series/:serieId/comments', movie_controller_1.addComment);
// Deletes
router.delete('/series/:serieId', serie_controller_1.deleteSerie);
exports.default = router;
