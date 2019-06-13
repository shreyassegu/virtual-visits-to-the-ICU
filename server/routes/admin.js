var express = require('express')

var router = express.Router()

var Admin = require('../controllers/Admin')
var Room = require('../controllers/Room')
var Bed = require('../controllers/Bed')
var Patient = require('../controllers/Patient')
var Relative = require('../controllers/Relative')
var Document = require('../controllers/Document')

var admin = new Admin()
var room = new Room()
var bed = new Bed()
var patient = new Patient()
var relative = new Relative()
var document = new Document()

router.use((req, resp, next) => {
    console.log("Time : " + Date.now())
    next()
})

router.post('/admin-login', (req, resp) => {
    var email = req.body.email
    var password = req.body.password

    admin.login(email, password, (message) => {
        resp.send(JSON.stringify(message))
    })
})

router.post('/add-room', (req, resp) => {
    var roomName  = req.body.roomName
    room.addRoom(roomName, (result) => {
        resp.send(JSON.stringify(result))
    })
})

router.get('/get-rooms', (req, resp) => {
    room.getRooms((result) => {
        resp.send(JSON.stringify(result))
    })
})

router.post('/add-bed', (req, resp) => {
    var room_id = req.body.roomID
    var hasPatient = req.body.hasPatient
    var roomName = req.body.roomName

    bed.addBed(room_id, hasPatient, roomName, (result) => {
        resp.send(JSON.stringify(result))
    })
})

router.post('/get-beds', (req, resp) => {
    var room_id = req.body.roomID

    bed.getBedsFromRoom(room_id, (result) => {
        resp.send(JSON.stringify(result))
    })
})

router.get('/get-free-beds', (req, resp) => {
    bed.getFreeBeds((result) => resp.send(JSON.stringify(result)))
})

router.post('/add-patient', (req, resp) => {
   patient.addPatient(req.body, (result) => resp.send(JSON.stringify(result))) 
}) 

router.get('/get-patients', (req, resp) => {
    patient.getPatients((result) => resp.send(JSON.stringify(result)))
})

router.post('/delete-patient', (req, resp) => {
    patient.deletePatient(req.body.patientID, req.body.bedID, (result) => {
        resp.send(JSON.stringify(result))
    })
})

router.post('/add-relative', (req, resp) => {
    console.log(req.body)
    relative.addRelative(req.body, (result) => {
        resp.send(JSON.stringify(result))
    })
})

router.post('/get-relatives', (req, resp) => {
    relative.getRelatives(req.body.patientID, (result) => {
        resp.send(JSON.stringify(result))
    })
})

router.post('/delete-relative', (req, resp) => {
    relative.deleteRelative(req.body.relativeID, (result) => {
        resp.send(JSON.stringify(result))
    })
})

router.post('/add-document', (req, resp) => {
    document.add(req.body, (result) => resp.send(JSON.stringify(result)))
})

router.get('/get-bill-sum', (req, resp) => {
    patient.computeBillingSum((result) => {
        resp.send(JSON.stringify(result))
    })
})

//related to streaming :

router.post('/enable-streaming', (req, resp) => {
    bed.enableStreaming(req.body.bedID, req.body.cameraRoute, (result) => {
        resp.send(JSON.stringify(result))
    })
})

router.post('/disable-streaming', (req, resp) => {
    bed.disableStreaming(req.body.bedID, (result) => {
        resp.send(JSON.stringify(result))
    })
})

module.exports = router