"use strict"
import { Router } from 'express'
import { addDailyTraining, addVideo, deleteVideo, getArmsVideos, getLegsVideos, getMuscularGroupById, getMuscularGroups, getTodayUserTraining, getTrainings, getVideosByGroup, editVideo, getNumberOfTrainings } from '../controllers/trainings.controllers.js';
import { addDailyTrainingValidator, addVideoValidator, editVideoValidator } from '../validators/trainings.validators.js';

const trainingsRouter = Router();

trainingsRouter.get("/muscularGroups", getMuscularGroups);
trainingsRouter.get("/armsVideos", getArmsVideos);
trainingsRouter.get("/legsVideos", getLegsVideos);
trainingsRouter.get("/videos/:muscular_group", getVideosByGroup);
trainingsRouter.get("/muscularGroup/:group_id", getMuscularGroupById);
trainingsRouter.post("/videos", addVideoValidator, addVideo);
trainingsRouter.delete("/videos", deleteVideo);
trainingsRouter.get("/trainings", getTrainings);
trainingsRouter.get("/todaysTraining/:user_id", getTodayUserTraining);
trainingsRouter.post("/registerTraining",addDailyTrainingValidator, addDailyTraining);
trainingsRouter.post("/editVideo",editVideoValidator, editVideo)
trainingsRouter.get("/numberOfTrainings/:user_id", getNumberOfTrainings);

export default trainingsRouter; //exportamos