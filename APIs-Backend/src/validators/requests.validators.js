import {body, validationResult} from 'express-validator';

export const sendRequestValidator = [
    body("user_id").isNumeric().withMessage("User id must be a number"),
    body("request_title").isString().escape().withMessage("Request title must be a string"),
    body("request_body").isString().escape().withMessage("Request body must be a string"),
    body("routine_difficulty").isString().escape().withMessage("Routine difficulty must be a string"),
    body("routine_group").isNumeric().withMessage("Routine group must be a number"),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]

export const createTrainingResponseValidator = [
    body("request_id").isNumeric().withMessage("Request id must be a number"),
    body("user_id").isNumeric().withMessage("User id must be a number"),
    body("training_response_body").isString().escape().withMessage("Training response body must be a string"),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]