var mongoose = require('mongoose')

var DoctorSchema = mongoose.Schema({
    name : {
        type: String,
        unique : true,
        required : true
    }, 
    doctorID : {
        type : String,
        unique : true,
        required : true
    },
    phone: {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String, 
        required : true
    },
    patients : [{patientID : {type : String, required : true, unique : true}}]
})

var Doctor = mongoose.model("Doctor", DoctorSchema)

module.exports = Doctor