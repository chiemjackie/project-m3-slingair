const flightNumber = document.getElementById('flight');
const seatNumber = document.getElementById('seat');
const fullName = document.getElementById('name');
const email = document.getElementById('email');

const flightDetails = () => {
  fetch(`/confirmed/current`)
    .then(res => res.json())
    .then(data => {
      displayInfo(data.flightInfo);
    })
}

const displayInfo = (ticket) => {
  console.log(ticket);
  flightNumber.innerHTML = ` ${ticket.flight}`;
  seatNumber.innerHTML = ` ${ticket.seat}`;
  fullName.innerHTML = ` ${ticket.givenName} ${ticket.surname}`;
  email.innerHTML = ` ${ticket.email}`;
}

flightDetails();