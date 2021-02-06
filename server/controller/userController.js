
const db = require('../database/database')

const {user,user_login,user_history, user_setting} = require('../model/userModel')
const { Op } = require("sequelize");
const multer = require('multer')
const path = require("path");
const fs = require('fs');
const moment =require('moment')
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

exports.getData = async(req,res)=>{
    const id  = req.params.id
    
    try{
        let data = await user.findOne({where:{fk_account_id:id}})
        
        if(data){
            res.json({status:'success',info:data})
        }else{
            console.log(id)
            res.json({status:'failed',message:'Tidak ada data'})
        }
    }catch(err){
        
       
        console.log(err.message)
        res.json({status:'failed',message:'Terjadi kesalahan pada server'})
    }
}


exports.update = async(req,res)=>{
    const id = req.params.id
    const updateData = {
        fullname : req.body.fullname,
        phone : req.body.phone,
        address : req.body.address,
        dateofbirth : req.body.dateofbirth
    }
    user.update(updateData,{where:{fk_account_id:id}}).then(()=>{
        res.json({status:'success'})
    }).catch(err=>{
        res.json({status:'failed'})
    })  
}

exports.getAgent = async(req,res)=>{
    const id = req.params.id
   try{
       let data = await user_login.findOne({where:{fk_account_id:id}})
       if(data){
           res.json({status:'success',info:data})
       }else{
           res.json({status:'failed',message:'tidak ditemukan data'})
           
       }
   }catch(err){
        res.json({status:'failed',message:err.message})
   }
    
}
exports.updateAgent_login_session = async(req,res)=>{
    const id = req.params.id
    const lastLogin = moment().format("YYYYY/MM/DD HH:MM:SS")
    user_login.update({last_login:lastLogin},{where:{fk_account_id:id}}).then(()=>{
        console.log('tidak dapat menyimpan login session user')
    })
    .catch(err=>{
        console.log(err.message)
    })
}

exports.getHistory = async(req,res)=>{
    const {page} = req.query
    const id = req.params.id
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
    const id = req.params.id
    user_setting.findOne({where:{fk_account_id:id}}).then(result=>{
        res.json({status:'success',info:result})
    }).catch(err=>{
        res.json({status:'failed',message:err.message})
    })
}
exports.updateSetting = async(req,res)=>{
    const id = req.params.id
    const activity_store = req.body.store_activity
    
    user_setting.update({store_activity:activity_store},{where:{fk_account_id:id}}).then(result=>{
        res.json({status:'success'})
    }).catch(err=>{
        res.json({status:'failed',message:err.message})
    })
}


exports.uploadImage = async(req,res)=>{
    const id = req.params.id
      
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
        
        user.update(updateData,{where:{fk_account_id:id}}).then(()=>{
            res.json({status:"success"})
        }).catch(err=>{
            res.json({status:"failed",message:err.message})
        })
    })

    
    
}


exports.createHistory = async(req,res) =>{
    const id = req.params.id
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