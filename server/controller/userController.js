
const db = require('../database/database')
const uuid = require('uuid')
const {user_info,user_login,user_setting,user_agent,user_image,user_history} = require('../model/userModel')

const multer = require('multer')
const path = require("path");
const fs = require('fs');
const {getToken,getRefreshToken} = require('../util')
const bcrypt = require('bcrypt')
const refreshToken = require('../model/refreshTokenModel');
const Storage = multer.diskStorage({
    destination: path.join(__dirname + './../../client/public/assets/img/Gallery'),
    filename: function (req, file, cb) {
      var originalName = file.originalname
      var splitName = originalName.split('.')[0]
      cb(null, file.fieldname + '-' + splitName + path.extname(file.originalname))
    }
  })
  function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }
  const upload = multer({
    storage: Storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    }
  }).single('user_image')
  
exports.signup = async (req,res)=>{
    const formData = {
        id:uuid.v1(),
        username: req.body.username,
        email:req.body.email,
        password: req.body.password,
        role: 'user',
        status: true,
    }
    
    let username = await user_login.findOne({where:{username:formData.username}})
    let email = await user_login.findOne({where:{email:formData.email}})
    if(email){
        res.json({status:'failed',message:"A user with this email address already exists"})
    }else if(username){
        res.json({status:'failed',message:"A user with this username already exists"})
    }else{
        bcrypt.hash(formData.password,10,(err,hash)=>{
            if(err){res.status(401).json({status:'failed',message:'Terjadi kesalahan pada server'})}
            else{
                formData.password = hash
                user_login.create(formData,{raw:true}).then(()=>{
                    return user_info.create({
                        fullname:null,
                        phone:null,
                        address:null,
                        dateofbirth:null,
                        image_name:null,
                        image_file:null,
                        fk_account_id:formData.id
                    })
                
                    
                })
                .then(()=>{
                   user_agent.create({
                        last_login:null,
                        last_ip:null,
                        online:false,
                        fk_account_id:formData.id
                    })
                    user_setting.create({
                        store_activity:false,
                        fk_account_id:formData.id
                        })
                    user_image.create({
                        image_file:null,
                        image_name:null,
                        fk_account_id:formData.id
                    })
                })
                .then(()=>{
                    res.status(200).json({status:'success'})
                })
                .catch(err=>{
                    res.json({status:'failed',message:err.message})
                })
            }               
        })  
    }  
}

exports.signin = async(req,res)=>{
    const formData= {
        email:req.body.email,
        password:req.body.password,
    }
   
    const dataAgent = {
        last_login:req.body.last_login,
        last_ip:req.body.last_ip,
        last_country:req.body.last_country,
        last_city:req.body.last_city,
        online:true
    }
    try{
        let user = await user_login.findOne({where:{email:formData.email}}) 
        if(!user){
            res.json({status:'failed',message:'User not registered'})
        }else{
            let result = await bcrypt.compare(formData.password,user.password)
            if(result){
                let userInfo = {
                        username:user.username,
                        email:user.email,
                        role:user.role,
                        updatedAt:user.updatedAt
                }      
                    let accessToken = getToken(user)
                    let refresh_Token = getRefreshToken(user)  
                    refreshToken.create({refresh_token:refresh_Token})
                    user_agent.update(dataAgent,{where:{fk_account_id:user.id}})
                    let setting = await user_setting.findOne({where:{fk_account_id:user.id}})
                    if(setting.store_activity){
                        user_history.create({history:`You login in ${dataAgent.last_city} ${dataAgent.last_country}`,fk_account_id:user.id})
                    }
                    res.status(200).json({status:"success",accessToken:accessToken,refreshToken:refresh_Token,user:userInfo})
                }else{
                    res.json({status:"failed",message:'Email or password is incorrect'})
                }        
        }
    }catch(err){
        res.json({status:"failed",message:err.message})
    }
    
          
}
exports.signout = async(req,res) =>{
    const token = req.body.refreshToken
    const last_login = req.body.last_login
    refreshToken.destroy({where:{refresh_token:token}}).then(()=>{
        return user_agent.update({last_login:last_login,online:false},{where:{fk_account_id:"16499690-6b71-11eb-8589-3377ada10b1b"}})
    })
    .then(()=>{
        res.json({status:"success"})
    }).catch(err=>{
        
        res.json({status:"failed",message:err.message})
    })
   
}


