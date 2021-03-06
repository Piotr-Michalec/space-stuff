const potdPath = "/potd";

let description = document.querySelector(".potd-description");
let photoOfTheDay = document.querySelector(".potd-img");
let title = document.querySelector(".potd-title");
let potdHref = document.querySelector(".a-potd");

let roverGallery = document.querySelector(".rover-image-gallery");
let roverImage = document.querySelector(".image-from-rover");

let roverDataSelector = document.querySelector(".rover-data-selector");

const curiosityBtn = document.querySelector("#curiosity-rover");
const opportunityBtn = document.querySelector("#opportunity-rover");
const spiritBtn = document.querySelector("#spirit-rover");

const fetchDataFromApi = async (path) => {
  let response = await fetch(path);
  let data = await response.json();
  return data;
};

//set nasa photo of the day to the div
/* let setPhotoOfTheDay = (data) => {
  description.textContent = data.nasaData.explanation;
  photoOfTheDay.src = data.nasaData.hdurl;
  potdHref.setAttribute("href", data.nasaData.hdurl);
  title.textContent = data.nasaData.title;
};
//fetch nasa photo of the day
const getPotd = async () => {
  const potdPath = "/potd";
  const potdData = await fetchDataFromApi(potdPath);
  setPhotoOfTheDay(potdData);
}; */
/*  */

// click rover button to choose rover, then fetch info like number of sol availible for choosen rover
// then pass parameters and get photos
const getRoverInfo = async (rover) => {
  //check availible data
  let roverInfoPath = `mars/info/?rover=${rover}`;
  let roverInfo = await fetchDataFromApi(roverInfoPath);
  console.log("rover info", roverInfo);
  return roverInfo;
};

//sol selector

let slider = document.querySelector(".sol-select-slider");

let selectBtn = document.querySelector(".button");

const selectRoverData = async (rover) => {
  let maxSol = await getRoverInfo(rover);
  //set max sol to the slider
  slider.max = maxSol.roverInfo-1000;
  slider.value = 1;
  let sol = 1000;
  let solVal = document.querySelector("#sol-value");
  let solMax = document.querySelector("#sol-max-value");
  let roverName = document.querySelector("#rover-name")
  solMax.innerHTML = slider.max;
  solVal.innerHTML = slider.value;
  roverName.innerHTML = rover
  slider.oninput = () => {
    solVal.innerHTML = ("Sol: ", slider.value);
    sol = slider.value;
  };
  getRoverData(rover,1000)
  selectBtn.addEventListener("click", () => getRoverData(rover, sol));
};

//get photos from rovers
const getRoverData = async (rover, sol) => {
  console.log('start loadnig')
  document.querySelector(".preloader-wrapper").style.display = 'block';
  let roverPath = `/mars/?sol=${sol}&rover=${rover}`;
  const roverData = await fetchDataFromApi(roverPath);
 
  console.log("rover data", roverData);
  setRoverData(roverData);
  console.log('finish loading')
  document.querySelector(".preloader-wrapper").style.display = 'none';
};

//create photo gallery
const setRoverData = (data) => {
  roverGallery.innerHTML = "";
  data.marsData.photos.forEach((item) => {
    let imageContainer = document.createElement("a");
    imageContainer.classList.add("rover-image-container");
    imageContainer.setAttribute("href", item.img_src);
    imageContainer.setAttribute("target", "_blank");
    let textOnImageMiddle = document.createElement("div");
    let textOnImage = document.createElement("div");
    textOnImage.setAttribute("class", "text-on-image");
    textOnImage.innerHTML = `<p> earth date ${item.earth_date}</p>`;
    textOnImageMiddle.setAttribute("class", "text-on-image-middle");

    /* imageContainer.innerHTML = `<p> earth date ${item.earth_date}</p> <p> sol ${item.sol}</p>`; */

    let image = document.createElement("IMG");
    image.classList.add("rover-image");
    image.src = item.img_src;
    roverGallery.appendChild(imageContainer);
    imageContainer.appendChild(image);
    //imageContainer.appendChild(textOnImageMiddle);
    //textOnImageMiddle.appendChild(textOnImage);
    window.scrollTo( 0,700);
  });
};

//getPotd();

curiosityBtn.addEventListener("click", () => {
  selectRoverData("curiosity");
});
opportunityBtn.addEventListener("click", () => {
  selectRoverData("opportunity");
});
spiritBtn.addEventListener("click", () => {
  selectRoverData("spirit");
});
