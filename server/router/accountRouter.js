const express = require('express');
const Router = express.Router();
const account = require('../controller/accountController')

Router.post('/create',account.signup)

Router.post('/signin',account.signin)

Router.delete('/delete/:id',account.delete)

Router.put('/change/password/:id',account.reset)

module.exports = Router