import express from 'express';
import { register, login, logout, getUser, deleteUser } from '../controller/UserController.js';
// import protectedRoute from '../utils/verifyAdmin.js';
import verifyUser from '../utils/userVerify.js';
import verifyAdmin from '../utils/verifyAdmin.js';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', logout);
userRouter.get('/get-user', verifyUser ,getUser);
userRouter.delete('/delete-user/:id', verifyUser, verifyAdmin, deleteUser);


export default userRouter;
