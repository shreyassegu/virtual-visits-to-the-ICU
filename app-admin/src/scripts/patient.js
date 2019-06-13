var config = require('./config.json')


class Patient {
    getFreeRooms(callback) {
        fetch(config.host + "/admin/get-free-beds", {
            mode : 'cors',
            method : 'get'
        }).then((data) => data.json()).then((data) => callback(data.objects))
        .catch((err) => console.log(err))
    }

    addPatient(name, bedID, roomID, diseaseType, phone, callback) {
        fetch(config.host+ "/admin/add-patient", {
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            mode : 'cors',
            method : 'post',
            body : JSON.stringify({name : name, bedID : bedID, phone : phone, roomID : roomID, diseaseType : diseaseType, billing : 0.0})
        }).then((data) => data.json()).then((data) => {
            callback(data)
        })
    }

    getPatients(callback) {
        fetch(config.host+"/admin/get-patients", {
            mode : 'cors', method : 'get'
        }).then((data) => data.json()).then((data) => callback(data.objects))
    }

    deletePatient(patientID, bedID) {
        fetch(config.host + "/admin/delete-patient", {
            mode : 'cors', method : 'post',
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body : JSON.stringify({patientID : patientID, bedID : bedID})
        }).then((data) => data.json()).then((data) => {console.log(data);alert("Patient deleted")})
    }

    uploadDocument(patientID, fileName, fileData, callback) {
        fetch(config.host + "/admin/add-document", {
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }, mode : 'cors', method : 'post', body : JSON.stringify({
               patientID : patientID,
               fileName : fileName,
               fileData : fileData
            })
        }).then((data) => data.json()).then((data) => callback(data))
    }

    totalBill(callback) {
        fetch(config.host + "/admin/get-bill-sum", {
            headers : {"Content-Type" : "application/json", "Accept" : "application/json"},
            mode : 'cors', method : 'get'
        }).then((data) => data.json()).then((data) => callback(data))
    }
}

export default Patient