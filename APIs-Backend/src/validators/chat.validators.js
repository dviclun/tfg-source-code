import {body, validationResult} from 'express-validator';

export const validateMessage = [
    body("from").isNumeric().withMessage("Emitter user must be a number"),
    body("to").isNumeric().withMessage("Receptor user must be a number"),
    body("message").isString().escape().withMessage("Message must be a string"),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]