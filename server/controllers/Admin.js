//obtain the schema object : 

var AdminSchema = require('./default').Admin

class Admin {
    create(username, email, password) {
        var admin = new AdminSchema({username : username, email : email, password : password})
        admin.save((err, admin) => {
            if(err) {
                console.log(err)
                return false
            }
            return true
        })
    }
    login(email, password, callback) {
        AdminSchema.findOne({email : email, password : password}).exec((err, admin) => {
            if (err) callback({error : true, message : "Auth failed due to error"});
            else if(!admin) callback({error : true, message : "Invalid credentials"});
            else callback({error : false, message : "Auth successful", result : admin});
        })
    }
}

module.exports = Admin