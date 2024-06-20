"use strict"
import { Router } from 'express';
import { createTrainingResponse, editRequestStatus, getAllPendingRequests, getRequestResponse, getRequestsByUserId, sendRequest } from '../controllers/requests.controller.js';
import { createTrainingResponseValidator, sendRequestValidator } from '../validators/requests.validators.js';

const requestsRouter = Router();

requestsRouter.post("/sendRequest", sendRequestValidator, sendRequest);
requestsRouter.post("/getRequestsByUserId", getRequestsByUserId);
requestsRouter.post("/getRequestResponse", getRequestResponse);
requestsRouter.get("/getAllPendingRequests", getAllPendingRequests);
requestsRouter.post("/createTrainingResponse",createTrainingResponseValidator, createTrainingResponse);
requestsRouter.put("/updateRequestStatus", editRequestStatus);

export default requestsRouter;