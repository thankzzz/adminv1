const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
const tb_token =require('./model/refreshTokenModel')
require('dotenv/config')

const getToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.username,
      email: user.email,
      role: user.role,
      updatedAt:user.updatedAt
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '15s'
    }
  );
};
const getRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.username,
      email: user.email,
      role: user.role,
      updatedAt:user.updatedAt
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: '4h'
    }
  );
};
const isAuth = async(req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader.slice(6,authHeader.length)
  if(token == null )return res.sendStatus(401)
  jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{ 
    if(err){
      
    return res.sendStatus(401)}
    req.user = user.id
    next()
  })
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ message: 'Admin Token is not valid.' });
};  

module.exports = { getToken, isAuth, isAdmin ,getRefreshToken};
