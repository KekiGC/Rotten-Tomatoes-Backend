"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    chatRoomId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'ChatRoom' },
    sender: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
});
exports.default = (0, mongoose_1.model)('Message', messageSchema);
