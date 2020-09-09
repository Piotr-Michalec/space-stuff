const express = require('express')
const marsRouter = require('./routes/mars')
const testRouter = require('./routes/test')
const photoOfTheDayRouter = require('./routes/potd')


const app = express()
const port = 8080

const dotenv = require('dotenv').config()
const path = require('path')
const { response } = require('express')



const fetch = require("node-fetch");



app.use(express.static(path.join(__dirname, 'public')))



app.set('view engine' , 'ejs')


app.use('/mars', marsRouter)
app.use('/test', testRouter)
app.use('/potd', photoOfTheDayRouter)


app.listen(port,()=>{
    console.log(`listening on ${port}`)
})