const db = require('../database/database')
const account = require('../model/accountModel')
const {user,user_login,user_history,user_setting} = require('../model/userModel')
const bcrypt = require('bcrypt')
const {getToken} = require('../util')
const uuid = require('uuid');
const path = require("path");
const fs = require('fs')
exports.signup = async (req,res)=>{

    const formdata = {
        id:uuid.v1(),
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
                    
                     account.create(formdata,{raw:true})
                    .then(result=>{
                    return  user.create({
                                    fullname:null,
                                    phone:null,
                                    address:null,
                                    dateofbirth:null,
                                    image_name:null,
                                    image_file:null,
                                    fk_account_id:result.id
                                })                                                                              
                    })
                    .then(()=>{
                       return user_login.create({
                            last_login:null,
                            last_ip:null,
                            online:false,
                            fk_account_id:formdata.id
                         }) 
                    })   
                    .then(()=>{
                        return user_setting.create({
                            store_activity:false,
                            fk_account_id:formdata.id
                        })
                    })               
                    .then(()=>{
                        return  res.json({status: 'success'})
                    })
                    .catch(err=>{
                        res.json({status:'failed',message:err.message})
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
        last_country:req.body.last_country,
        last_city:req.body.last_city,
        online:true
    }
    
    try{
      let checkUser = await account.findOne({where:{email:formData.email}})  
      if(!checkUser){
        res.json({status:'failed',message:'Please ensure your email and password are correct'})
      }else{
          bcrypt.compare(formData.password,checkUser.password,(err,result)=>{
              if(result){                 
                  let userInfo = {
                        id:checkUser.id,
                        email:checkUser.email,
                        name: checkUser.username,
                        role:checkUser.role,
                        token:getToken(checkUser) 
                 }             
                  user_login.update(newDataAgent,{where:{fk_account_id:checkUser.id}})
                  .then(()=>{
                        return user_setting.findOne({where:{fk_account_id:checkUser.id}})
                  })
                  .then(result=>{                                        
                    if(result.store_activity){
                            user_history.create({history:`You login in ${newDataAgent.last_city} ${newDataAgent.last_country}`,fk_account_id:checkUser.id}) 
                          } 
                          res.json({status:'success',token:userInfo})  
                  })
                  .catch(err=>{
                      res.status(404).json({status:'failed',message:err.message})
                  })
                                             
              }else{
                res.json({status:'failed',message:'Please ensure your email and password are correct'})
              }
          })
      }
    }catch(err){
        res.status(404).json({status:'failed',message:'Tidak dapat terhubung ke database'})
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
    var oldpassword = req.body.oldPassword
    var newpassword = req.body.newPassword
    let data = await account.findOne({where:{id:id}})
    if(data){
        bcrypt.compare(oldpassword,data.password,(err,result)=>{
            if(err){
                console.log(err.message)
            }else if(!result){
                
                res.json({status:'failed',message:'Old password you have entered is incorrect'})
            }else{
                bcrypt.hash(newpassword ,10,(err,hash)=>{
                    if(err){
                        res.json({status:'failed',message:'Terjadi kesalahan pada server'})
                    }else{    
                       
                           account.update({password:hash},{where:{id:id}})
                           .then(()=>{
                              return user_setting.findOne({where:{fk_account_id:id}})})
                            .then(result1=>{                              
                              if(result1.store_activity){
                                    user_history.create({history:`You changed password`,fk_account_id:id}) 
                                }  
                                return  res.json({status:'success',info:result1})
                            })                           
                            .catch(err=>{
                              return res.json({status:'failed',message:err.message})
                            })                                                  
                    }
                })
                
            }
        })
    }
}