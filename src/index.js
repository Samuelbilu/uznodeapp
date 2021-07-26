//requires
const favicon = require("serve-favicon");
const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app)

app.use(require("./routes/index"));
//socket.io

const { Server } = require("socket.io");
const io = new Server(server);

//variaveis

const port = 80;

//io

io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
});
// io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' })

//universal

app.use(favicon(path.join(__dirname, 'favicon.ico')));

server.listen(process.env.PORT || port, () =>{
    console.log("Express server listening");
});