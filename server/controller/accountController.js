const db = require('../database/database')
const account = require('../model/accountModel')
const {user,user_login} = require('../model/userModel')
const bcrypt = require('bcrypt')
const {getToken} = require('../util')

exports.signup = async (req,res)=>{
    const formdata = {
        username: req.body.username,
        email:req.body.email,
        password: req.body.password,
        role: 'master',
        status: true
    }
   try{     
        let checkUser = await account.findOne({where:{email:formdata.email}})
        if(checkUser){
            res.json({status:'failed',message:'A user with this email address already exists'})
        }else{
            bcrypt.hash(formdata.password,10,(err,hash)=>{
                formdata.password = hash;
                if(err){
                    res.json({status:'failed',message:'Account creation failed,please try again later'})
                }else{

                     account.create(formdata,{raw:true}).then(result=>{
                        if(result){
                            user.create({
                                fullname:null,
                                phone:null,
                                address:null,
                                dateofbirth:null,
                                fk_account_id:result.id
                            })       
                            user_login.create({
                                fk_account_id: result.id
                            })                
                            res.json({status: 'success', info:result })
                        }else{
                            res.json({status:'failed',message:'Terjadi kesalahan registrasi data'})
                        }
                         
                    })
                }
            })
        }
   }catch(err){
        res.json({status:'failed',message:'Terjadi kesalahan pada server'})
   }
}
exports.signin = async (req,res)=>{
    const formData= {
        email:req.body.email,
        password:req.body.password,
    }
   
    let newDataAgent = {
        last_login:req.body.last_login,
        last_ip:req.body.last_ip,
        online:true
    }
    const updateUserAgent = async(id) =>{
        try{
            let updateAgent = await user_login.update(newDataAgent,{where:{fk_account_id:id}})  
            if(!updateAgent){
            console.log('Tidak dapat mengupdate user agent login')
            }
        }catch(err){
            console.log(err.message)
        }
    }
    try{
      let checkUser = await account.findOne({where:{email:formData.email}})  
      
      if(!checkUser){
        res.json({status:'failed',message:'Please ensure your email and password are correct'})
      }else{
          bcrypt.compare(formData.password,checkUser.password,(err,result)=>{
              if(result){
                  
                  let token = getToken(checkUser)              
                    updateUserAgent(checkUser.id)   
                  res.cookie('userInfo',token,{httpOnly: false, secure: false, maxAge: 3600000})
                  res.json({status:'success',token:token})  
              }else{
                res.json({status:'failed',message:'Please ensure your email and password are correct'})
              }
          })
      }
    }catch(err){
        res.json({status:'failed',message:'Tidak dapat terhubung ke database'})
    }
}

exports.delete = async(req,res)=>{
    const id = req.params.id
    let data =  await account.findOne({where:{id:id}})
    if(data){
        account.destroy({where:{id:id}}).then(()=>{
            res.json({status:'success'})
        }).catch(err=>{
            res.json({status:'failed',message:'Terjadi kesalahan pada server'})
        })
    }else{
        res.json({status:'failed',message:'Tidak dapat menemukan user'})
    }
    
}

exports.reset = async(req,res) =>{
    var id  = req.params.id
    var oldpassword = req.body.oldpassword
    var newpassword = req.body.newpassword
    let data = await account.findOne({where:{id:id}})
    if(data){
        bcrypt.compare(oldpassword,data.password,(err,result)=>{
            if(err){
                console.log(err.message)
            }else if(result){
                bcrypt.hash(newpassword ,10,(err,hash)=>{
                    if(err){
                        res.json({status:'failed',message:'Terjadi kesalahan pada server'})
                    }else{
                        account.update({password:hash},{where:{id:id}}).then(result1=>{
                            res.json({status:'success',info:result1})
                        })
                    }
                })
            }else{
                res.json({status:'failed',message:'Old password you have entered is incorrect'})
            }
        })
    }
}