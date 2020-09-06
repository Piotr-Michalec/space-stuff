const express = require('express')
const router = express.Router()
const fetch = require("node-fetch");
const dotenv = require('dotenv').config()

const RoverName = 'opportunity'

const NASA_API_KEY = `${process.env.NASA_API}`

const MarsRoversPhotos = `https://api.nasa.gov/mars-photos/api/v1/rovers/${RoverName}/photos?sol=1001&api_key=${NASA_API_KEY}` 


//fetch data from api, pass the url as an argument
const FetchDataFromApi = async uri =>{
    let response = await fetch(uri)
    let data = await response.json()
    return data
}


//fetch data
router.get('/' , async (req,res)=>{
    //change variable names
    //call FetchDataFromAPi here and pass url as an argument
    let marsData = await FetchDataFromApi(MarsRoversPhotos)
    res.render('mars', {marsData:marsData})
}) 


module.exports = router