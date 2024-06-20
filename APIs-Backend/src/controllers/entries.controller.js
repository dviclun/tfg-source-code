import conexion from "../mysql_conector.js";

export const getEntries = async (req, res) => {
    try {
        const [result] = await conexion.query("SELECT * FROM tfg_entries ORDER BY entry_date DESC, entry_id DESC");
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        })
    }
};

export const getEntryResponses = async (req, res) => {
    try {
        const {entry_id} = req.params;
        const [result] = await conexion.query("SELECT tfg_entry_responses.entry_response_id, tfg_entry_responses.entry_id, tfg_entry_responses.user_id, tfg_entry_responses.entry_response_date, tfg_entry_responses.entry_response_body, tfg_users.username, tfg_users.profile_image FROM tfg_entry_responses JOIN tfg_users ON tfg_entry_responses.user_id = tfg_users.user_id WHERE tfg_entry_responses.entry_id = ?", [entry_id]);
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        })
    }
};

export const addEntry = async (req, res) => {
    try {

        const {user_id, entry_title, entry_body} = req.body;

        const [result] = await conexion.query("INSERT INTO tfg_entries VALUES(NULL, ?,?,?, CURDATE())", [user_id, entry_title, entry_body]);

        console.log(result);

        res.status(201).json({ id: result.insertId });

        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        })
    }
}

export const addEntryResponse = async (req, res) => {
    try {

        const {entry_id, user_id, entry_response_body} = req.body;

        const [result] = await conexion.query("INSERT INTO tfg_entry_responses VALUES(NULL, ?,?, CURDATE(),?)", [entry_id, user_id, entry_response_body]);

        console.log(result);

        res.status(201).json({ id: result.insertId });

        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        })
    }
}

export const deleteEntry = async (req, res) => {
    try {
        const {entry_id} = req.body;

        const [result] = await conexion.query("DELETE FROM tfg_entries WHERE entry_id = ?", [entry_id]);

        if(result.affectedRows > 0){
            res.status(200).json({message: 'Deleted sucessfully'})
        } else {
            res.status(500).json({message: 'Entry ID not found'})
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        })
    }

}


export const deleteResponse = async (req, res) => {
    try {
        const {entry_response_id} = req.body;

        const [result] = await conexion.query("DELETE FROM tfg_entry_responses WHERE entry_response_id = ?", [entry_response_id]);

        if(result.affectedRows > 0){
            res.status(200).json({message: 'Deleted sucessfully'})
        } else {
            res.status(500).json({message: 'Entry ID not found'})
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        })
    }

}

export const getNumberOfEntries = async (req, res) => {
    try {

        const { user_id } = req.params
        const [result] = await conexion.query("SELECT COUNT(user_id) AS number_of_entries FROM tfg_entries WHERE user_id = ?", [user_id]);

        res.status(200).json(result); //la  respuesta que devuelve el servidor

    } catch (error) {
        res.status(500).json({
            message: "Error en el servidor"
        })
    }

}


export const getNumberOfResponses = async (req, res) => {
    try {

        const { user_id } = req.params
        const [result] = await conexion.query("SELECT COUNT(user_id) AS number_of_responses FROM tfg_entry_responses WHERE user_id = ?", [user_id]);

        res.status(200).json(result); //la  respuesta que devuelve el servidor

    } catch (error) {
        res.status(500).json({
            message: "Error en el servidor"
        })
    }

}