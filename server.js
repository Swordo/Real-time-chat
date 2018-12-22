const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const port = process.env.PORT || 3000
var users = [];
var connections = [];
server.listen(port);
console.log('Server is running...');
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})
io.sockets.on('connect', (socket) => {
    connections.push(socket);
    console.log(`%s socket connected`, connections.length);

    socket.on('disconnect', function (data) {
        connections.splice(connections.indexOf(socket), 1)
        console.log('%s socket disconnected', connections.length);
    })

    socket.on('send message', (data) => {
        //console.log(data);
        io.sockets.emit('new message', {
            msg: data
        })
    })
})