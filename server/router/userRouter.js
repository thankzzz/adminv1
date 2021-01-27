const express = require('express');
const Router = express.Router();
const user = require('../controller/userController')
const {isAuth} = require('../util')

//Read user Information
Router.get('/:id',isAuth,user.getData)

//Update user information
Router.put('/update/:id',user.update)

//get user last login and ip
Router.get('/agent/:id',user.getAgent)



module.exports = Router