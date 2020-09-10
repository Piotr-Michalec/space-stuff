const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const dotenv = require("dotenv").config();

const NASA_API_KEY = `${process.env.NASA_API}`;
//nasa photo of the day
const NASA_APOD = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

//fetch data from api, pass the url as an argument
const FetchDataFromApi = async (uri) => {
  let response = await fetch(uri);
  let data = await response.json();
  return data;
};

//fetch photo of the day from nasa api
router.get("/", async (req, res) => {
  try {
    let nasaData = await FetchDataFromApi(NASA_APOD);
    console.log("req", req.params);
    res.send({ nasaData: nasaData });
  } catch {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
