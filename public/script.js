

const potdPath = '/potd'
const curiosityRoverPath = '/mars/curiosity'
const opportunityRoverPath = '/mars/opportunity'
const spiritRoverPath = '/mars/spirit'

let description = document.querySelector('.potd-description')
let photoOfTheDay=document.querySelector('.potd-img')
let title = document.querySelector('.potd-title')

let roverGallery = document.querySelector('.rover-image-gallery')
let roverImage = document.querySelector('.image-from-rover')

/* const getData =()=>{
    fetch('/potd')
      .then((res)=>res.json())
      .then((data)=>setPhotoOfTheDay(data))
} */

const fetchDataFromApi = async (path) =>{
    let response = await fetch(path)
    let data = await response.json()
    return data
}


const curiosityBtn = document.querySelector('.curiosity-rover')
const opportunityBtn = document.querySelector('.opportunity-rover')
const spiritBtn = document.querySelector('.spirit-rover')





//get nasa photo of the day
let setPhotoOfTheDay = data =>{
   description.textContent =  data.nasaData.explanation
   photoOfTheDay.src=data.nasaData.hdurl
   title.textContent=data.nasaData.title
}

const getPotd = async ()=>{
    const potdPath = '/potd'
    const potdData = await fetchDataFromApi(potdPath)
   setPhotoOfTheDay(potdData)
}

//get photos from rovers
const getRoverData = async rover =>{
     const roverData = await fetchDataFromApi(rover)
     setRoverData(roverData)
   
       let image = document.createElement('IMG')
       image.setAttribute("src", "https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01002/opgs/edr/fcam/FRB_486444942EDR_F0481570FHAZ00323M_.JPG")
image.setAttribute("width", "304");
  image.setAttribute("height", "228");
  image.setAttribute("alt", "The Pulpit Rock");
       document.body.appendChild(image) 
}


 const setRoverData = data =>{
    data.marsData.photos.forEach((item)=>{
        console.log(item.img_src)
    
       let imageContainer = document.createElement('div')
     

      

       imageContainer.innerHTML = `<p>${item.id}</p>`;
       
       roverGallery.appendChild(imageContainer);
        
        
    })
    
}

const create = () =>{
    
}



getPotd();

curiosityBtn.addEventListener('click',()=>{getRoverData(curiosityRoverPath)})
opportunityBtn.addEventListener('click',()=>{getRoverData(opportunityRoverPath)})
spiritBtn.addEventListener('click',()=>{getRoverData(spiritRoverPath)})