import { Router } from "express";
const router = Router();

import { signIn, signUp, changePassword, deleteUser, getUsers, getUserById } from "../controllers/user.controller";

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/change-password', changePassword)
router.delete('/delete-user', deleteUser)
router.get('/users', getUsers)
router.get('/users/:id', getUserById)


export default router;