import { Router } from "express";
const router = Router();

import { getChatRooms, getChatRoom, addMessage } from "../controllers/chat.controller";

// Routes
router.get("/chatrooms", getChatRooms);
router.get("/chatrooms/:id", getChatRoom);
router.post("/messages", addMessage);


export default router;