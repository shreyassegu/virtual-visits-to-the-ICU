var Bed = require('./default').Bed
var Room = require('./Room')

var generator = require('../utils/utils').generateUnqiue

var StreamContainerService = require('../streaming/linux_fork.js')


class BedObject {
    addBed(roomID, hasPatient, roomName,  callback) {
        var id = generator(10)
        var bed = new Bed({hasPatient : hasPatient, bedID : id, roomID : roomID, roomName : roomName})

        bed.save((err, bed) => {
            if(err) callback({error : true, "Message" : "Unable to add bed"})
            else {
                callback({error : false, "Message" : "Bed added successfully"})
                new Room().addBed(id, roomID)
            }
        })
    }

    updateHasPatient(bedID, newvalue, callback) {
        Bed.findOneAndUpdate({bedID : bedID}, {hasPatient : newvalue}).exec((err, res) => {
            if(err) callback({error : true, "Message" : "Falied to update"})
            else callback({error : false, "Message" : "Bed updated"})
        })
    }

    getFreeBeds(callback) {
        Bed.find({hasPatient : false}).exec((err, results) => {
            if(!err) callback({error : false, objects : results})
        })
    }

    getBedsFromRoom(roomID, callback) {
        Bed.find({roomID : roomID}).exec((err, results) => {
            if(!err) callback({error : false, objects : results})
        })
    }

    enableStreaming(bedID, cameraRoute, callback) {
        console.log(bedID)
        Bed.findOneAndUpdate({bedID : bedID}, {cameraRoute : cameraRoute, streamingEnabled : true}).exec((err, result) => {
            console.log(err)
            if(!err) {
                //TODO : enable streaming by creating a ffmpeg process with all the parameters
                new StreamContainerService().createStream(bedID, cameraRoute, 10000)
                //send only response as of now : 
                callback({error : false, "Message" : "Streaming enabled for camera"})
            }else {callback({error : true, "Message" : "Streaming could not be enabled"})}
        })
    }

    disableStreaming(bedID, callback) {
        Bed.findOneAndUpdate({bedID : bedID}, {streamingEnabled : false}).exec((err, result) => {
            if(!err) {
                //TODO: Kill the streaming procedure
                new StreamContainerService().destroyStream(bedID)
                callback({error : false, "Message" : "Streaming disabled"})
            }else {callback({error : true, "Message" : "Could not stop the streaming service"})}
        })
    }
}

module.exports = BedObject