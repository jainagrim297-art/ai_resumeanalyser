const mongoose = require('mongoose');



const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        index: true,
        timestamp : true 
    }
})


module.exports = mongoose.model("BlacklistToken", blacklistTokenSchema);