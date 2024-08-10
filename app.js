const morgan = require('morgan')
const cors = require('cors')
const express = require('express')
const registerRoutes = require('./routes/registerRoutes')
const passwordResetRoutes = require('./routes/passwordResetRoutes')
const urlRoutes = require('./routes/urlRoutes')
const loginRoutes = require('./routes/loginRoutes')

const app = express()

//define routes service

//middleware to all cross-origin requests from any domain
app.use(cors())

//middleware to parse the request body
app.use(express.json())

//middleware to log the request
app.use(morgan('dev'))

//define endpoints
app.use('/', registerRoutes);
app.use('/', passwordResetRoutes);
app.use('/', urlRoutes);
app.use('/', loginRoutes);



app.get('/',(req,res)=>{
    res.send("This is a URL Shortner module")
})

module.exports = app
