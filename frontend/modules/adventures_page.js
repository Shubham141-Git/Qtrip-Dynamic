
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

const urlParam = new URLSearchParams(search)
//console.log( urlParam.get("city"))
  return urlParam.get("city")
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data

 // console.log(city)
try{
  const data= await fetch(config.backendEndpoint+`/adventures?city=${city}`);
  const response = await data.json() ;
//console.log(response)
  return response
}
catch{
  return null
}

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
//console.log(adventures)
  adventures.map((e)=>{

    const parent = document.getElementById("data");

    //creating container
    const container = document.createElement("div");
  container.setAttribute("class" , "col-lg-3 col-6 mb-3 position-relative");

//creating the anchor tag
    const anhrTag = document.createElement("a")
    
    anhrTag.setAttribute("id" , e.id)
    anhrTag.setAttribute("href"  , `detail/?adventure=`+e.id)

  

  const card = document.createElement("div");
  card.setAttribute("class" , "activity-card  ");

 

  const img = document.createElement("img");
  img.setAttribute("src" ,e.image );
 // img.setAttribute("class" ,"card-img-top" );

 const div = document.createElement("div");
 div.setAttribute("class" , "d-flex justify-content-between p-2");

 const name = document.createElement("h6");
 name.innerText= e.name;
 

 const cost = document.createElement("h6");
 cost.innerText = e.costPerHead +" "+  e.currency;

 
 const div2 = document.createElement("div");
 div2.setAttribute("class" , "d-flex justify-content-between p-2");

const durtn = document.createElement("h6");
durtn.innerText = "Duration";

const time = document.createElement("h6");
time.innerText = e.duration + " hours"

const catgry = document.createElement("div");
catgry.setAttribute("class" , "category-banner");

const text = document.createElement("span");
text.innerText = e.category;


  



  

 

catgry.appendChild(text)  
card.appendChild(catgry)

 div.appendChild(name);
 div.appendChild(cost);
div2.appendChild(durtn)
 div2.appendChild(time)
card.appendChild(img)
card.appendChild(div)
card.appendChild(div2)

anhrTag.appendChild(card)
container.appendChild(anhrTag)
  parent.appendChild(container);

  })

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

  let filterDuratn = list.filter((e) => {
return(e.duration >=low && e.duration<=high) 

  })

 
  return filterDuratn
   
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list;
//categoryList = [ cylcing , hillside  ]  

  let newList = list.filter((e)=>{

    return categoryList.includes(e.category)
})


 return newList;
  
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods



  let filteredlist =[]
  let arr=filters["duration"].split("-")


if(filters["category"].length>0&&filters["duration"].length>0){

 filteredlist=filterByCategory(list,filters.category)
 filteredlist=filterByDuration(filteredlist,parseInt(arr[0]),parseInt(arr[1]))
}else if(filters["category"].length>0){
  filteredlist=filterByCategory(list,filters.category);
}else if(filters["duration"].length>0){
 filteredlist=filterByDuration(list,parseInt(arr[0]),parseInt(arr[1]))
}else{
  return list;
}

 return filteredlist
  


}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  return window.localStorage.setItem("filters", JSON.stringify(filters));
   
  
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
   return JSON.parse(window.localStorage.getItem('filters'));
  
  
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value-
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

  filters["category"].map((e)=>{

const parent = document.getElementById("category-list");
 const child  = document.createElement("div");
 child.setAttribute("class" , "category-filter");

 child.innerText= e

 parent.appendChild(child)


})



}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
