
const db = require('../database/database')

const user = require('../model/userModel')

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