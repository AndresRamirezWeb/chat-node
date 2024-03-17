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
//         origin: "http://192.168.1.8:3001"
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

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello world',
    });
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
