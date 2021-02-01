const Sequelize = require('sequelize');
const db = require('../database/database')
const account = require('./accountModel')
const moment = require('moment')
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
const user_login = db.define('tb_user_login_info',{
    id:{
        primaryKey:true,
        type:Sequelize.INTEGER,
        autoIncrement:true
    },
    last_login:{
        type:Sequelize.DATE,
        allowNull:true,
    },
    last_ip:{
        type:Sequelize.STRING,
        allowNull:true
    },
    online:{
        type:Sequelize.BOOLEAN,
        allowNull:true
    }
})
const user_history = db.define('tb_user_history',{
    id:{
        primaryKey:true,
        type:Sequelize.INTEGER,
        autoIncrement:true
    },
    history:{
        type:Sequelize.DATE,
        allowNull:true,
    }
})
user_history.associate = (models)=>{
    user_login.belongsTo(account,{foreignKey:'fk_account_id',targetKey:'id',onDelete:'CASCADE'})
}
user_login.associate = (models)=>{
    user_login.belongsTo(account,{foreignKey:'fk_account_id',targetKey:'id',onDelete:'CASCADE'})
}
user.associate = (models)=>{
    user.belongsTo(account,{foreignKey:'fk_account_id',targetKey:'id',onDelete:'CASCADE'})
}

module.exports = {user,user_login,user_history};