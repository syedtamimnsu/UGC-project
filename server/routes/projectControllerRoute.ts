import express from "express";
import upload from "../configs/multer";
import { createProject, createVideo, deleteProject, getAllPublishedProjects } from "../controllers/projectController";
import { protect } from "../middlewares/auth";



const projectRouter = express.Router();


projectRouter.post('/create', upload.array('images', 2), protect, createProject);
projectRouter.post('/video', protect, createVideo);
projectRouter.get('/published', getAllPublishedProjects);
projectRouter.delete('/:projectId', protect, deleteProject);



export default projectRouter;