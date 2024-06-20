import conexion from "../mysql_conector.js";

export const getMuscularGroups = async (req, res) => {
    try {
        const [result] = await conexion.query("SELECT * FROM tfg_muscular_groups ORDER BY priority");
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        })
    }
}



export const getArmsVideos = async (req, res) => {
    try {
        const [result] = await conexion.query("SELECT * FROM tfg_training_videos WHERE muscular_group IN (3, 6, 7, 8)");
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        })
    }
}

export const getLegsVideos = async (req, res) => {
    try {
        const [result] = await conexion.query("SELECT * FROM tfg_training_videos WHERE muscular_group IN (4, 9, 10, 11, 12)");
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        })
    }
}


export const getVideosByGroup = async (req, res) => {
    try {

        const { muscular_group } = req.params
        const [result] = await conexion.query("SELECT * FROM tfg_training_videos WHERE muscular_group = ?", [muscular_group]);

        res.status(200).json(result); //la  respuesta que devuelve el servidor

    } catch (error) {
        res.status(500).json({
            message: "Error en el servidor"
        })
    }

};

export const getMuscularGroupById= async (req, res) => {
    try {

        const { group_id } = req.params
        const [result] = await conexion.query("SELECT * FROM tfg_muscular_groups WHERE group_id = ?", [group_id]);

        res.status(200).json(result); //la  respuesta que devuelve el servidor

    } catch (error) {
        res.status(500).json({
            message: "Error en el servidor"
        })
    }

};

export const addVideo = async (req, res) => {
    try {
        const {video_title_es, video_title_en, video_url, muscular_group, difficulty} = req.body;

        const [result] = await conexion.query("INSERT INTO tfg_training_videos VALUES(NULL, ?,?,?,?,?)", [video_title_es, video_title_en, video_url, muscular_group, difficulty]);

        console.log(result);

        res.status(201).json({ id: result.insertId });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        })
    }
}

export const deleteVideo = async (req, res) => {
    try {
        const {video_id} = req.body;

        const [result] = await conexion.query("DELETE FROM tfg_training_videos WHERE video_id = ?", [video_id]);

        if(result.affectedRows > 0){
            res.status(200).json({message: 'Deleted sucessfully'})
        } else {
            res.status(500).json({message: 'Video ID not found'})
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        })
    }

}

export const editVideo = async (req, res) => {
    try {
        const {video_id, video_title_es, video_title_en, video_url, muscular_group, difficulty} = req.body;

        const [result] = await conexion.query("UPDATE tfg_training_videos SET video_title_es = ?, video_title_en = ?, video_url = ?, muscular_group = ?, difficulty = ? WHERE video_id = ?", [video_title_es, video_title_en, video_url, muscular_group, difficulty, video_id])
        
        if(result.affectedRows > 0){
            res.status(200).json({message: 'Deleted sucessfully'})
        } else {
            res.status(500).json({message: 'Video ID not found'})
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        })
    }
}


export const getTrainings = async (req, res) => {
    try {
        const [result] = await conexion.query("SELECT * FROM tfg_trainings");
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        })
    }
}



export const getTodayUserTraining = async (req, res) => {
    try {

        const { user_id } = req.params
        const [result] = await conexion.query("SELECT * FROM tfg_training_records WHERE user_id = ? AND training_date = CURDATE()", [user_id]);

        res.status(200).json(result); //la  respuesta que devuelve el servidor

    } catch (error) {
        res.status(500).json({
            message: "Error en el servidor"
        })
    }

}


export const addDailyTraining = async (req, res) => {
    try {
        const {user_id, total_points} = req.body;

        const [result] = await conexion.query("INSERT INTO tfg_training_records VALUES(NULL, ?,?,CURDATE())", [user_id, total_points]);

        console.log(result);

        res.status(201).json({ id: result.insertId });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        })
    }
}

export const getNumberOfTrainings = async (req, res) => {
    try {

        const { user_id } = req.params
        const [result] = await conexion.query("SELECT COUNT(user_id) AS number_of_trainings FROM tfg_training_records WHERE user_id = ?", [user_id]);

        res.status(200).json(result); //la  respuesta que devuelve el servidor

    } catch (error) {
        res.status(500).json({
            message: "Error en el servidor"
        })
    }

}