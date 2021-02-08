const Sequelize = require('sequelize');
const db = require('../database/database')


const blacklistToken = db.define('tb_blacklist_token',{
    id:{
        primaryKey:true,
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV1,   
    },
    blacklist_token:{
        type: Sequelize.STRING(),
        allowNull: true
    },
})

module.exports= blacklistToken