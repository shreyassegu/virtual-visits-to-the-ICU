var mongoose = require('mongoose')

var RoomsSchema = mongoose.Schema({
    roomID : {
        type : String,
        required : true,
        unique : true
    },
    beds : [],
    roomName : {
        type : String,
        required : true
    }
})

var BedSchema = mongoose.Schema({
    bedID : {
        type : String,
        required : true,
        unique : true
    },
    hasPatient : {
        type : Boolean,
        required : true
    },
    streamIndex : {
        type : Number,
        default : 2
    },
    roomName : {
        type : String,
        unique : false
    },
    roomID : {
        type : String,
        unique : false
    },
    cameraRoute : {
        type : String,
        default : 'http://0.0.0.0:0000'
    },
    streamingEnabled : {
        type : Boolean,
        default : false
    }
})

var ScheduleSchema = mongoose.Schema({
    schedules : [{
        timestamp : {type : String}, duration : {type : Number}, roomID : {type : String}
    }]
})

var Room = mongoose.model("Room", RoomsSchema)
var Bed  = mongoose.model("Bed", BedSchema)
var Schedule = mongoose.model("Schedule", ScheduleSchema)


module.exports.Room = Room
module.exports.Bed = Bed
module.exports.Schedule = Schedule
