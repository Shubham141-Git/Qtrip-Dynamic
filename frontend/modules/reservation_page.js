import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
try{
  const data = await  fetch(config.backendEndpoint+"/reservations/")
  const response =await data.json()

  return response;

}
catch{
  return null
}
  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

//console.log(reservations)

if(reservations.length > 0){

  const noReservationBanner = document.getElementById("no-reservation-banner");
  noReservationBanner.setAttribute("style" , "display:none")
  
  const reservationParent = document.getElementById("reservation-table-parent");
  reservationParent.setAttribute("style","display:block")

}

else  {

  const noReservationBanner = document.getElementById("no-reservation-banner");
  noReservationBanner.setAttribute("style" , "display:block");


  const reservationParent = document.getElementById("reservation-table-parent");
  reservationParent.setAttribute("style","display:none");


}

reservations.map((e)=>{

  const reservationTable = document.getElementById("reservation-table");

  const row = document.createElement("tr");

  let time = new Date(e.time)
  let date = time.getDate();
  let year = time.getFullYear();
  let month =time.toLocaleString("en-IN" , {month:"long"})
  let bookTime = time.toLocaleTimeString().toLowerCase();

  let date1=new Date(e.date)

  

 
  row.innerHTML=`
  <td>${e.id}</td>
  <td>${e.name}</td>
  <td>${e.adventureName}</td>
  <td>${e.person}</td>
  <td>${date1.toLocaleDateString("en-IN")}</td>
  <td>${e.price}</td>
  <td>${date} ${month} ${year}, ${bookTime}</td>
  <td id="${e.id}"><a href ="../detail/?adventure=${e.adventure}"><button class="reservation-visit-button">Visit Adventure</button></a></td
  
 `

reservationTable.append(row);

})


}

export { fetchReservations, addReservationToTable };
