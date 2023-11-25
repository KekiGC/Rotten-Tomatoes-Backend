import { Router } from "express";
const router = Router();

import { signIn, signUp, changePassword, deleteUser, editUser } from "../controllers/user.controller";

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/change-password', changePassword)
router.delete('/delete-user', deleteUser)
router.put('/edit-user', editUser)

export default router;