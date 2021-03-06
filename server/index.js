const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./database/database')
const cookieParser = require('cookie-parser')
const {user,token,setting} = require('./router/router')
db.sync({force:false});
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    preflightContinue: false,
    credentials:false
  } 
app.use(cors());
  
app.use('/api/user',cors(corsOptions),user)
app.use('/api/auth',cors(corsOptions),token)
app.use('/api/setting',cors(corsOptions),setting)
app.listen('8080',()=>{
    console.log('koneksi ke server berhasil')
})