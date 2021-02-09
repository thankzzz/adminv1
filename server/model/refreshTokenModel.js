const Sequelize = require('sequelize');
const db = require('../database/database')


const refreshToken = db.define('tb_refresh_token',{
    id:{
        primaryKey:true,
        type:Sequelize.INTEGER,
        autoIncrement:true
    },
    refresh_token:{
        type: Sequelize.STRING(),
        allowNull: true
    },
})

module.exports = {refreshToken}