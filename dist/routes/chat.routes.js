"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const chat_controller_1 = require("../controllers/chat.controller");
// Routes
router.get("/chatrooms", chat_controller_1.getChatRooms);
router.get("/chatrooms/:id", chat_controller_1.getChatRoom);
router.post("/messages", chat_controller_1.addMessage);
exports.default = router;
