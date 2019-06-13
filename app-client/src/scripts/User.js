import config from './config.json'

class User {
    auth(email, password, callback) {
        fetch(config.host + "/user/login", {
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }, mode : 'cors', method : 'post',
            body : JSON.stringify({email : email, password : password})
        }).then((data) => data.json()).then((data) => {
            callback(data)
        })
    }

    getFileList(patientID, callback) {
        fetch(config.host + "/user/get-documents", {
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }, mode : 'cors', method : 'post', body : JSON.stringify({patientID : patientID})
        }).then((data) => data.json()).then((data) => {
            callback(data)
        })
    }

    downloadFile(fileID, callback) {
        fetch(config.host + "/user/download-document", {
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }, mode : 'cors', method : 'post', body : JSON.stringify({fileID: fileID})
        }).then((data) => data.json()).then((data) => callback(data))
    }

    checkStreaming(patientID, callback) {
        fetch(config.host + "/user/check-streaming", {
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }, mode : 'cors', method : 'post', body : JSON.stringify({patientID : patientID})
        }).then((data) => data.json()).then((data) => callback(data))
    }

    verifyOTP(otp, bedID, callback) {
        fetch(config.host + "/user/verify-otp", {
            headers : {"Content-Type" : "application/json", "Accept" : "application/json"},
            mode : 'cors', method : 'post', body : JSON.stringify({otp : otp, bedID : bedID})
        }).then((data) => data.json()).then((data) => {
            if(!data.error) {
                console.log(data)
                callback(data.content)
            }
        })
    }

    getRelativeIds(patientID, callback) {
        fetch(config.host + '/user/get-relatives', {
            headers : {"Content-Type" : "application/json", "Accept" : "application/json"},
            mode : 'cors',
            method : 'post', body : JSON.stringify({patientID : patientID})
        }).then((data) => data.json()).then((data) => {
            callback(data)
        })
    }

    updatePayment(patientID, seconds, callback) {
        fetch(config.host + "/user/update-payment", {
            headers : {"Content-Type" : "application/json", "Accept" : "application/json"},
            mode : 'cors', method : 'post', body : JSON.stringify({
                patientID : patientID,
                seconds : seconds
            })
        }).then((data) => data.json()).then((data) => {
            callback(data)
        })
    }
}

export default User