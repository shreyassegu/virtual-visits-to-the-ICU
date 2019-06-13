var express = require('express')

var router_user = express.Router()

var Admin = require('../controllers/Admin')
var Room = require('../controllers/Room')
var Bed = require('../controllers/Bed')
var Patient = require('../controllers/Patient')
var Relative = require('../controllers/Relative')
var Document = require('../controllers/Document')
var Streaming = require('../controllers/Streaming')

var admin = new Admin()
var room = new Room()
var bed = new Bed()
var patient = new Patient()
var relative = new Relative()
var streaming = new Streaming()
var document = new Document()

router_user.use((req, resp, next) => {
    console.log("Time : " + Date.now() +":::user")
    next()
})

router_user.post('/login', (req, resp) => {
    var email = req.body.email
    var password = req.body.password

    relative.login(email, password, (result) => {
        resp.send(JSON.stringify(result))
    })
})


//document routes : 

router_user.post('/get-documents', (req, resp) => {
    var patientID = req.body.patientID

    document.getFileList(patientID, (result) => resp.send(JSON.stringify(result)))
})

router_user.post('/download-document', (req, resp) => {
    var fileID = req.body.fileID 
    document.downloadFile(fileID, (result) => {
        resp.send(JSON.stringify(result))
    })
})

router_user.post('/get-relatives', (req, resp) => {
    relative.getRelatives(req.body.patientID, (result) => {
        resp.send(JSON.stringify(result))
    })
})

router_user.post('/update-payment', (req, resp) => {
    patient.updateBilling(req.body.patientID, req.body.seconds, (result) => {
        resp.send(JSON.stringify(result))
    })
})



//streaming routes : 

router_user.post('/check-streaming', (req, resp) => {
    var patientID = req.body.patientID
    console.log(patientID)
    room.checkStreaming(patientID, (result) => {
        resp.send(JSON.stringify(result))
    })
})

router_user.post('/verify-otp', (req, resp) => {
    var otp = req.body.otp
    var bedID = req.body.bedID
    streaming.verifyOTP(bedID, otp, (result) => {
        resp.send(JSON.stringify(result))
    })
})

module.exports = router_user