const flightNumber = document.getElementById('flight');
const seatNumber = document.getElementById('seat');
const fullName = document.getElementById('name');
const email = document.getElementById('email');
const input = document.getElementById('input');
const submit = document.getElementById('submit');

function testFunction(event) {
  event.preventDefault();
  console.log("test FE 1")
}

const retrieveInfo = (event) => {
  event.preventDefault();
  let inputEmail = input.value;
  fetch(`/view-reservation/${inputEmail}`)
    .then(res => res.json())
    .then(data => {
      displayReservation(data.reservationInfo);
    })
  console.log("test FE 2")
}

const displayReservation = (ticket) => {
  console.log("test FE 3")
  console.log(ticket);
  flightNumber.innerHTML = ` ${ticket.flight}`;
  seatNumber.innerHTML = ` ${ticket.seat}`;
  fullName.innerHTML = ` ${ticket.givenName} ${ticket.surname}`;
  email.innerHTML = ` ${ticket.email}`;
}

view.addEventListener('submit', retrieveInfo)