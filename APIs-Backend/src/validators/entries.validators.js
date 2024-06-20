import {body, validationResult} from 'express-validator';

export const validateAddEntry = [
    body("user_id").isNumeric().withMessage("User id must be a number"),
    body("entry_title").isString().escape().withMessage("Entry title must be a string"),
    body("entry_body").isString().escape().withMessage("Entry body must be a string"),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]

export const validateAddEntryResponse = [
    body("entry_id").isNumeric().withMessage("Entry id must be a number"),
    body("user_id").isNumeric().withMessage("User id must be a number"),
    body("entry_response_body").isString().escape().withMessage("Entry response body must be a string"),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]