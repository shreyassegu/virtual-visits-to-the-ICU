var rooms_available = {}

class Room {
    adRoom(doctorID, roomID, relativeIDs, patientID, owner) {
        rooms_available.roomID = {
            doctorID : doctorID,
            relativeIDs : relativeIDs , //stores a list of all allowed relatives
            //if any relative starts the session, the other relatives corresponding to that patient id
            //will be copied to this data structure
            owner : owner
         }

         console.log(rooms_available.roomID)
    }
    deleteRoom(roomID) {
        delete rooms_available.relativeID
    }
    checkAccess(relativeID_, roomID) {
        for(var i = 0; i < rooms_available.roomID.relativeIDs.length; i++) {
            var relativeID = rooms_available.roomID.relativeIDs[i]
            console.log(relativeID, relativeID_)
            if(relativeID === relativeID_){ 
                console.log("True")
                return true
            }
         }

         return false
    }
}

module.exports = Room