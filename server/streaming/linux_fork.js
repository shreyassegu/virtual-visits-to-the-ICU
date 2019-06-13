var linuxKill = require('tree-kill')
const spawn = require('child_process').spawn
var IP = require('../utils/utils').ip
var otp_ = require('../utils/utils').otp_generator

var sms = require('../utils/sms').sendSMS


var Relative = require('../controllers/default').Relative
var Patient = require('../controllers/default').Patient


//a mapper between roomIDs and process parameters
var activeStreams = {

}



class StreamContainerService {
    //this object contains all methods required to manipulate active streams streams that are running, init it at the begenning : 

    createStream(roomID, cameraRoute, port) {
        var ip = IP()
        var args = ['./streaming/flv2.sh',  roomID, cameraRoute, port, roomID, ip]
        var child = spawn('sh', args)
        var otp = otp_()
        //send sms
    
        //push the parameters : 
        activeStreams.roomID = {
            cameraRoute : cameraRoute,
            ip : ip,
            port : port,
            childObject : child,
            otp : otp,
            streamURL : "rtmp://" + IP() + ":" + port + "/live/" + roomID 
        }

        console.log("OTP :" , otp)

        //----send sms ---------------
        Patient.findOne({ bedID: roomID}).exec((error, result) => {
            Relative.find({patientID : result.patientID}).exec((error , result2) => {
                for(var i = 0; i < result2.length; i++) {
                    var sms_text = "Streaming is enabled , to watch the stream, use OTP : " + otp
                   sms(result2[i].phone, sms_text, (result) => {return})
                }
            })
        })
       
        console.log(activeStreams.roomID)
    }

    destroyStream(roomID) {
        var streaming = activeStreams.roomID
        if(streaming == null) {
            return
        }
        else {
           var childObject = streaming.childObject 
           linuxKill(childObject.pid)
           console.log("Stream killed")
        }
    }

    verifyOTP(roomID, otp) {
        var OTP = activeStreams.roomID.otp 

        if(otp.trim() === OTP.trim()) {
            var copyObject = activeStreams.roomID
            delete copyObject.childObject

            return {
                verified : true,
                result : copyObject
            }
        }
        else return false
    }

    restart(roomID) {
        var copy = activeStreams.roomID

        this.destroyStream(roomID)
        var args = ['./streaming/flv.sh', copy.cameraRoute, copy.ip,  copy.port, roomID]
        console.log("Restarting video streaming... ")
        var child = spawn('sh', args)

        copy.childObject = childObject
        activeStreams.roomID = copy
    }

    get(roomID) {
        return activeStreams.roomID
    }

}

module.exports = StreamContainerService