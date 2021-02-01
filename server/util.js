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
      expiresIn: '48h',
    }
  );
};

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    console.log(token)
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid Token' });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ message: 'Token is not supplied.' });
  }
};

const isAdmin = (req, res, next) => {
 
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ message: 'Admin Token is not valid.' });
};  

module.exports = { getToken, isAuth, isAdmin };
