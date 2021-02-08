const express = require('express');
const Router = express.Router();
const token = require('../controller/tokenController')

Router.post('/create',token.create)



module.exports = Router