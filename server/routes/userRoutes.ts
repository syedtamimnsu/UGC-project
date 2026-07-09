import express from 'express';
import { getAllProjects, getProjectById, getUserCredits, toggleProjectPublic } from '../controllers/userController';
import { protect } from '../middlewares/auth';



const userRouter = express.Router();

userRouter.get('/credits', protect, getUserCredits);
userRouter.get('/projects', protect, getAllProjects);
userRouter.get('/projects/:projectid', protect, getProjectById);
userRouter.patch('/publish/:projectid', protect, toggleProjectPublic);


export default userRouter;