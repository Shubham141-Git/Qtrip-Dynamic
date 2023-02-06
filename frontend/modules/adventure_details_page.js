import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
try{
  const idParam = new URLSearchParams(search);
//console.log(idParam.get("adventure"))

return idParam.get("adventure")
}

  // Place holder for functionality to work in the Stubs
  catch{
  return null;
  }
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
try{
 const req = await fetch(config.backendEndpoint+`/adventures/detail?adventure=${adventureId}`);

 const response = await req.json();

//console.log(response)

 return response

}

  // Place holder for functionality to work in the Stubs
  catch{
    return null;
  }
 
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  

  ///HEADER SECTION
const parent = document.getElementById("data");

  const adventureName = document.getElementById("adventure-name");
  adventureName.innerHTML=adventure.name

  const subtitle = document.getElementById("adventure-subtitle");
  subtitle.innerHTML=adventure.subtitle

parent.appendChild(adventureName);
parent.appendChild(subtitle);



//PHTOT SECTION

 const photoGalleryDiv= document.getElementById("photo-gallery")

adventure.images.forEach((e)=>{
   const photoDiv = document.createElement("div");
photoDiv.setAttribute("class" , "activity-card-image")

const div=document.createElement("div");
div.setAttribute("style" , "height:100% ; width:100%");

const imgDiv = document.createElement("img");
imgDiv.setAttribute("src" , e)
imgDiv.setAttribute("style" , "height:100% ; width:100%");


photoGalleryDiv.append(photoDiv);
photoDiv.append(div);
div.append(imgDiv);

})

//About experience

const adventureContent = document.getElementById("adventure-content")
adventureContent.innerText =adventure.content;




}


//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

  const photoGalleryDiv= document.getElementById("photo-gallery");

  photoGalleryDiv.innerHTML=`<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="carousel-inner">
   
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`

   //const carouselInner = document.getElementById("carousel-inner");
 
   images.forEach((img, indx) => {
    const imgDiv = document.createElement("div");

    if (indx === 0) {
      imgDiv.setAttribute("class", "carousel-item active");
    } else {
      imgDiv.setAttribute("class", "carousel-item ");
    }

    imgDiv.innerHTML = `<img src=${img} class="d-block w-100" alt="...">`;

    const corouselInner = document.getElementById("carousel-inner");

    corouselInner.append(imgDiv);
  });

 

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

 if(adventure.available===true){

   

  const costPerPerson = document.getElementById("reservation-person-cost");
  costPerPerson.innerHTML=adventure.costPerHead


const avail = document.getElementById("reservation-panel-available")
avail.setAttribute("style" , "display:block")

const reservtn = document.getElementById("reservation-panel-sold-out")
reservtn.setAttribute("style" , "display:none")

 }
 else{

  

  const avail = document.getElementById("reservation-panel-available")
  avail.setAttribute("style" , "display:none")
  
  const reservtn = document.getElementById("reservation-panel-sold-out")
  reservtn.setAttribute("style" , "display:block")


 }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const cost = document.getElementById("reservation-cost");

  const perHeadCost = adventure.costPerHead;

  cost.innerHTML=perHeadCost*persons

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".


const form = document.getElementById("myForm");


// async function postCall(obj){

//   const request = await fetch(config.backendEndpoint+`/reservations/new`,{
  
//     method:"POST",
//     body:JSON.stringify(obj),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8"
//     }
//   });
  
//   const response = await request.json();
  
//   return response;
  
  
//       }
  

form.addEventListener("submit" , (e)=>{
  
 e.preventDefault();

 

  const data = {
    name:form.elements["name"].value,
    date:form.elements["date"].value,
    person:form.elements["person"].value,
    adventure:adventure.id
}

 

const response =   fetch(config.backendEndpoint+`/reservations/new` , {
method:"POST",
body:JSON.stringify(data),
headers: {
         "Content-type": "application/json; charset=UTF-8"
     }
    
  });




 



})


}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
//console.log(adventure)
  if(adventure.reserved ===true){

    document.getElementById("reserved-banner").setAttribute("style" , "display:block")
  }
  else{
    document.getElementById("reserved-banner").setAttribute("style" , "display :none")
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
