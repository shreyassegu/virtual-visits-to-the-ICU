import randomstring from 'randomstring'
import config from './config.json'

var moderator_session = {
    audio : true,
    video : true
}

var generate_roomid = () => {
    var room_id = randomstring.generate({
        length : 5
    })
    return room_id
}

class VideoConnector {

    constructor(handlers) {
        this.connector = new window.RTCMultiConnection()
        this.connector.socketURL = config.video_rest + "/"
        this.connector.session = {
            audio : true,
            video :true
        }

        this.handlers = handlers
    }

    createStream(room_id) {
        this.connector.openOrJoin(room_id)
        
        this.connector.onstream = (event) => {
            this.handlers['room_video_render'](event)
        }
    }
}

/*var roomID = req.body.roomID
    var relativeIDs = req.body.relativeIDs
    var doctorID = req.body.doctorID
    var patientID = req.body.patientID
    var owner = req.body.owner */

class VideoAPI {
    createSession(roomID, participants, owner, extra, entity, callback) {
        fetch(config.video_rest + "/conference/register", {
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }, mode : 'cors', method : 'post', body : JSON.stringify({
                roomID : roomID,
                relativeIDs : participants,
                doctorID : extra,
                patientID : entity,
                owner : owner
            })
        }).then(data => data.json()).then((data) => {
            callback(data)
        })
    }

    join(roomID, participant, callback) {
        fetch(config.video_rest + "/conference/join", {
            headers : {"Content-Type" : "application/json", "Accept" : "application/json"},
            mode : 'cors', method : 'post', body : JSON.stringify({
                roomID : roomID,
                relativeID : participant
            })
        }).then((data) => data.json()).then((data) => {
            callback(data)
        })
    }
}

export  {VideoConnector, generate_roomid, VideoAPI};