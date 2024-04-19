//Strcutre trips find
//  let tripsFind = `
// <div class="trip-design">
//   <span>${trip.departure} > ${trip.arrival}${time.getHours()}:${time.getMinutes()}${trip.price}€</span>
//   <button id="bt-book">Book</button>
// </div>
// `;

//const { response } = require("../tickethack-backend/app");

//document.querySelector('#results').innerHTML += tripsFind;

//BT search vide #results
document.querySelector('#search').addEventListener('click', function () {
  const dearture = document.querySelector('#departure').value;
  const arrival = document.querySelector('#arrival').value;
  const date = document.querySelector('#date').value;
    document.querySelector('#results').innerHTML ="";
    console.log("Click detected")
  }
)

//Fonction right card error
const rightCardError = function() {
  document.querySelector('#results').innerHTML = `
    <img id="results-logo" src="images/notfound.png" />
    <div class="divider green"></div>
    <span>No trip found.</span>
  `;
  return rightCardError;
}
rightCardError();

//Card left find departure arrival date
fetch('http://localhost:3000/trips/findTrips/${departure}/${arrival}/${date}')
  .then(response => response.json())
  .then(trips => {
    document.querySelector('#departure').textContent = trips.dearture;
    console.log(trips.departure);
    return trips;
  })










//Set date default 
const time = new Date(trip.date);
document.querySelector('#date').value = time;


//Show trip in the right card

// document.querySelector('#search').addEventListener('click', () => {
//   fetch('http://localhost:3000/trips/findTrips/Paris/Lyon/2024-04-16T00:00:00Z')
//   .then(response => response.json())
//   .then(trips => {
//     document.querySelector('#results').innerHTML ="";
//     for (const trip of trips) {
//       //const time = new Date(trip.date);
//       document.querySelector('#results').innerHTML +=`
//         <span>${trip.departure} > ${trip.arrival}   ${time.getHours()}:${time.getMinutes()}    ${trip.price}€</span>
//       `;      
//     }
//   })
// })

//