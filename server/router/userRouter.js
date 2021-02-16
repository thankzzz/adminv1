const express = require('express');

const Router = express.Router();
const user = require('../controller/userController')
const {isAuth} = require('../util')

// User_login
Router.post('/signup',user.signup)

Router.post('/signin',user.signin)

Router.post('/signout',user.signout)

//Read user Information
Router.get('/',isAuth,user.getData)
//Update user information
Router.put('/update/',isAuth,user.update)


//Read user Profile Image
Router.get('/profile/image',isAuth,user.getProfileImage)
//update user profile image
Router.put('/upload/profile/image',isAuth,user.uploadImage)


//get user last login and ip
Router.get('/agent/',isAuth,user.getAgent)

Router.put('/agent/login-session/update',isAuth,user.updateAgent_login_session)


// Router.delete('/delete/:id',user.delete)
Router.put('/change/password',isAuth,user.changePassword)


Router.get('/history',isAuth,user.getHistory)

Router.post('/history/create',user.createHistory)

Router.get('/setting',isAuth,user.getSetting)

Router.put('/setting/update',isAuth,user.updateSetting)

module.exports = Router