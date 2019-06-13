var Document = require('./default').Document
var generate = require('../utils/utils').generateUnqiue

class DocumentObject {
    add(object, callback) {
        var fileID = generate(10)

        object.fileID = fileID

        var document = new Document(object)

        document.save((err, result) => {
            if(err) callback({error : true, Message : "Faliled to upload"})
            else callback({error : false, Message : "Upload successful"})
        })
    }

    getFileList(patientID, callback) {
        Document.find({patientID : patientID}).exec((err, result) => {
            if(!err) {
                for(var i = 0; i < result.length; i++) {
                    delete result[i].fileData
                }

                callback({error : false, objects : result})
            }
        })
    }

    downloadFile(fileID, callback) {
        Document.findOne({fileID : fileID}).exec((error, result) => {
            if(!error) callback({error : false, object : result})
        })
    }
}

module.exports =  DocumentObject