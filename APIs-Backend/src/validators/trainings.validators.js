import {body, validationResult} from 'express-validator';

export const addVideoValidator = [
    body("video_title_es").isString().escape().withMessage("Video spanish title must be a string"),
    body("video_title_en").isString().escape().withMessage("Video english title must be a string"),
    body("video_url").isString().withMessage("Video url must be a string"),
    body("muscular_group").isNumeric().withMessage("Muscular group must be a number"),
    body("difficulty").isString().escape().withMessage("Difficulty must be a string"),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]

export const editVideoValidator = [
    body("video_id").isNumeric().withMessage("Video id must be a number"),
    body("video_title_es").isString().escape().withMessage("Video spanish title must be a string"),
    body("video_title_en").isString().escape().withMessage("Video english title must be a string"),
    body("video_url").isString().withMessage("Video url must be a string"),
    body("muscular_group").isNumeric().withMessage("Muscular group must be a number"),
    body("difficulty").isString().escape().withMessage("Difficulty must be a string"),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]

export const addDailyTrainingValidator = [
    body("user_id").isNumeric().withMessage("User id must be a number"),
    body("total_points").isNumeric().withMessage("Points must be a number"),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]