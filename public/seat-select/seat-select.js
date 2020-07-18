const flightInput = document.getElementById('flight');
const seatsDiv = document.getElementById('seats-section');
const confirmButton = document.getElementById('confirm-button');
const formFlightNumber = document.getElementById('form-flight-number')

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
            const seatNumber = `${r}${alpha[s]}`;
            const seat = document.createElement('li');

            const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`
            const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`        
        
            seat.innerHTML = seatAvailable;

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

const toggleFormContent = () => {
    event.preventDefault();
    const flightNumber = flightInput.value;
    fetch(`/flights/${flightNumber}`)
        .then(res => res.json())
        .then(data => {
            renderSeats(data.flight);
        })
}

function getRandomId() {
    let dt = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid
}

const handleConfirmSeat = (event) => {
    event.preventDefault();
    fetch('/new-reservation/:id', {
        method: 'POST',
        body: JSON.stringify({
            'id': getRandomId(),
            'flight': flightInput.value,
            'seat': selection,
            'givenName': document.getElementById('givenName').value,
            'surname': document.getElementById('surname').value,
            'email': document.getElementById('email').value
        }),
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }
    })
    document.location.replace('/confirmed')
}


flightInput.addEventListener('blur', toggleFormContent);