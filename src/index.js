//requires
const favicon = require("serve-favicon");
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const { Msg } = require('./models/message');
const app = express();
const http = require('http');
const server = http.createServer(app)


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use(require("./routes/index"));
//socket.io

const { Server } = require("socket.io");
const io = new Server(server);

//variaveis

const port = 80;
const mongoDB = 'mongodb+srv://samuz0:uz0reinando@firstcluster.gpdqi.mongodb.net/chatdb?retryWrites=true&w=majority'
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log('mongodb connected');
}).catch((err) => { 
    console.log("erro: " + err); 
});


//io

const users = {};

io.on('connection', (socket) => {

    socket.on("userConnected", (userId) =>{
        io.emit('userConnected', { userId, users })
    })

    socket.on('chat message', (msg) => {
        const message = new Msg({msg});
        message.save().then(()=>{
            io.emit('chat message', msg);
        });
    });
    socket.on('disconnect', function(){
        console.log('user ' + users[socket.id] + ' disconnected');
        delete users[socket.id];

        io.emit('disconnection', users)

    });

    
});
// io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' })

//universal

module.exports = {
    users
}

app.use(favicon(path.join(__dirname, 'favicon.ico')));

server.listen(process.env.PORT || port, () =>{
    console.log("Express server listening");
});