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

//mongo

mongoose.connect(mongoDB || 'mongodb://localhost/chatdb', { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log('mongodb connected');
}).catch((err) => { 
    console.log("erro: " + err); 
});

//socket.io

const users = [];
const msgs = [];

io.on('connection', (socket) => {

    socket.on("userConnected", (nick) =>{
        users[socket.id] = nick;
        io.emit('displayUsers', { usersVar: users[socket.id] })
    })

    socket.on('chat message', (msg) => {
        //const messagedb = new Msg({msg});
        //messagedb.save().then(()=>{
        msgs[msg.nick] = msg;
        io.emit('chat message', { msgsVar: msgs[msg.nick] })
        //}).catch(err =>{
        //    console.log("o erro foi: " + err)
        //});
        console.log(msgs)
    });


    socket.on('disconnect', function(){
        io.emit('disconnection', { usersVar: users[socket.id] })
        delete users[socket.id]
    });

    setInterval(() => {
        console.log(users)
    }, 1000);
});
// io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' })

//universal

app.use(favicon(path.join(__dirname, 'favicon.ico')));

server.listen(process.env.PORT || port, () =>{
    console.log("Express server listening");
});