const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketio(server)

const port = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname,'../public')
app.use(express.static(publicDirPath));

io.on('connection',(socket)=>{
    console.log('new websocket connection');

    socket.emit('message','Welcome');

    socket.on('sendMessage',(texts)=>{
        io.emit('message',texts);
    })

    // socket.emit('countUpdated',count);

    // socket.on('inc',()=>{
    //     count++;
    //     io.emit('countUpdated',count);
    // })
})

server.listen(port,()=>{
    console.log('server is running on',port);
})