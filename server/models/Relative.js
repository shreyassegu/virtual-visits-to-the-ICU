var mongoose = require('mongoose')

var RelativeSchema = mongoose.Schema({
    relativeID : {
        type : String,
        unqiue : true,
        required : true
    },
    patientID : {
        type : String,
        unqiue : true,
        required : true
    },
    email : {
        type : String,
        unqiue : false,
        required : true
    },
    password : {
        type : String,
        unqiue : true,
        required : true
    },
    name : {
        type : String,
        required : true
    }, 
    phone : {
        type : String, 
        required : true
    }
})

var Relative = mongoose.model("Relative", RelativeSchema)

module.exports = Relative
