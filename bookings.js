//const BACKEND_URL = "http://localhost:3000";
const BACKEND_URL = "https://tickethack-backend-nine-flame.vercel.app";

function fillBooking() {
  fetch(`${BACKEND_URL}/bookings`)
    .then(response => response.json())
    .then(bookings => {
      if (bookings.length === 0) {
        document.querySelector('#bookings').innerHTML = `
          <p>No booking yet.</p>
          <p>Why not plan a trip?</p>
        `;
      } else {
        //Vidage du tableau
        emptyBookings();

           document.querySelector('#bookings').innerHTML += `
            <div id="booking-list">  
              <h2>My bookings</h2>
            </div>
            `;
        for (const booking of bookings.bookingArray) {
          const trip = booking.trip;

          const duration = moment.duration(moment(trip.date).diff(moment()));
          if (duration.asDays() < 0) {
            const timeTrip = moment(trip.date).format("HH:mm");
            document.querySelector('#booking-list').innerHTML += `
            <div class="divider green">
              <div>${trip.departure} > ${trip.arrival} ${timeTrip} ${trip.price}€ Departue was ${-Math.floor(duration.asHours())} hours ago</div>
            </div>
            `;
          }
          else if (duration.asDays() > 1) {
            const timeTrip = moment(trip.date).format("DD/MM HH:mm");
            document.querySelector('#booking-list').innerHTML += `
            <div>${trip.departure} > ${trip.arrival} ${timeTrip} ${trip.price}€ Departue in ${Math.floor(duration.asDays())} days</div>
            `;
          } else {
            
            const timeTrip = moment(trip.date).format("HH:mm");
            document.querySelector('#booking-list').innerHTML += `
            <div>${trip.departure} > ${trip.arrival} ${timeTrip} ${trip.price}€ Departue in ${Math.floor(duration.asHours())} hours</div>
            `;
          }
        }
      }
    });
}
fillBooking();

//Vidage tableau
function emptyBookings() {
  document.querySelector('#bookings').innerHTML = "";
}