const flightInput = document.getElementById('flight');
const seatsDiv = document.getElementById('seats-section');
const confirmButton = document.getElementById('confirm-button');

let selection = '';

const renderSeats = (flight) => {
    document.querySelector('.form-container').style.display = 'block';

    const alpha = ['A', 'B', 'C', 'D', 'E', 'F'];
    for (let r = 1; r <= 10; r++) {
        const row = document.createElement('ol');
        row.classList.add('row');
        row.classList.add('fuselage');
        seatsDiv.appendChild(row);
        for (let s = 0; s < 6; s++) {
            const seatNumber = `${r}${alpha[s-1]}`;
            const seat = document.createElement('li');

            const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`
            const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`        
        
            seat.innerHTML = seatAvailable;

            // if (!flight.find((seat) => seat.id === `${r}${alpha[s-1]}` ).isAvailable) {
            //     seat.innerHTML = seatOccupied;
            // }

            if (!flight[((r-1)*6)+s].isAvailable){
                seat.innerHTML = seatOccupied;
            }
            
            row.appendChild(seat);
        }
    }
    
    let seatMap = document.forms['seats'].elements['seat'];
    seatMap.forEach(seat => {
        seat.onclick = () => {
            selection = seat.value;
            seatMap.forEach(x => {
                if (x.value !== seat.value) {
                    document.getElementById(x.value).classList.remove('selected');
                }
            })
            document.getElementById(seat.value).classList.add('selected');
            document.getElementById('seat-number').innerText = `(${selection})`;
            confirmButton.disabled = false;
        }
    });
}


const toggleFormContent = (event) => {
    const flightNumber = flightInput.value;
    fetch(`/flights/${flightNumber}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.flight);
            renderSeats(data.flight);
        })
}

const handleConfirmSeat = (event) => {
    event.preventDefault();
    // TODO: everything in here!
    fetch('/users', {
        method: 'POST',
        body: JSON.stringify({
            'givenName': document.getElementById('givenName').value
        }),
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }
    })

}

flightInput.addEventListener('blur', toggleFormContent);