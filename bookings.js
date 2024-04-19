// Get bookings
fetch('http://localhost:3000/bookings')
  .then(response => response.json())
  .then(data => {
    if (data.result) {
      document.querySelector('#trips').innerHTML = '<h4>My bookings</h4>';

      for (const { trip } of data.bookings) {
        document.querySelector('#trips').innerHTML += `
					<div class="booked-trip">
						<span>${trip.departure} > ${trip.arrival}</span>
						<span>${moment(trip.date).format('HH:mm')}</span>
						<span>${trip.price}€</span>
						<span class="departure">Departure ${moment(trip.date).fromNow()}</span>
					</div>
				`;
      }

      document.querySelector('#trips2').style.display = 'flex';
      document.querySelector('#trips2').innerHTML += `
				<div id="divider"></div>
				<h5>Enjoy your travels with Tickethack!</h5>
			`;
    }
  });
