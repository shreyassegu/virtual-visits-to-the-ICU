var mongoose = require('mongoose')
var PatientSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    }, 
    roomID : {
        type : String,
        required : true,
        unique : false
    },
    bedID : {
        type : String,
        required : true,
        unique : false
    },
    phone : {
        type : String,
        required : true,
        unique : true
    },
    patientID : {
        type : String,
        required : true,
        unique : true
    },
    billing : {
        type : Number,
        default : 0.0
    },
    diseaseType : {
        type : String
    }
})

var Patient = mongoose.model("Patient", PatientSchema)

module.exports = Patient