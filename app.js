const express = require('express')
const app = express()
const port = 8080

const dotenv = require('dotenv').config()
const path = require('path')
const { response } = require('express')

const NASA_API_KEY = `${process.env.NASA_API}`
//nasa photo of the day
const NASA_APOD = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
const fetch = require("node-fetch");





app.use(express.static(path.join(__dirname, 'public')))


app.set('view engine' , 'ejs')

//fetch data from api, pass the url as an argument
const FetchDataFromApi = async uri =>{
       let response = await fetch(uri)
       let data = await response.json()
       return data
}

//fetch photo of the day from nasa api
app.get('/' ,async (req,res)=>{
    let nasaData = await FetchDataFromApi(NASA_APOD)
    res.render('index', {nasaData: nasaData})
    console.log('app get',nasaData)
})

//fetch data
app.get('/admin' , (req,res)=>{
    //call FetchDataFromAPi here and pass url as an argument
    res.render('adminpanel')
})



app.listen(port,()=>{
    console.log(`listening on ${port}`)
})