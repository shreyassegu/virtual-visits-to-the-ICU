var randomstring = require('randomstring')
var IP = require('ip')

module.exports.generateUnqiue = (length) => {
    return randomstring.generate({
        length : length,
        charset : 'hex'
    })
}

module.exports.billCalculator = (seconds, perMinute) => {
    var minutes = seconds / 60
    return perMinute * minutes
}

module.exports.otp_generator = () => {
    return randomstring.generate({
        length : 5
    })
}

module.exports.ip = () => {
    return IP.address()
}