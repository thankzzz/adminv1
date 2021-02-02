const Sequelize = require('sequelize');
const db = require('../database/database')
const account = require('./accountModel')
const moment = require('moment')
const user = db.define('tb_user_info',{
    id:{
        primaryKey:true,
        type:Sequelize.INTEGER,
        autoIncrement:true 
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
    last_country:{
        type:Sequelize.STRING(20),
        allowNull:true
    },
    last_city:{
        type:Sequelize.STRING(50),
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
        type:Sequelize.STRING,
        allowNull:true,
    }
})

const user_setting = db.define('tb_user_setting',{
    id:{
        primaryKey:true,
        type:Sequelize.INTEGER,
        autoIncrement:true
    },
    store_activity:{
        type:Sequelize.BOOLEAN,
        allowNull:true,
    }
})
user_setting.associate = (models)=>{
    user_setting.belongsTo(account,{foreignKey:'fk_account_id',targetKey:'id',onDelete:'CASCADE'})
}
user_history.associate = (models)=>{
    user_history.belongsTo(account,{foreignKey:'fk_account_id',targetKey:'id',onDelete:'CASCADE'})
}
user_login.associate = (models)=>{
    user_login.belongsTo(account,{foreignKey:'fk_account_id',targetKey:'id',onDelete:'CASCADE'})
}
user.associate = (models)=>{
    user.belongsTo(account,{foreignKey:'fk_account_id',targetKey:'id',onDelete:'CASCADE'})
}

module.exports = {user,user_login,user_history,user_setting};