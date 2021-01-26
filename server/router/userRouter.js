const express = require('express');
const Router = express.Router();
const user = require('../controller/userController')
const {isAuth} = require('../util')

Router.get('/:id',isAuth,user.getData)

Router.put('/update/:id',user.update)


module.exports = Router