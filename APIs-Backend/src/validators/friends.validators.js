import {body, validationResult} from 'express-validator';

export const friendsValidator = [
    body("applicant_id").isNumeric().withMessage("Applicant id must be a number"),
    body("requested_id").isNumeric().withMessage("Requested id must be a number"),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]
