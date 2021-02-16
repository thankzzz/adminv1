const Sequelize = require('sequelize');
const db = require('../database/database')


const webSettings = db.define('tb_web_settings',{
    id:{
        primaryKey:true,
        type:Sequelize.INTEGER,
        autoIncrement:true
    },
    site_name:{
        type: Sequelize.STRING,
        allowNull: true,
  
    },
    site_email:{
        type:Sequelize.STRING,
        allowNull:true,
        
    },
    site_address:{
        type:Sequelize.STRING,
        allowNull:true,
       
    },
    site_phone1:{
        type:Sequelize.STRING,
        allowNull:true,
        
    },
    site_phone2:{
        type:Sequelize.STRING,
        allowNull:true,
        
    },
    site_copyright:{
        type:Sequelize.STRING,
        allowNull:true,
       
    },
    main_web:{
        type:Sequelize.STRING,
        allowNull:true,
      
    },
    allow_regiS:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:false
    },
    price_show:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:false,

    },
    maintenance:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:false,
    }
})

module.exports = webSettings