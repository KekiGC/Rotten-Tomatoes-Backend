"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chatRoomSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    isPrivate: { type: Boolean, required: true, default: false },
    participants: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    messages: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Message" }],
});
exports.default = (0, mongoose_1.model)("ChatRoom", chatRoomSchema);
