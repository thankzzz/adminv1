const Sequelize = require('sequelize')
require('dotenv/config')

const sequelize = new Sequelize(process.env.DATABASE,process.env.DB_USER,'',{
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    pool: {
        max : 10,
        min : 0,
        acquire : 30000,
        idle : 10000
    },
    timezone: '+07:00',
})

const db = sequelize

module.exports = db;