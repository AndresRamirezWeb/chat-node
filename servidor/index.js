// const fs = require('fs');
//Gets the messages.json file and parse the file into JavaScript object
// const rawData = fs.readFileSync('messages.json', 'utf8');
// const messagesData = JSON.parse(rawData);

//index.js
const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const PORT = 4000;

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

// const socketIO = require('socket.io')(http, {
//     cors: {
//         origin: "http://172.29.112.1:3000"
//     }
// });

app.use(cors());
let users = [];

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on('message', (data) => {
        const timestamp = new Date().toLocaleString();
        const message = {
            ...data,
            timestamp
        };
        socketIO.emit('messageResponse', message);
    });

    // Inicio Almacenar en archivo JSON o en base de datos
    // socket.on("message", data => {
    //     messagesData["messages"].push(data)
    //     const stringData = JSON.stringify(messagesData, null, 2)
    //     fs.writeFile("messages.json", stringData, (err) => {
    //         console.error(err)
    //     })
    //     socketIO.emit("messageResponse", data)
    // })
    // Fin Almacenar en archivo JSON o en base de datos

    socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

    //Listens when a new user joins the server
    socket.on('newUser', (data) => {
        //Adds the new user to the list of users
        users.push(data);
        // console.log(users);
        //Sends the list of users to the client
        socketIO.emit('newUserResponse', users);
    });

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
        //Updates the list of users when a user disconnects from the server
        users = users.filter((user) => user.socketID !== socket.id);
        //Sends the list of users to the client
        socketIO.emit('newUserResponse', users);
        socket.disconnect();
    });
});

// app.get('/api', (req, res) => {
//     res.json({
//         message: 'Hello world',
//     });
// });

//Returns the JSON file
// app.get('/api', (req, res) => {
//     res.json(messagesData);
// });

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
