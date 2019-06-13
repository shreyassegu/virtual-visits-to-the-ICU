var StreamingService = require('../streaming/linux_fork')


class StreamingObject {
    getStreamingData(bedID, callback) {
        callback({
            error : true,
            result : new StreamingService().get(bedID)
        })
    }

    refresh(bedID, callback) {
        new StreamingService().restart(bedID)
        callback({error : false, "Message" : "Restart finish"})
    }

    verifyOTP(bedID, otp, callback) {
        var verified  = new StreamingService().verifyOTP(bedID, otp)
        callback({error : false, content : verified})
    }
}

module.exports =  StreamingObject