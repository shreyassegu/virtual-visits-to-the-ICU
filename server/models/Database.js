var mongoose = require('mongoose')


class Database {
    constructor(db_name) {
        this.url = "mongodb://localhost/"+db_name
    }

    connect() {
        mongoose.connect(this.url, {useNewUrlParser : true})
    }
}

module.exports.Database = Database