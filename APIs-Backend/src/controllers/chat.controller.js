import conexion from "../mysql_conector.js";

export const addMessage = async(req, res) => {
    try {

        const {from, to, message} = req.body;

        const [result] = await conexion.query("INSERT INTO tfg_chat_messages VALUES(NULL, ?, ?, ?, NOW())", [from, to, message]);

        if(result.affectedRows > 0){
            res.status(200).json({message: 'Message sent'})
        } else {
            res.status(500).json({message: 'Couldnt send message'})
        }
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        })
    }
}

export const getMessages = async(req, res) => {
    try {
        const {from, to} = req.body;

        const [result] = await conexion.query("SELECT * FROM tfg_chat_messages WHERE (user_from = ? AND user_to = ?) OR (user_from = ? AND user_to = ?) ORDER BY time_sent", [from, to, to, from]);

        res.status(200).json(result);

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        })
    }
}