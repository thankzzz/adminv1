const express = require('express');
const Router = express.Router();
const {isAuth} = require('../util')
const setting = require('../controller/webSettingController')


Router.get("/",setting.getData)

module.exports = Router