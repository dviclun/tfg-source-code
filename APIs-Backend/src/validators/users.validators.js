import {body, validationResult} from 'express-validator';

export const registerUserValidator = [
    body("username").isString().escape().withMessage("Username must be a string"),
    body("fullname").isString().escape().withMessage("Fullname must be a string"),
    body("email").isString().escape().withMessage("Email must be a string"), 
    body("passw").isString().escape().withMessage("Password must be a string"),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]

export const updateUserPointsValidator = [
    body("addPoints").isNumeric().withMessage("Points must be a number"),
    body("user_id").isNumeric().withMessage("User id must be a number"),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]

export const updateBiographyValidator = [
    body("biography").isString().escape().withMessage("Biography must be a string"),
    body("user_id").isNumeric().withMessage("User id must be a number"),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]