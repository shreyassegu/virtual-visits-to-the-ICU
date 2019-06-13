var Patient = require('./default').Patient
var generate = require('../utils/utils').generateUnqiue
var computeBill = require('../utils/utils').billCalculator
var Bed = require('./Bed')


//modify this to configure billing, in $ : 
const BILLING_PER_MINUTE = 1.0

class PatientObject {
    addPatient(object, callback) {
        var patientID = generate(10)

        object.patientID = patientID

        console.log(object)

        var patient = new Patient({
            patientID: object.patientID,
            phone: object.phone,
            billing: object.billing,
            diseaseType: object.diseaseType,
            name: object.name,
            roomID: object.roomID,
            bedID: object.bedID
        })

        patient.save((err, result) => {
            if (err) {
                throw err
                return callback({ error: true, "Message": "Patient not added" })
            } else {
                new Bed().updateHasPatient(object.bedID, true, (result) => { return })
                return callback({ error: false, "Message": "Patient added" })
            }
        })
    }

    getPatients(callback) {
        Patient.find({}).exec((error, results) => {
            if (!error) callback({ error: false, objects: results })
        })
    }

    deletePatient(patientID, bedID, callback) {
        console.log(patientID, bedID)
        Patient.findOneAndDelete({ patientID: patientID }).exec((err, result) => {
            console.log(result)
            if (err) callback({ error: true })
            else {
                new Bed().updateHasPatient(bedID, false, (result) => { return })
                callback({ error: false })
            }
        })
    }

    updateBilling(patientID, seconds, callback) {
        var incrementedBilling = computeBill(seconds, BILLING_PER_MINUTE)
        Patient.findOne({patientID : patientID}).exec((error, data) => {
            if(!error) {
                var updateBill = data.billing + incrementedBilling
                Patient.findOneAndUpdate({patientID : patientID}, {billing : updateBill}).exec((error, result) => {
                    if(!error) callback({error : false, "Message" : "Billing update with amount : " + updateBill})
                    else callback({error : true, "Message" : "Update amount failed"})
                })
            }
        })
    }

    computeBillingSum(callback) {
        Patient.find({}).exec((error, data) => {
            if(!error) {
                var sum = 0
                for(var i = 0; i < data.length; i ++) 
                    sum += (data[i].billing)
                
                callback({error : false, totalBill : sum.toFixed(1)})
            } else callback({error : true, totalBill : NaN})
        })
    }
}

module.exports = PatientObject