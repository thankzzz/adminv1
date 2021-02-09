const tb_token = require('../model/refreshTokenModel')
const jwt = require('jsonwebtoken')
require('dotenv/config')
exports.auth = async (req,res)=>{
    const token = req.body.refreshtoken
    console.log(token)
    if(token == null) return res.sendStatus(401)
    const checkToken = await tb_token.findOne({where:{refresh_token:token}})
    if(!checkToken.length){
        res.sendStatus(403)
    }else{
        jwt.verify(token, process.env.JWT_REFRESH_SECRET,(err,user)=>{
            if(err)return res.sendStatus(403)
            const accessToken  = jwt.sign(user,process.env.JWT_SECRET)
            res.jsos({accessToken})
        })
       
    }
}