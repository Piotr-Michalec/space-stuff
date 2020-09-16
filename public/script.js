const potdPath = "/potd";

let description = document.querySelector(".potd-description");
let photoOfTheDay = document.querySelector(".potd-img");
let title = document.querySelector(".potd-title");
let potdHref = document.querySelector(".a-potd");

let roverGallery = document.querySelector(".rover-image-gallery");
let roverImage = document.querySelector(".image-from-rover");

let roverDataSelector = document.querySelector('.rover-data-selector')

const curiosityBtn = document.querySelector("#curiosity-rover");
const opportunityBtn = document.querySelector("#opportunity-rover");
const spiritBtn = document.querySelector("#spirit-rover");

const fetchDataFromApi = async (path) => {
  let response = await fetch(path);
  let data = await response.json();
  return data;
};

//set nasa photo of the day to the div
let setPhotoOfTheDay = (data) => {
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
};
/*  */

// click rover button to choose rover, then fetch info then pass parameters and get photos
const getRoverInfo = async rover => {
  let roverInfoPath = `mars/info/?rover=${rover}`;
  let roverInfo = await fetchDataFromApi(roverInfoPath);
 return roverInfo
};

const selectRoverData = async rover =>{
//temporary
   //fetch rover info
    let roverInfo = await getRoverInfo(rover)
    //clear roverDataSelector div
    roverDataSelector.innerHTML=''
    //create OK button
    let selectBtn = document.createElement('button');
    selectBtn.setAttribute('content', 'text content')
    selectBtn.setAttribute('class', 'sel-btn')
    selectBtn.innerHTML = 'OK'
    roverDataSelector.appendChild(selectBtn)

    //create sol choosing slider

    let slider = document.createElement('input')
    slider.setAttribute('type','slider')

    roverDataSelector.appendChild(slider)
//////////////////////////////////////create slider
    //pass func getRoverData reference to the ok button
    selectBtn.addEventListener('click',()=>getRoverData(rover, roverInfo.roverInfo))


}

//get photos from rovers
const getRoverData = async (rover, sol) => {
  console.log('get rover', rover, sol)
  let roverPath = `/mars/?sol=${sol}&rover=${rover}`;
  const roverData = await fetchDataFromApi(roverPath);
  setRoverData(roverData);
};

//create photo gallery
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
  selectRoverData("curiosity");
});
opportunityBtn.addEventListener("click", () => {
  selectRoverData("opportunity");
});
spiritBtn.addEventListener("click", () => {
  selectRoverData("spirit");
}); //tu przekazać rover
