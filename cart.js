function fillCart() {
  fetch('https://tickethack-backend-iota-blue.vercel.app//carts')
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
        let priceTrip = 0;
        for (const cart of carts) {
          const trip = cart.trip;
          priceTrip = priceTrip + trip.price;
          const timeTrip = moment(trip.date).format("HH:mm");
          document.querySelector('#cart').innerHTML += `
                 <div class="divider green">
                 <span>${trip.departure} > ${trip.arrival} ${timeTrip} ${trip.price}€ <button class='bt-delete' id='${cart._id}'>X</button></span>
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
      fetch(`https://tickethack-backend-iota-blue.vercel.app//carts/deleteCart/${button.id}`, {
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
  fetch(`https://tickethack-backend-iota-blue.vercel.app//bookings/newBooking`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(window.location = "bookings.html")
})


  