var config = require('./config.json')

class Admin {
    login(email, password, callback) {
        let data = {
            email : email,
            password : password
        }

        fetch(config.host+"/admin/admin-login", {
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }, method : 'post', mode : 'cors', body : JSON.stringify(data)
        }).then((data) => data.json()).then((data) => callback(data))
        
    }

    getRooms(callback) {
        fetch(config.host + "/admin/get-rooms", {
            method : 'get', mode : 'cors'
        }).then((data) => data.json()).then((data) => {
            if(!data.error) callback(data.objects)
        }).catch((err) => console.log(err))
    }

    addNewRoom(roomName, callback) {
        fetch(config.host + "/admin/add-room", {
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            } ,
            mode : 'cors', method : 'post',
            body : JSON.stringify({roomName : roomName})
        }).then((data) => data.json()).then((data) => callback(data))
    }

    getBeds(roomID, callback) {
        fetch(config.host + "/admin/get-beds", {
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }, method : 'post', mode : 'cors', body : JSON.stringify({roomID : roomID})
        }).then((data) => data.json()).then((data) => {
            if(!data.error) callback(data.objects) 
        }).catch((err) => console.log(err))
    }  

    addBed(roomID, roomName, hasPatient, callback) {
        fetch(config.host +"/admin/add-bed", {
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }, method : 'post', mode : 'cors', body : JSON.stringify({roomID : roomID, roomName : roomName, hasPatient : hasPatient})
        }).then((data) => data.json()).then((data) => {
            callback(data)
        })
    }

    toggleStreaming(bedID, cameraRoute, streamingEnabled) {
        if(streamingEnabled) {
            fetch(config.host + '/admin/disable-streaming', {
                headers : {"Content-Type" : "application/json", "Accept" : "application/json"},
                mode : 'cors', method : 'post', body : JSON.stringify({bedID : bedID})
            }).then((data) => data.json()).then((data) => {
                alert(data.Message)
            })
        } else {
            fetch(config.host + "/admin/enable-streaming", {
                headers : {"Content-Type" : "application/json", "Accept" : "application/json"},
                mode : "cors", method : 'post', body : JSON.stringify({bedID : bedID, cameraRoute : cameraRoute})
            }).then((data) => data.json()).then((data) => {
                alert(data.Message)
            })
        }
    }
}

function addToLocalStorage(item) {
    localStorage.setItem("userLogged", "true")
    localStorage.setItem("data" , JSON.stringify(item))
}

function checkLogin() {
    if(localStorage.getItem("userLogged") === "true") return JSON.parse(localStorage.getItem("data"))
    else return null
}

function logout() {
    localStorage.setItem("userLogged", "false")
}

export {Admin, addToLocalStorage, checkLogin, logout}