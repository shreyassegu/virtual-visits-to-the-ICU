const ioServer = require('socket.io');
const RTCMultiConnectionServer = require('rtcmulticonnection-server');

var Room = require('./createRoom')

var bp = require('body-parser')

var cors = require('cors')

var config = require('./config.json')

const port = process.env.PORT || config.port;

var room  = new Room()


const express = require('express');
const app = express();

app.use(bp.json())
app.use(cors())
const path = require('path');
const server = require('http');

var rooms = {}

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


app.post('/conference/register', (req, resp) => {
    var roomID = req.body.roomID
    var relativeIDs = req.body.relativeIDs
    var doctorID = req.body.doctorID
    var patientID = req.body.patientID
    var owner = req.body.owner

    room.adRoom(doctorID, roomID, relativeIDs, patientID, owner)

    resp.send(JSON.stringify({created : true}))
    
})

app.post('/conference/join', (req, resp) => {
    console.log("DDDD " ,req.body.roomID)
    var roomID = req.body.roomID
    var relativeID = req.body.relativeID
    
    if(room.checkAccess(relativeID, roomID)) {
        resp.send(JSON.stringify({ access : true }))
    } else resp.send(JSON.stringify({access : false}))

})


var httpServer = server.createServer(app);

httpServer.listen(port, process.env.IP || config.host , function() {
    console.log('Server is running on port ' + port);
});


ioServer(httpServer).on('connection', function(socket) {
    RTCMultiConnectionServer.addSocket(socket);

    const params = socket.handshake.query;

    if (!params.socketCustomEvent) {
        params.socketCustomEvent = 'custom-message';
    }

    socket.on(params.socketCustomEvent, function(message) {
        socket.broadcast.emit(params.socketCustomEvent, message);
    });
});