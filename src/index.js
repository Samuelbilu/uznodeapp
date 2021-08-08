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

require('./controllers/authController')(app)

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



const users = {};

io.on('connection', (socket) => {

    Msg.find().then(result => {
        socket.emit('output-messages', result)
    })

    /*User.find().then(result => {
        socket.emit('output-users', result)
    })*/

    socket.on('userConnected', (data) => {
        /*const userdb = new User({
            username: data.username
        });
        userdb.save().then(()=>{
            io.emit('displayUsers', data)
        }).catch(err =>{
            console.log("o erro foi: " + err)
        });*/

        users[socket.id] = data.username

        io.emit('displayUsers', { users: users, userWhoConnected: data.username })

        

    });


    
    socket.on('chat message', (data) => {
        const messagedb = new Msg({
            username: data.username,
            msgstring: data.msgstring
        });
        messagedb.save().then(()=>{
            io.emit('chat message', data)
        }).catch(err =>{
            console.log("o erro foi: " + err)
        });
        console.log(data)
    });


    socket.on('disconnect', function() {
        try{
            delete users[socket.id]
            io.emit('disconnection', { users: users})
        }
        catch(err){
            console.log(err)
        }
        console.log(users)
    });
});
// io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' })

//universal




app.use(favicon(path.join(__dirname, 'favicon.ico')));

server.listen(process.env.PORT || port, () =>{
    console.log("Express server listening");
});