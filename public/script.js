 const sol = '1050'//zrobic sol i musi zwracac bład jeśli nieprawidłowy

const potdPath = '/potd'

let description = document.querySelector('.potd-description')
let photoOfTheDay=document.querySelector('.potd-img')
let title = document.querySelector('.potd-title')
let potdHref = document.querySelector('.a-potd')

let roverGallery = document.querySelector('.rover-image-gallery')
let roverImage = document.querySelector('.image-from-rover')


const fetchDataFromApi = async (path) =>{
    let response = await fetch(path)
    let data = await response.json()
    return data
}


const curiosityBtn = document.querySelector('#curiosity-rover')
const opportunityBtn = document.querySelector('#opportunity-rover')
const spiritBtn = document.querySelector('#spirit-rover')

//get nasa photo of the day
let setPhotoOfTheDay = data =>{
   description.textContent =  data.nasaData.explanation
   photoOfTheDay.src=data.nasaData.hdurl
   potdHref.setAttribute('href',data.nasaData.hdurl )
   title.textContent=data.nasaData.title
}

const getPotd = async ()=>{
    const potdPath = '/potd'
    const potdData = await fetchDataFromApi(potdPath)
   setPhotoOfTheDay(potdData)
}

//get photos from rovers
const getRoverData = async (rover, sol)=>{
    let roverPath = `/mars/?sol=${sol}&rover=${rover}`
     const roverData = await fetchDataFromApi(roverPath)
     setRoverData(roverData)
 
}


 const setRoverData = data =>{
     roverGallery.innerHTML=''
     data.marsData.photos.forEach((item)=>{
        console.log('item',item)
    
       let imageContainer = document.createElement('a')
           imageContainer.classList.add('rover-image-container')
           imageContainer.setAttribute('href',item.img_src )
           imageContainer.setAttribute('target', '_blank')
           imageContainer.innerHTML = `<p> id ${item.id}</p>`;
           imageContainer.innerHTML = `<p> earth date ${item.earth_date}</p> <p> sol ${item.sol}</p>`;
      
       roverGallery.appendChild(imageContainer);
       let image = document.createElement('IMG')
         image.classList.add('rover-image')
         image.src = item.img_src
         imageContainer.appendChild(image)
    }) 
}


getPotd();

curiosityBtn.addEventListener('click',()=>{getRoverData('curiosity',sol)})
opportunityBtn.addEventListener('click',()=>{getRoverData('opportunity',sol)})
spiritBtn.addEventListener('click',()=>{getRoverData('spirit',sol)})//tu przekazać rover