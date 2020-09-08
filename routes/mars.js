const express = require('express')
const router = express.Router()
const fetch = require("node-fetch");
const dotenv = require('dotenv').config()



const NASA_API_KEY = `${process.env.NASA_API}`



const urlBuilder = async roverName=>{
   
    let MarsRoversPhotosUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=1002&api_key=${NASA_API_KEY}` 
   
    return MarsRoversPhotosUrl;
}

//fetch data from api, pass the url as an argument
const FetchDataFromApi = async (url, rover) =>{
    let response = await fetch(url)
    let data = await response.json()
    return data
}


//fetch data
router.get('/' , async (req,res)=>{
    //change variable names
    //call FetchDataFromAPi here and pass url as an argument
    const roverName = 'opportunity'
    let url = await urlBuilder(roverName)
    let marsData = await FetchDataFromApi(url)
    res.render('mars', {marsData:marsData})
}) 
 
router.get('/spirit' , async (req,res)=>{
    //change variable names
    //call FetchDataFromAPi here and pass url as an argument
    const roverName = 'spirit'
    let url = await urlBuilder(roverName)
    let marsData = await FetchDataFromApi(url)
    console.log(req)
    res.render('mars', {marsData:marsData})
}) 
router.get('/curiosity' , async (req,res)=>{
    //change variable names
    //call FetchDataFromAPi here and pass url as an argument
    const roverName = 'curiosity'
    let url = await urlBuilder(roverName)
    let marsData = await FetchDataFromApi(url)
    res.render('mars', {marsData:marsData})
}) 
 

module.exports = router