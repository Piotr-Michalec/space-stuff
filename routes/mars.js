const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const dotenv = require("dotenv").config();

const NASA_API_KEY = `${process.env.NASA_API}`;

const urlBuilder = async (roverName, sol) => {
  let MarsRoversPhotosUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=${sol}&api_key=${NASA_API_KEY}`;
  return MarsRoversPhotosUrl;
};

const getRoverDetails = async (rover) => {
  //change name
  //get number of sol availible and chose one
  const manifestUrl = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}/?api_key=${NASA_API_KEY}`;
  let maxSol = await FetchDataFromApi(manifestUrl);
  return maxSol.photo_manifest.max_sol;
};

//fetch data from api, pass the url as an argument
const FetchDataFromApi = async (url) => {
  let response = await fetch(url);
  let data = await response.json();
  return data;
};

const fetchMarsData = async (rover, sol) => {
  let url = await urlBuilder(rover, sol);
  return await FetchDataFromApi(url);
};
//fetch availible parameters
router.get("/info", async (req, res) => {
  try {
    let roverInfo = await getRoverDetails(req.query.rover);
    res.send({ roverInfo: roverInfo });
  } catch {
    res.json({ message: err });
  }
});

//fetch data
router.get("/", async (req, res) => {
  try {
    let rover = req.query.rover;
    let sol = req.query.sol;
    let marsData = await fetchMarsData(rover, sol);
    res.send({ marsData: marsData });
  } catch {
    res.json({ message: err });
  }
});

module.exports = router;
