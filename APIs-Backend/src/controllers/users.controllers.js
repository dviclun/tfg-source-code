import conexion from "../mysql_conector.js";
import bcrypt from 'bcryptjs';
import fetch from 'node-fetch';
import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';
import { promises as fsPromises } from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import { url } from "inspector";

// Obtener __dirname en un módulo ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
    cloud_name: 'dy58mia9o',
    api_key: '534857549217895',
    api_secret: process.env.CLOUDINARY_SECRET
});

const imageUpload = (req) => {
    return new Promise((resolve, reject) => {
        const upload_stream = cloudinary.uploader.upload_stream({ folder: 'images' }, (error, result) => {
            if (result) {
                resolve(result)
            } else {
                resolve(error)
            }
        })

        streamifier.createReadStream(req.file.buffer).pipe(upload_stream);
    })
}

//Get one user with POST method by username and password
export const getUserForLogin = async (req, res) => {
    try {
        const { email, passw } = req.body;

        const [result] = await conexion.query("SELECT user_id, username, passw, fullname, email, biography, points, rol, profile_image FROM tfg_users WHERE email = ?", [email]);
        console.log(result);
        //Comprobamos si la contraseña enviada y la recibida de la base de datos son iguales
        const equalPass = await bcrypt.compare(passw, result[0].passw);

        console.log(equalPass);

        //Si son iguales devolvemos el usuario como respuesta
        if (equalPass) {
            res.status(200).json([{
                user_id: result[0].user_id,
                username: result[0].username,
                fullname: result[0].fullname,
                email: result[0].email,
                biography: result[0].biography,
                points: result[0].points,
                rol: result[0].rol,
                profile_image: result[0].profile_image
            }]);
        } else { //En caso contrario devolvemos un array vacio
            res.status(200).json([]);
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        })
    }
};

//Get all the users
export const getUsers = async (req, res) => {
    try {
        const [result] = await conexion.query("SELECT user_id, username, fullname, email, biography, points, rol FROM tfg_users ORDER BY points DESC");
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        })
    }
};

//Get 10 users for ranking
export const getUsersForRanking = async (req, res) => {
    try {
        const [result] = await conexion.query("SELECT user_id, username, fullname, email, biography, points, rol FROM tfg_users ORDER BY points DESC LIMIT 10");
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        })
    }
};

//Get one user by ID
export const getUserByID = async (req, res) => {
    try {
        const { user_id } = req.body;

        const [result] = await conexion.query("SELECT user_id, username, fullname, email, biography, points, rol, profile_image FROM tfg_users WHERE user_id = ?", [user_id]);
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        })
    }

};

//Get one user by Username
export const getUserByUsername = async (req, res) => {
    try {
        const { username } = req.params;

        const [result] = await conexion.query("SELECT user_id, username, fullname, email, biography, points, rol, profile_image FROM tfg_users WHERE username = ?", [username]);
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        })
    }
};


//Get one user by Email
export const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;

        const [result] = await conexion.query("SELECT user_id, username, fullname, email, biography, points, rol FROM tfg_users WHERE email = ?", [email]);
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        })
    }
};

//Funcion para verificar el recaptcha

export const verifyCaptcha = async (req, res) => {
    try {
        const { token } = req.body;

        const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=6Le3qtspAAAAAEq8ALjmR445XPAyYgievlXEK6Vn&response=${token}`, {
            method: 'POST'
        });

        const data = await response.json();

        if (data.success) {
            // Verificación exitosa
            res.json({ success: true });
        } else {
            // Verificación fallida
            res.status(400).json({ success: false, error: data['error-codes'] });
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        })
    }
}

//Funcion para registrar un usuario en la aplicación
export const registerUser = async (req, res) => {
    try {
        const { username, fullname, email, passw } = req.body;

        const [result] = await conexion.query("INSERT INTO tfg_users VALUES(NULL, ?,?,?,?,'',0,'member', '')", [username, passw, fullname, email]);

        console.log(result);

        res.status(201).json({ id: result.insertId });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        })
    }
}

export const updateUserPoints = async (req, res) => {
    try {
        const { addPoints, user_id } = req.body;

        const [result] = await conexion.query("UPDATE tfg_users SET points = ? + (SELECT points FROM tfg_users WHERE user_id = ?) WHERE user_id = ? ", [addPoints, user_id, user_id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Points updated sucessfully' })
        } else {
            res.status(500).json({ message: 'User ID not found' })
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        })
    }
}

export const updateBiography = async (req, res) => {
    try {
        const { biography, user_id } = req.body;

        const [result] = await conexion.query("UPDATE tfg_users SET biography = ? WHERE user_id = ?", [biography, user_id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Biography updated sucessfully' })
        } else {
            res.status(500).json({ message: 'User ID not found' })
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor"
        })
    }
}


export const uploadUserImage = async (req, res) => {
    try {
        const { user_id } = req.body;
        if (req.file) {

            let { secure_url } = await imageUpload(req);



            //Guardar imagen en la base de datos
            const [result] = await conexion.query("UPDATE tfg_users SET profile_image = ? WHERE user_id = ?", [secure_url, user_id]);


            if (result.affectedRows > 0) {
                res.status(200).json({ message: 'Image updated sucessfully on database' })
            } else {
                res.status(500).json({ message: 'User ID not found' })
            }



        } else {
            res.status(400).json({ message: 'Image not in the backend' })
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor desde upload image"
        })
    }
}

export const getProfileImage = async (req, res) => {
    try {
        console.log(req.body);
        const { user_id } = req.body;

        const [result] = await conexion.query("SELECT profile_image FROM tfg_users WHERE user_id = ?", [user_id]);

        res.status(200).json(result);

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor desde getProfileImage"
        })
    }
}

export const updateUserRole = async (req, res) => {
    try {

        const { user_id } = req.body;

        const [result] = await conexion.query("UPDATE tfg_users SET rol = 'suscriber' WHERE user_id = ?", [user_id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'User role updated' })
        } else {
            res.status(500).json({ message: 'User ID not found' })
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Error en el servidor desde getProfileImage"
        })
    }
}

