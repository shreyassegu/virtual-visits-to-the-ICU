var Bed = require('./default').Bed
var Room = require('./default').Room
var Patient = require('./default').Patient
var generator = require('../utils/utils').generateUnqiue


class RoomObj {
    addRoom(room_name, callback) {
        var id = generator(15)

        var room = new Room({
            roomID : id, roomName : room_name, beds : [{bedID : id}]
        })

        room.save((err, result) => {
            if(err) {
                callback({error : true, "Message" : "Room not added"})
                console.log(err)
            }
            else callback({error : false, "Message" : "added successfully"})
        })

    }

    getRooms(callback) {
        Room.find({}).exec((err, objects) => {
            if(err) callback({error : true, "Message" : "Unable to fetch room details"})
            else callback({error : false, objects : objects})
        })
    }

    addBed(bedID, roomID) {
        Room.findByIdAndUpdate({roomID : roomID}, {$push : {beds : {bedID : bedID}}}).exec((err, result) => {
            if(err) console.log(err)
            console.log(result)
        })  
    }

    checkStreaming(patientID, callback) {
        //obtain the roomID from patientID
        Patient.findOne({patientID : patientID}).exec((error, result) => {
            if(!error) {
                console.log(result)
                Bed.findOne({bedID : result.bedID}).exec((error, result2) => {
                    if(error) callback({error : true, Message : "Check error"})

                    else {
                        console.log(result2)
                        if(result2.streamingEnabled) callback({error : false, enabled : true, bedID : result.bedID})
                        else callback({error : false , enabled : false})
                    }
                })
            }
        })
    }
}

module.exports = RoomObj
