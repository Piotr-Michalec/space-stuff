const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const dotenv = require("dotenv").config();

//manifest https://api.nasa.gov/mars-photos/api/v1/manifests/Curiosity/?api_key=

const NASA_API_KEY = `${process.env.NASA_API}`;

const urlBuilder = async (roverName, sol) => {
  let MarsRoversPhotosUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=${sol}&api_key=${NASA_API_KEY}`;
  return MarsRoversPhotosUrl;
};

//fetch data from api, pass the url as an argument
const FetchDataFromApi = async (url) => {
  let response = await fetch(url);
  let data = await response.json();
  return data;
};

//fetch data
router.get("/", async (req, res) => {
  try {
    let rover = req.query.rover;
    let sol = req.query.sol;
    let url = await urlBuilder(rover, sol);
    let marsData = await FetchDataFromApi(url);
    res.send({ marsData: marsData });
  } catch {
    res.json({ message: err });
  }
});

module.exports = router;
