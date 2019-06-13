var mongoose = require('mongoose')

var DocumentSchema = mongoose.Schema({
    patientID : {
        required : true,
        type : String
    },
    fileName : {
        required : true,
        type : String
    },
    fileID : {
        required : true,
        type : String,
        unqiue : true
    },
    fileData : {
        required : true,
        type : String 
    },
    time : {
        type : Date,
        default : Date.now
    }
})

var Document = mongoose.model("document", DocumentSchema)

module.exports = Document