"use strict"

import express from 'express';
import usersRouter from './routes/users.routes.js';
import trainingsRouter from './routes/trainings.routes.js';
import cors from 'cors';
import path from 'path';
import { Stripe } from 'stripe';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';

import { STRIPE_KEY } from './config.js'
import entriesRouter from './routes/entries.routes.js';
import friendsRouter from './routes/friends.routes.js';
import chatRouter from './routes/chat.routes.js';
import { createServer } from 'http';
import requestsRouter from './routes/requests.routes.js';
//import './config.js'

// Obtener __dirname en un módulo ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express(); //creado el objeto con la instacia de express

const stripe = new Stripe(STRIPE_KEY);

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        credentials: true
    }
});

//habilitar CORS
app.use(cors());

//middleware
app.use(express.json());
app.use((req, res, next) => {
    res.header({"Access-Control-Allow-Origin": "*"});
    next();
})

//Servir archivos estaticos
app.use('/uploads', express.static(path.join(__dirname,'..', 'uploads')));

app.use(usersRouter);
app.use(trainingsRouter);
app.use(entriesRouter);
app.use(friendsRouter);
app.use(chatRouter);
app.use(requestsRouter);


//Stripe payment validation
app.post('/validatePayment', async(req, res) => {
    try {
        const {id, amount} = req.body;

    const payment = await stripe.paymentIntents.create({
        amount,
        currency: 'EUR',
        description: 'Suscription payment',
        payment_method: id,
        confirm: true,
        automatic_payment_methods: {
            enabled: true,
            allow_redirects: 'never',
          },
    });

    console.log(payment.status);

    if(payment.status === 'succeeded'){
        res.status(200).json({status: 'succeeded'})
    } else if (payment.status === 'canceled'){
        res.status(200).json({status: 'canceled'})
    }

    } catch (error) {
        console.log(error.message)
        res.status(200).json(error.raw.message)
    }
})


//middlewarre, controlar si se pasa una ruta en la url
app.use((req, res) => {
    res.status(404).json({
        message: "endpoint no encontrado"
    })
})

//servidor a la escucha por el puerto 3000
server.listen(process.env.PORT, () => {
    console.log('escuchando solicitud');
})