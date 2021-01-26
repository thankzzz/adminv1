const Sequelize = require('sequelize');
const db = require('../database/database')
const user = require('./userModel')
const account = db.define('tb_account',{
    id:{
        primaryKey:true,
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV1,   
    },
    username:{
        type: Sequelize.STRING(50),
        allowNull: false
    },
    email:{
        type:Sequelize.STRING(50),
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull: false
    },
    role:{
        type:Sequelize.STRING(20),
        allowNull: false
    },
    status:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    }
})



account.hasMany(user,{foreignKey:'fk_account_id',sourceKey:'id',onDelete:'CASCADE'})

module.exports = account;