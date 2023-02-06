import config from "../conf/index.js";

async function init() {
  //console.log("From init()");
  //console.log("http://3.6.197.170:8082/cities")

 

  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });

  
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
try{
  const data = await fetch(config.backendEndpoint+"/cities");

  const response = await data.json();
//console.log(response);
  return response;
}
catch{
  return null
  
}

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

  const parent = document.getElementById("data");

//Setting responsive column
  const container = document.createElement("div");
  container.className = "col-lg-3 col-6  col-md-6 mb-2";

  //Anchor tag
 const a = document.createElement("a");
a.setAttribute("id" , id);
a.setAttribute("href" , `pages/adventures/?city=${id}`);

//creting div for image

const imgContainer = document.createElement("div");
imgContainer.setAttribute("class"  , "tile");

const img = document.createElement("img");
img.setAttribute("src" , image);


//creting div for city and description

const descContainer = document.createElement("div");
descContainer.setAttribute("class" , "tile-text");
//creting ele for city
const cityName=document.createElement("h6");
cityName.innerText=city;

//creting ele for desc

const desc = document.createElement("p");
desc.innerText = description;


descContainer.appendChild(cityName);
descContainer.appendChild(desc);



imgContainer.appendChild(descContainer)
imgContainer.appendChild(img );
a.appendChild(imgContainer);
container.appendChild(a);
  parent.appendChild(container);

  

  
  

}

export { init, fetchCities, addCityToDOM };
