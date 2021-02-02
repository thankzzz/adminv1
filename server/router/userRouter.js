const express = require('express');
const Router = express.Router();
const user = require('../controller/userController')
const {isAuth} = require('../util')

//Read user Information
Router.get('/data/:id',user.getData)

//Update user information
Router.put('/update/:id',user.update)

//get user last login and ip
Router.get('/agent/:id',user.getAgent)


Router.get('/history/:id',user.getHistory)


Router.get('/setting/:id',user.getSetting)

Router.put('/setting/update/:id',user.updateSetting)

module.exports = Router