"use strict"
import { Router } from 'express';
import { acceptFriend, createFriendRequest, deleteFriend, getAllFriends, getFriendRequests, getNonFriendsByUsername, rejectFriend } from '../controllers/friends.controller.js';
import { friendsValidator } from '../validators/friends.validators.js';

const friendsRouter = Router();

friendsRouter.post("/allFriends", getAllFriends);
friendsRouter.post("/getNonFriendsByUsername", getNonFriendsByUsername);
friendsRouter.post("/getFriendRequests", getFriendRequests);
friendsRouter.post("/createFriendRequest",friendsValidator, createFriendRequest);
friendsRouter.delete("/deleteFriend", deleteFriend);
friendsRouter.post("/acceptFriend",friendsValidator, acceptFriend);
friendsRouter.delete("/rejectFriend", rejectFriend);

export default friendsRouter;
