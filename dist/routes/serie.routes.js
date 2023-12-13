"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const serie_controller_1 = require("../controllers/serie.controller");
router.post('/series/discovery', serie_controller_1.serieFilter);
router.get('/series/:serieId', serie_controller_1.getSerie);
exports.default = router;
