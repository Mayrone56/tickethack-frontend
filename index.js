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
document.querySelector('#search').addEventListener('click', () => {
  //Stock ce que le user tape dedans a moment du clic
  const departure = document.querySelector('#departure').value;
  const arrival = document.querySelector('#arrival').value;
  const date = document.querySelector('#date').value;

  //Card left find departure arrival date
  fetch(`http://localhost:3000/trips/findTrips/${departure}/${arrival}/${date}`)
    .then(response => response.json())
    .then(trips => {
      document.querySelector('#results').innerHTML = "";
      console.log("Click detected")
      if (trips.length === 0) {
        rightCardError();
        //Permet de sortir de la fonction
        console.log("No trips found!")
        return;
      }
      rightCardFill(trips);
    })
})

//Fonction right card error
const rightCardError = function () {
  document.querySelector('#results').innerHTML = `
    <img id="results-logo" src="images/notfound.png" />
    <div class="divider green"></div>
    <span>No trip found.</span>
  `;
}
//rightCardError();

//Fonction affiche les trips dans la card result
//AUtre façon d'ecrire la fonction
function rightCardFill(trips) {
  for (const trip of trips) {
    //Mettre {i} permet d'en faire une string grace au {} a qui on ajoute ++, le [i] est l'index du tableau car on en fait un indec grace aux []
    //Ici on parse la date String qu'on transforme en dat et formatter c'est date vers string
    const timeTrip = moment(trip.date).format("HH:mm");

    // Il retrouve .departure car il est appelé dans la fonction trips avec le fetch departure qui correspond au model defini en backend
    document.querySelector('#results').innerHTML += `
    <div class="divider green">
    <span>${trip.departure} > ${trip.arrival} ${timeTrip} ${trip.price}€ <button class='bt-book' id='${trip._id}'>Book</button></span>
    </div>
    `;

  }
  addEventListenerButtons();
}

function addEventListenerButtons() {
  const buttonsBook = document.querySelectorAll('.bt-book');
  for (const button of buttonsBook) {
    button.addEventListener('click', () => {
      console.log(button.id)
    })
  }
}











//Set date default 
// const time = new Date(trip.date);
// document.querySelector('#date').value = time;


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