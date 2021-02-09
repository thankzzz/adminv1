const express = require('express');

const Router = express.Router();
const user = require('../controller/userController')
const {isAuth} = require('../util')

//Read user Information
Router.get('/',isAuth,user.getData)

//Update user information
Router.put('/update/',isAuth,user.update)

Router.put('/upload/:id',user.uploadImage)

//get user last login and ip
Router.get('/agent/',isAuth,user.getAgent)

Router.put('/agent/login-session/update/:id',user.updateAgent_login_session)

Router.get('/history/:id',user.getHistory)

Router.post('/history/create',user.createHistory)

Router.get('/setting/:id',user.getSetting)

Router.put('/setting/update/:id',user.updateSetting)

module.exports = Router