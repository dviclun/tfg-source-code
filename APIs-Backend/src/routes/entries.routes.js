"use strict"
import { Router } from 'express';
import { addEntry, addEntryResponse, deleteEntry, deleteResponse, getEntries, getEntryResponses, getNumberOfEntries, getNumberOfResponses } from '../controllers/entries.controller.js';
import { validateAddEntry, validateAddEntryResponse } from '../validators/entries.validators.js';

const entriesRouter = Router();

entriesRouter.get("/entries", getEntries);
entriesRouter.get("/entryResponses/:entry_id", getEntryResponses);
entriesRouter.post("/addEntry", validateAddEntry,addEntry);
entriesRouter.post("/addEntryResponse", validateAddEntryResponse, addEntryResponse);
entriesRouter.delete("/deleteEntry", deleteEntry);
entriesRouter.delete("/deleteResponse", deleteResponse);
entriesRouter.get("/numberOfEntries/:user_id", getNumberOfEntries);
entriesRouter.get("/numberOfResponses/:user_id", getNumberOfResponses);



export default entriesRouter;