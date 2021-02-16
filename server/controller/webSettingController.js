const webSettings = require('../model/webSettingModel')
const webSetting = require('../model/webSettingModel')
const { setting } = require('../router/router')

exports.create = async (req, res) => {
    const formData = {
            id : req.body.id,
            site_name:req.body.site_name,
            site_email: req.body.site_email,
            site_address: req.body.site_address,
            site_copyright:req.body.site_copyright,
            site_phone1:req.body.site_phone1,
            allow_regis:req.body.allow_regis,
            main_web:req.body.main_web,
            price_show:req.body.price_show,
            maintenance_mode : req.body.maintenance_mode

    }
    try{
        let result = await webSetting.findOne({where:{id:formData.id}})
        if(result){
            let result2 = await setting.update(formData,{where:{id:formData.id}})
            if(result2){
                res.json({ status: 'success', message: 'setting berhasil di update ' })
            }else{
                res.json({ status: 'failed', message: 'setting tidak berhasil diupdate ES-01' })
            }
        }else{
            let result2 = await Setting.create(formData)
            if(result2){
                res.json({ status: 'success', message: 'setting berhasil di update' })
            }else{
                res.json({ status: 'failed', message: 'setting  tidak berhasil di update ES-2' })
            }
        }
    }
    catch(err){
        res.json({status:'failed',message:err.message})
    }
}

exports.getData = (req,res)=>{
    webSetting.findAll().then(result => {
            res.json({ status: 'success', setting: result })

    }).catch(err => {
        res.json({ status: 'failed', message: err.message })
    })
}