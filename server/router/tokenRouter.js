const express = require('express');
const Router = express.Router();
const token = require('../controller/tokenController')
const {isAuth} = require('../util')

Router.post('/token',token.auth)



module.exports = Router