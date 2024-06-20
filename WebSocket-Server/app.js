"use strict"
import express from 'express';
import { Server } from 'socket.io';

import { createServer } from 'http';

const app = express(); //creado el objeto con la instacia de express
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        credentials: true
    }
});

//servidor a la escucha por el puerto 3000
server.listen(8001, () => {
    console.log('escuchando solicitud');
})

//WebSockets
const onlineUsers = new Map();

io.on('connection', (socket) => {

    socket.on("add-user", (user_id) => {
        onlineUsers.set(user_id, socket.id)
    })

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.user_to);

        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-receive", data)
        }
    })
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

