"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChatRoom = exports.getMessagesFromChatRoom = exports.addMessage = exports.getChatRoom = exports.getChatRooms = void 0;
const messages_1 = __importDefault(require("../models/messages"));
const chatRoom_1 = __importDefault(require("../models/chatRoom"));
const getChatRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chatRooms = yield chatRoom_1.default.find();
        return res.status(200).json(chatRooms);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.getChatRooms = getChatRooms;
const getChatRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const chatRoom = yield chatRoom_1.default.findById(id);
        if (!chatRoom) {
            return res.status(404).json({ msg: 'Chat room not found' });
        }
        return res.status(200).json(chatRoom);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.getChatRoom = getChatRoom;
// create a message
const addMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chatRoomId, sender, text } = req.body;
        const chatRoom = yield chatRoom_1.default.findById(chatRoomId);
        if (!chatRoom) {
            return res.status(404).json({ msg: 'Chat room not found' });
        }
        const message = new messages_1.default({
            chatRoomId,
            sender,
            text,
        });
        yield message.save();
        chatRoom.messages.push(message._id);
        yield chatRoom.save();
        return res.status(200).json(message);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.addMessage = addMessage;
// get messages from a chat room
const getMessagesFromChatRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const chatRoom = yield chatRoom_1.default.findById(id).populate('messages');
        if (!chatRoom) {
            return res.status(404).json({ msg: 'Chat room not found' });
        }
        return res.status(200).json(chatRoom.messages);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.getMessagesFromChatRoom = getMessagesFromChatRoom;
// create a chat room
const createChatRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, isPrivate, participants } = req.body;
        const chatRoomExists = yield chatRoom_1.default.findOne({ name });
        if (chatRoomExists) {
            return res.status(400).json({ msg: 'Chat room already exists' });
        }
        const chatRoom = new chatRoom_1.default({
            name,
            isPrivate,
            participants,
        });
        yield chatRoom.save();
        return res.status(200).json(chatRoom);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.createChatRoom = createChatRoom;
