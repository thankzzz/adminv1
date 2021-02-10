const Sequelize = require('sequelize');
const db = require('../database/database')



const user_login = db.define('tb_user_login',{
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
const user_info = db.define('tb_user_info',{
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
const user_agent = db.define('tb_user_agent',{
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
const user_image = db.define('tb_user_profile_image',{
    id:{
        primaryKey:true,
        type:Sequelize.INTEGER,
        autoIncrement:true 
    },
    image_file:{
        type:Sequelize.BLOB,
        allowNull:true
    },
    image_name:{
        type:Sequelize.STRING,
        allowNull:true
    },
})

user_login.hasOne(user_info,{foreignKey:'fk_account_id',sourceKey:'id',onDelete:'CASCADE'})
user_login.hasOne(user_setting,{foreignKey:'fk_account_id',sourceKey:'id',onDelete:'CASCADE'})
user_login.hasOne(user_agent,{foreignKey:'fk_account_id',sourceKey:'id',onDelete:'CASCADE'})
user_login.hasMany(user_history,{foreignKey:'fk_account_id',sourceKey:'id',onDelete:'CASCADE'})
user_login.hasOne(user_image,{foreignKey:'fk_account_id',sourceKey:'id',onDelete:'CASCADE'})


user_info.associate = ()=>{
    user_info.belongsTo(user_login,{foreignKey:'fk_account_id',targetKey:'id',onDelete:'CASCADE'})
}
user_setting.associate = ()=>{
    user_setting.belongsTo(user_login,{foreignKey:'fk_account_id',targetKey:'id',onDelete:'CASCADE'})
}
user_history.associate = ()=>{
    user_history.belongsTo(user_login,{foreignKey:'fk_account_id',targetKey:'id',onDelete:'CASCADE'})
}

user_agent.associate = ()=>{
    user_agent.belongsTo(user_login,{foreignKey:'fk_account_id',targetKey:'id',onDelete:'CASCADE'})
}
user_image.associate = ()=>{
    user_image.belongsTo(user_login,{foreignKey:'fk_account_id',targetKey:'id',onDelete:'CASCADE'})
}

module.exports = {user_info,user_agent,user_login,user_history,user_setting,user_image};