var Relative = require('./default').Relative
var generator = require('../utils/utils').generateUnqiue
var sendSMS = require('../utils/sms').sendSMS


class RelativeObject {
    addRelative(object, callback) {
        var relativeID = generator(10)

        object.relativeID = relativeID

        var password = object.name.slice(0, 5) + generator(3)

        object.password = password

        console.log(object)

        var relative = new Relative(object)

        relative.save((err, result) => {
            console.log(err)
            if(!err) {
                //send an sms to the registered phone number : 
                sendSMS(object.phone, "Your account has been created, EMAIL : " + object.email + " PASSWORD : "+ object.password + " keep the password safely", (result) =>{
                    console.log(result)
                })

                callback({error : false, "Message" : "Relative added"})
            }
            else {
                //send an sms to the registered phone number : 
                callback({error : true, "Message" : "Relative not added"})
            }
        })

    }

    deleteRelative(relativeID, callback) {
        Relative.findOneAndDelete({relativeID : relativeID}).exec((error, result) => {
            if(!error) callback({error : false, "Message" : "Relative deleted"})
            else callback({error : true, "Message" : "Relative not deleted"}) 
        })
    }

    getRelatives(patientID, callback) {
        Relative.find({patientID : patientID}).exec((error, result) => {
            console.log(error)
            if(!error) callback({error : false, objects : result})
            else callback({error : true})
        })
    }

    login(email, password, callback) {
        Relative.findOne({email : email, password : password}).exec((err, user) => {
            if (err) callback({error : true, message : "Auth failed due to error"})
            else if(!user) callback({error : true, message : "Invalid credentials"})
            else callback({error : false, message : "Auth successful", result : user})
        })
    }
}

module.exports = RelativeObject