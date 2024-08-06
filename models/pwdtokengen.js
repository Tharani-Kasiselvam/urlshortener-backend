const mongoose = require('mongoose')

const pwdtokengenSchema = new mongoose.Schema(
    {
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'users'
        },
        tokenStr : String,
        createdAt : {
            type : Date,
            default : Date.now,
            expires : 36000
        }
    },
    {
        collection : 'PwdTokengen',
        versionKey : false
    }
)
module.exports = mongoose.model('PwdTokengen',pwdtokengenSchema,'pwdtokengen')