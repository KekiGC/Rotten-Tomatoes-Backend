"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chatRoomSchema = new mongoose_1.Schema({
    participants: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
});
exports.default = (0, mongoose_1.model)("ChatRoom", chatRoomSchema);
