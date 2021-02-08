const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')

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
      expiresIn: '3h'
    }
  );
};

const isAuth = async(req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader.slice(6,authHeader.length)
  if(token == null )return res.sendStatus(401)
  jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{ 
    if(err){
    return res.sendStatus(403)}
    req.user = user
    next()
  })
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ message: 'Admin Token is not valid.' });
};  

module.exports = { getToken, isAuth, isAdmin };
