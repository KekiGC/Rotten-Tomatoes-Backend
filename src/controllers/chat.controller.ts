import { Request, Response } from 'express';
import Message, { IMessage } from '../models/messages';
import ChatRoom, { IChatRoom } from '../models/chatRoom';

export const getChatRooms = async (req: Request, res: Response) => {
    try {
        const chatRooms = await ChatRoom.find();
        return res.status(200).json(chatRooms);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export const getChatRoom = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const chatRoom = await ChatRoom.findById(id);
        if (!chatRoom) {
            return res.status(404).json({ msg: 'Chat room not found' });
        }
        return res.status(200).json(chatRoom);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

// create a message
export const addMessage = async (req: Request, res: Response) => {
    try {
        const { chatRoomId, sender, text } = req.body;

        const chatRoom: IChatRoom | null = await ChatRoom.findById(chatRoomId);
        if (!chatRoom) {
            return res.status(404).json({ msg: 'Chat room not found' });
        }

        const message = new Message({
            chatRoomId,
            sender,
            text,
        });
        await message.save();

        chatRoom.messages.push(message._id);
        await chatRoom.save();

        return res.status(200).json(message);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

// get messages from a chat room
export const getMessagesFromChatRoom = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const chatRoom: IChatRoom | null = await ChatRoom.findById(id).populate(
            'messages'
        );
        if (!chatRoom) {
            return res.status(404).json({ msg: 'Chat room not found' });
        }

        return res.status(200).json(chatRoom.messages);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

// create a chat room
export const createChatRoom = async (req: Request, res: Response) => {
    try {
        const { name, isPrivate, participants } = req.body;

        const chatRoomExists = await ChatRoom.findOne({ name });
        if (chatRoomExists) {
            return res.status(400).json({ msg: 'Chat room already exists' });
        }

        const chatRoom = new ChatRoom({
            name,
            isPrivate,
            participants,
        });
        await chatRoom.save();

        return res.status(200).json(chatRoom);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};