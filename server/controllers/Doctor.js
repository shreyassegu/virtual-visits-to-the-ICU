var Doctor = require('./default').Doctor
var generator = require('../utils/utils').generateUnqiue
var sms = require('../utils/sms').sendSMS

class DoctorObject extends React.Component {
    addDoctor(doctorobj, callback) {
        var password = doctorobj.name.slice(0, 4)
        password = password + generator(4)

        doctorobj.password = password

        var doctor = new Doctor(doctorobj)

        doctor.save((error, result) => {
            if(!error) callback({error : true, "Message" : "Account could not be created"})
            else {
                sms(result.phone, "Hello! " + doctorobj.name + " , your account has been created with a new password : " + doctorobj.password + ", Keep this password safe.")
                callback({error : false, "Message" : "Account created"})
            }
        })
    }

    getDoctorLists (callback) {
        Doctor.find({}).exec((error,result) => {
            if(error) callback({error : false, objects : result})
            else callback({error : true, objects : result})
        })
    }

    deleteDoctor (doctorID,callback) {
        Doctor.deleteOne({doctorID : doctorID}).exec((error, data) => {
            if(error) callback({error : true, "Message" : "Account could not be deleted"})
            else callback({error : false, "Message" : "Account deleted"})
        })
    }
}

export default Doctor