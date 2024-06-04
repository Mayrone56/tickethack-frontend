//const BACKEND_URL = "http://localhost:3000";
const BACKEND_URL = "https://tickethack-backend-nine-flame.vercel.app";

function fillCart() {
  fetch(`${BACKEND_URL}/carts`)
    .then(response => response.json())
    .then(carts => {
      if (carts.length === 0) {
        document.querySelector('#cart').innerHTML = `
                <p>No tickets in your cart.</p>
                <p>Why not plan a trip?</p>
              `;
        document.querySelector('#cart2').style.display = "hidden";
      } else {
        //Vidage du tableau
        emptyCarts();
        document.querySelector('#cart').innerHTML += `
 
          <h2>My cart</h2>

        `;
        let priceTrip = 0;
        for (const cart of carts) {
          const trip = cart.trip;
          priceTrip = priceTrip + trip.price;
          const timeTrip = moment(trip.date).format("HH:mm");
          document.querySelector('#cart').innerHTML += `
            <div class="divider green">
              <div class="tripLine">
                <span ">
                  ${trip.departure} >
                </span>
                <span>
                  ${trip.arrival}
                </span>
                <span>
                  ${timeTrip}
                </span>
                <span>
                  ${trip.price}€               
                </span>
                </div>
                <button class='bt-delete' id='${cart._id}'>X</button>
            </div>
                 `;
        }
        btDelete();
        //Affiche la div cart2 avec le prix
        // priceTrip recupere le prix calculer dans cette variable
        document.querySelector('#total').textContent = priceTrip;
        document.querySelector('#cart2').style.display = "flex";
      }
    });
}
fillCart();

//Fonction vidage de tableau
function emptyCarts() {
  document.querySelector('#cart').innerHTML = "";
}

function btDelete() {
  const btDelete = document.querySelectorAll('.bt-delete');
  for (const button of btDelete) {
    button.addEventListener('click', () => {
      console.log("Button id", button.id)
      //On retrouve dans la route le parametre button.id declaré dans le bloc de code au dessus
      fetch(`${BACKEND_URL}/carts/deleteCart/${button.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
        //Quand on a fini de delte l'item on reload le contenu de la cart
        .then(() => fillCart())
    })
  }
}


//Detection du clic sur bt purchase
document.querySelector('#purchase').addEventListener('click', () => { 
  console.log("click purchase");
  fetch(`${BACKEND_URL}/bookings/newBooking`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(window.location = "bookings.html")
})


  