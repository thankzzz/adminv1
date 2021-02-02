
const db = require('../database/database')

const {user,user_login,user_history, user_setting} = require('../model/userModel')

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

exports.getHistory = async(req,res)=>{
    
    const id = req.params.id
    
    user_history.findAll({where:{fk_account_id:id}}).then(result=>{
        res.json({status:'success',info:result})
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
    console.log(activity_store)
    user_setting.update({store_activity:activity_store},{where:{fk_account_id:id}}).then(result=>{
        res.json({status:'success'})
    }).catch(err=>{
        res.json({status:'failed',message:err.message})
    })
}