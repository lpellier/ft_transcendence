import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	await app.listen(3001);
}

bootstrap();
// Chat

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const PORT = 8080;
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
    }
});

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});



io.on('connection', (socket) => { /* socket object may be used to send specific messages to the new connected client */

    socket.emit('connection', null);
    socket.on('disconnect', () => {
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg + ' user: ' + socket.username);
        io.emit('chat message', msg, socket.username);
    });
    socket.on('set username', (username) => {
        socket.username = username;
        io.emit('new user', username);
    })
});
