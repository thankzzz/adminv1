const tb_token = require('../model/blacklistTokenModel')
exports.create= (req,res)=>{
    const token = req.body.token
    tb_token.create({blacklist_token:token}).then(()=>{
        console.log('blacklist token created!')
    }).catch(err=>{
        console.log(err.message)
    })
}