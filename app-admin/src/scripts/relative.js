import config from './config.json'

class Relative {
    addRelative(name, email, phone, patientID, callback) {
        fetch(config.host + '/admin/add-relative', {
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }, mode : 'cors', method : 'post', body : JSON.stringify({
                name : name, email : email, phone : phone, patientID : patientID
            })
        }).then((data) => data.json()).then((data) => {
            callback(data.message)
        })
    }

    removeRelative(relativeID, callback) {
        fetch(config.host + "/admin/delete-relative", {
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }, mode : 'cors', method : 'post', body : JSON.stringify({relativeID : relativeID})
        }).then((data) => data.json()).then((data) => {
            callback(data.Message)
        })
    }

    getRelatives(patientID, callback) {
        fetch(config.host + "/admin/get-relatives", {
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }, mode : 'cors', method : 'post', body : JSON.stringify({patientID : patientID})
        }).then((data) => data.json()).then((data) => {
            if(!data.error) callback(data.objects)
        })
    }
}

export default Relative