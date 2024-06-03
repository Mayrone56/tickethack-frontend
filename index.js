// const BACKEND_URL = "https://tickethack-backend-iota-blue.vercel.app";
const BACKEND_URL = "http://localhost:3000";
// //Set date default
document.querySelector("#date").value = moment().format("YYYY-MM-DD");

//BT search vide #results
document.querySelector("#search").addEventListener("click", () => {
  //Stock ce que le user tape dedans a moment du clic
  const departure = document.querySelector("#departure").value;
  const arrival = document.querySelector("#arrival").value;
  const date = document.querySelector("#date").value;

  //Card left find departure arrival date
  fetch(`${BACKEND_URL}/trips/findTrips/${departure}/${arrival}/${date}`)
    .then((response) => response.json())
    .then((trips) => {
      document.querySelector("#results").innerHTML = "";
      console.log("Click detected");
      if (trips.length === 0) {
        rightCardError();
        //Permet de sortir de la fonction
        console.log("No trips found!");
        return;
      }
      rightCardFill(trips);
    });
});

//Fonction right card error
const rightCardError = function () {
  document.querySelector("#results").innerHTML = `
    <img id="results-logo" src="images/notfound.png" />
    <div class="divider green"></div>
    <span>No trip found.</span>
  `;
};
//rightCardError();

//Fonction affiche les trips dans la card result
//AUtre façon d'ecrire la fonction
function rightCardFill(trips) {
  for (const trip of trips) {
    //Mettre {i} permet d'en faire une string grace au {} a qui on ajoute ++, le [i] est l'index du tableau car on en fait un indec grace aux []
    //Ici on parse la date String qu'on transforme en dat et formatter c'est date vers string
    const timeTrip = moment(trip.date).format("HH:mm");

    // Il retrouve .departure car il est appelé dans la fonction trips avec le fetch departure qui correspond au model defini en backend, pareil pour l'i qui est crée de bae par monDB avec la nommenclature _id
    //<button class='bt-book' id='${trip._id}'>Book</button> ici on lui met dans button id ce dernier etat l'attribut html, on peut le voir dans le html directement dans id=
    document.querySelector("#results").innerHTML += `
    <div class="divider green">
      <span>${trip.departure} > ${trip.arrival} ${timeTrip} ${trip.price}€ <button class='bt-book' id='${trip._id}'>Book</button></span>
    </div>
    `;
  }
  addEventListenerButtons();
}

//Click book
function addEventListenerButtons() {
  const buttonsBook = document.querySelectorAll(".bt-book");
  for (const button of buttonsBook) {
    button.addEventListener("click", () => {
      console.log("Button id", button.id);
      //On retrouve dans la route le parametre button.id declaré dans le bloc de code au dessus
      fetch(`${BACKEND_URL}/carts/newCart/${button.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }).then((window.location = "cart.html"));
    });
  }
}
