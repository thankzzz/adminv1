const Sequelize = require('sequelize');
const db = require('../database/database')
const account = require('./accountModel')
const user = db.define('tb_user_info',{
    id:{
        primaryKey:true,
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV1,   
    },
    fullname:{
        type: Sequelize.STRING(50),
        allowNull: true
    },
    address:{
        type:Sequelize.STRING(50),
        allowNull:true
    },
    phone:{
        type:Sequelize.STRING,
        allowNull: true
    },
    dateofbirth:{
        type:Sequelize.DATE,
        allowNull: true
    }
})
user.associate = (models)=>{
    user.belongsTo(account,{foreignKey:'fk_account_id',targetKey:'id',onDelete:'CASCADE'})
}

module.exports = user;