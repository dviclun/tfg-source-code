// SELECT * FROM `tfg_users` WHERE user_id IN (SELECT CASE WHEN user_a_id = 1 THEN user_b_id ELSE user_a_id END FROM tfg_friends WHERE user_a_id = 1 OR user_b_id = 1)

import conexion from "../mysql_conector.js";

export const getAllFriends = async(req, res) => {
    try {
        
        const {user_id} = req.body;

        const [result] = await conexion.query("SELECT user_id, username, profile_image FROM `tfg_users` WHERE user_id IN (SELECT CASE WHEN user_a_id = ? THEN user_b_id ELSE user_a_id END FROM tfg_friends WHERE user_a_id = ? OR user_b_id = ?)",[user_id, user_id, user_id])

        res.status(200).json(result);

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        })
    }
}

export const getNonFriendsByUsername = async(req, res) => {
    try {

        const {username, user_id} = req.body;
        const formattedUsername = `%${username}%`;

        const [result] = await conexion.query("SELECT user_id, username, profile_image FROM tfg_users WHERE username LIKE ? AND user_id NOT IN (SELECT CASE WHEN user_a_id = ? THEN user_b_id ELSE user_a_id END FROM tfg_friends WHERE user_a_id = ? OR user_b_id = ?) AND user_id NOT IN (SELECT CASE WHEN applicant_id = ? THEN requested_id ELSE applicant_id END FROM tfg_friend_requests WHERE applicant_id = ? OR requested_id = ?) AND user_id NOT LIKE ?", [formattedUsername, user_id, user_id, user_id, user_id, user_id, user_id, user_id]);

        res.status(200).json(result);


    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        }) 
    }
}

export const getFriendRequests = async(req, res) => {
    try {
        
        const {requested_id} = req.body;

        const [result] = await conexion.query("SELECT tfg_users.user_id, tfg_users.username, tfg_users.profile_image, tfg_friend_requests.friend_request_status FROM tfg_friend_requests JOIN tfg_users ON tfg_friend_requests.applicant_id = tfg_users.user_id WHERE tfg_friend_requests.requested_id = ?", [requested_id] );

        res.status(200).json(result);

        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        }) 
    }
} 

export const createFriendRequest = async(req, res) => {
    try {

        const {applicant_id, requested_id} = req.body;

        const [result] =  await conexion.query("INSERT INTO tfg_friend_requests VALUES(?,?,'pending')",[applicant_id, requested_id]);

        if(result.affectedRows > 0){
            res.status(200).json({message: 'Friend request sent'})
        } else {
            res.status(500).json({message: 'Couldnt send friend request'})
        }
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        }) 
    }
}

export const deleteFriend = async(req, res) => {
    try {
        
        const {user_a, user_b} = req.body;

        const [result] = await conexion.query("DELETE FROM tfg_friends WHERE (user_a_id = ? AND user_b_id = ?) OR (user_a_id = ? AND user_b_id = ?)", [user_a, user_b, user_b, user_a]);

        if(result.affectedRows > 0){
            res.status(200).json({message: 'Deleted sucessfully'})
        } else {
            res.status(500).json({message: 'Friends not deleted'})
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        }) 
    }
}


export const acceptFriend = async(req, res) => {
    try {
        
        const {applicant_id, requested_id} = req.body;

        const [result] = await conexion.query("INSERT INTO tfg_friends VALUES(?,?)", [applicant_id, requested_id]);

        const [result2] = await conexion.query("DELETE FROM tfg_friend_requests WHERE applicant_id = ? AND requested_id = ?", [applicant_id, requested_id])

        if(result.affectedRows > 0 && result2.affectedRows > 0){
            res.status(200).json({message: 'Accepted sucessfully'})
        } else {
            res.status(500).json({message: 'Something went wrong'})
        }

    } catch(error){
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        }) 
    }
}

export const rejectFriend = async(req, res) => {
    try {
        const {applicant_id, requested_id} = req.body;

        const [result] = await conexion.query("DELETE FROM tfg_friend_requests WHERE applicant_id = ? AND requested_id = ?", [applicant_id, requested_id])

        if(result.affectedRows > 0){
            res.status(200).json({message: 'Rejected sucessfully'})
        } else {
            res.status(500).json({message: 'Error rejecting friendship'})
        }
        
    } catch(error){
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        }) 
    }
}

