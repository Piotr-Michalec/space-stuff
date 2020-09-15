const potdPath = "/potd";

let description = document.querySelector(".potd-description");
let photoOfTheDay = document.querySelector(".potd-img");
let title = document.querySelector(".potd-title");
let potdHref = document.querySelector(".a-potd");

let roverGallery = document.querySelector(".rover-image-gallery");
let roverImage = document.querySelector(".image-from-rover");

let setSolBtn = document.querySelector(".set-sol");

const fetchDataFromApi = async (path) => {
  let response = await fetch(path);
  let data = await response.json();
  return data;
};

const curiosityBtn = document.querySelector("#curiosity-rover");
const opportunityBtn = document.querySelector("#opportunity-rover");
const spiritBtn = document.querySelector("#spirit-rover");

//get nasa photo of the day
let setPhotoOfTheDay = (data) => {
  description.textContent = data.nasaData.explanation;
  photoOfTheDay.src = data.nasaData.hdurl;
  potdHref.setAttribute("href", data.nasaData.hdurl);
  title.textContent = data.nasaData.title;
};

const getPotd = async () => {
  const potdPath = "/potd";
  const potdData = await fetchDataFromApi(potdPath);
  setPhotoOfTheDay(potdData);
};
/*  */

// click rover button to choose rover, then fetch info then pass parameters and get photos
const getRoverInfo = async () => {
  console.log("klik");
  let roverInfoPath = `mars/info`;
  let roverInfo = await fetchDataFromApi(roverInfoPath);
  console.log("rower info", roverInfo);
};

//get photos from rovers
const getRoverData = async (rover, sol) => {
  let roverPath = `/mars/?sol=${sol}&rover=${rover}`;
  const roverData = await fetchDataFromApi(roverPath);
  setRoverData(roverData);
};

const setRoverData = (data) => {
  roverGallery.innerHTML = "";
  data.marsData.photos.forEach((item) => {
    let imageContainer = document.createElement("a");
    imageContainer.classList.add("rover-image-container");
    imageContainer.setAttribute("href", item.img_src);
    imageContainer.setAttribute("target", "_blank");
    imageContainer.innerHTML = `<p> id ${item.id}</p>`;
    imageContainer.innerHTML = `<p> earth date ${item.earth_date}</p> <p> sol ${item.sol}</p>`;

    roverGallery.appendChild(imageContainer);
    let image = document.createElement("IMG");
    image.classList.add("rover-image");
    image.src = item.img_src;
    imageContainer.appendChild(image);
  });
};

getPotd();

curiosityBtn.addEventListener("click", () => {
  getRoverData("curiosity", 1000);
});
opportunityBtn.addEventListener("click", () => {
  getRoverData("opportunity", 1090);
});
spiritBtn.addEventListener("click", () => {
  getRoverData("spirit", 2000);
}); //tu przekazać rover
setSolBtn.addEventListener("click", () => {
  getRoverInfo();
});
