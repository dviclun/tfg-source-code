import conexion from "../mysql_conector.js";

export const sendRequest = async(req, res) => {
    try {
        const {user_id, request_title, request_body, routine_difficulty, routine_group} = req.body;

        const [result] = await conexion.query("INSERT INTO tfg_custom_training_requests VALUES(NULL, ?, ?, ?, ?, ?, 'pending')", [user_id, request_title, request_body, routine_difficulty, routine_group])

        
        if(result.affectedRows > 0){
            res.status(200).json({message: 'Request sent'})
        } else {
            res.status(500).json({message: 'Couldnt send request'})
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        }) 
    }
}

export const getRequestsByUserId = async(req, res) => {
    try {
        
        const {user_id} = req.body;

        const reqTable = 'tfg_custom_training_requests';
        const groupTable = 'tfg_muscular_groups';

        const [result] = await conexion.query(`SELECT tfg_users.username, ${reqTable}.request_id, ${reqTable}.request_title, ${reqTable}.request_body, ${reqTable}.routine_difficulty, ${reqTable}.request_status, ${groupTable}.group_name_es, ${groupTable}.group_name_en FROM ${reqTable} JOIN tfg_users ON ${reqTable}.user_id = tfg_users.user_id JOIN ${groupTable} ON ${reqTable}.routine_group = ${groupTable}.group_id WHERE ${reqTable}.user_id = ?`, [user_id]);

        res.status(200).json(result);

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        }) 
    }
}

export const getRequestResponse = async(req, res) => {
    try {
        
        const {request_id} = req.body;

        const [result] = await conexion.query("SELECT * FROM tfg_custom_training_responses WHERE request_id = ?", [request_id]);

        res.status(200).json(result);
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        }) 
    }
}

export const getAllPendingRequests = async(req, res) => {
    try {
        const reqTable = 'tfg_custom_training_requests';
        const groupTable = 'tfg_muscular_groups';

        const [result] = await conexion.query(`SELECT tfg_users.username, ${reqTable}.request_id, ${reqTable}.request_title, ${reqTable}.request_body, ${reqTable}.routine_difficulty, ${reqTable}.request_status, ${groupTable}.group_name_es, ${groupTable}.group_name_en FROM ${reqTable} JOIN tfg_users ON ${reqTable}.user_id = tfg_users.user_id JOIN ${groupTable} ON ${reqTable}.routine_group = ${groupTable}.group_id WHERE ${reqTable}.request_status = 'pending'`);

        res.status(200).json(result);

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        })
    }
}

export const createTrainingResponse = async(req, res) => {
    try {
        const {request_id, user_id, training_response_body} = req.body;

        const [result] = await conexion.query("INSERT INTO tfg_custom_training_responses VALUES(NULL,?,?,?)", [request_id, user_id, training_response_body]);

        if(result.affectedRows > 0){
            res.status(200).json({message: 'Request response sent'})
        } else {
            res.status(500).json({message: 'Couldnt send request response'})
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        })
    }
}

export const editRequestStatus = async(req, res) => {
    try {
        const {request_id} = req.body;

        const [result] = await conexion.query("UPDATE tfg_custom_training_requests SET request_status = 'answered' WHERE request_id = ?", [request_id]);

        if(result.affectedRows > 0){
            res.status(200).json({message: 'Request status updated'})
        } else {
            res.status(500).json({message: 'Request ID not found'})
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        })
    }
}