exports.changePassword = async(req,res) =>{
    var id  = req.user
    var oldpassword = req.body.oldPassword
    var newpassword = req.body.newPassword
    try{
        let data = await user_login.findOne({where:{id:id}})
        if(data){
            let result =  await bcrypt.compare(oldpassword,data.password)
            if(result){
                let {hash} =  bcrypt.hash(newpassword ,10)
                let updateData = await user_login.update({password:hash},{where:{id:id}})
                if(updateData){
                    res.json({status:"success"})
                }else{
                    res.json({status:"failed",message:"Password tidak berhasil diubah"})
                }
            }else{
                res.json({Status:"failed",message:"Password yang anda masukan salah"})
            }
        }else{
            res.json({status:"failed",message:"User tidak ditemukan"})
        }
    }catch(err){
        res.json({status:"failed",message:err.message})
    }
    
   
}
exports.getData = async(req,res)=>{
    const id  = req.user
   
    try{
        let data = await user_info.findOne({where:{fk_account_id:id}})
        if(data){
            res.status(200).json({status:'success',info:data})
        }else{
            res.json({status:'failed',message:'Tidak ada data'})
        }
    }catch(err){ 
        console.log(err.message)
        res.status(404).json({status:'failed',message:'Terjadi kesalahan pada server'})
    }
}


exports.update = async(req,res)=>{
    const id = req.user
    const updateData = {
        fullname : req.body.fullname,
        phone : req.body.phone,
        address : req.body.address,
        dateofbirth : req.body.dateofbirth
    }
    user_info.findOne({where:{fk_account_id:id}})
    .then(result=>{
        if(!result){  
            res.status(404).json()
        }else{          
            user_info.update(updateData,{where:{fk_account_id:id}})
            res.status(200).json()
        }       
    })
    .catch(err=>{
        res.status(404).json({message:err.message})
    })
   
}

exports.getAgent = async(req,res)=>{
    const id = req.user
   try{
       let data = await user_agent.findOne({where:{fk_account_id:id}})
       if(data){
           res.json({status:'success',info:data})
       }else{
           res.json({status:'failed',message:'Tidak ditemukan data'})
           
       }
   }catch(err){
        res.json({status:'failed',message:err.message})
   }
    
}
exports.updateAgent_login_session = async(req,res)=>{
    const id = req.user
    const lastLogin = req.body.lastLogin
    user_login.update({last_login:lastLogin},{where:{fk_account_id:id}}).then(()=>{
        console.log('tidak dapat menyimpan login session user')
    })
    .catch(err=>{
        console.log(err.message)
    })
}

exports.getHistory = async(req,res)=>{
    const {page} = req.query
    const id = req.user
    const itemPerPage = 15
    var indexOfLastItem = page * itemPerPage;
    var indexOfStartItem = indexOfLastItem - itemPerPage;
    user_history.findAll({where:{fk_account_id:id}}).then(result=>{
        let data = result
        let sortedData = data.sort((a,b)=>b.createdAt - a.createdAt)
        let currentItem = sortedData.slice(indexOfStartItem,indexOfLastItem)
        res.json({status:'success',info:currentItem,total:data.length})
    }).catch(err=>{
        res.json({status:'failed',message:err.message})
    })   
}
exports.getSetting = async(req,res)=>{
    const id = req.user
    user_setting.findOne({where:{fk_account_id:id}}).then(result=>{
        res.json({status:'success',info:result})
    }).catch(err=>{
        res.json({status:'failed',message:err.message})
    })
}
exports.updateSetting = async(req,res)=>{
    const id = req.user
    const activity_store = req.body.store_activity
    
    user_setting.update({store_activity:activity_store},{where:{fk_account_id:id}}).then(()=>{
        res.json({status:'success'})
    }).catch(err=>{
        res.json({status:'failed',message:err.message})
    })
}

exports.getProfileImage = async(req,res)=>{
    const id = req.user
    
    user_image.findOne({where:{fk_account_id:id}}).then(result=>{
    
        res.json({status:'success',info:result})
    }).catch(err=>{
        res.json({Status:'failed',message:err.message})
    })
}

exports.uploadImage = async(req,res)=>{
    const id = req.user
      
    upload(req,res,(err)=>{
        if(err){
            res.json({status:"failed",message:err.message})
        }
        var file =req.file
        var originalName = file.originalname
        var splitName = originalName.split('.')[0]
        var filename = file.fieldname + '-' + splitName + path.extname(file.originalname)
        var imageData = fs.readFileSync(req.file.path);
        let updateData = {
            image_file:imageData,
            image_name:filename
        }
        
        user_image.update(updateData,{where:{fk_account_id:id}}).then(result=>{
            res.json({status:"success"})
        }).catch(err=>{ 
            res.json({status:"failed",message:err.message})
        })
    })

    
    
}


exports.createHistory = async(req,res) =>{
    const id = req.body.id
    const historyMsg = req.body.history
    user_setting.findOne({where:{fk_account_id:id}}).then(result=>{
        if(result.store_activity){
            return  user_history.create({
                history:historyMsg,
                fk_account_id:id
            })
        }
        return;
    })
    .catch(err=>{
         console.log(err.message)
    })
}