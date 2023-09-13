const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movie = document.getElementById('movie');


function setMoiveData(index, price) {
  localStorage.setItem('selectedMoiveIndex', index);
  localStorage.setItem('selectedMoivePrice', price);
}


function update() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');


  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * movie.value

}


function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  console.log(selectedSeats);
  if(selectedSeats !== null && selectedSeats > 0) {
    seats.forEach((seat, index) => {
      if(selectedSeats.indexOf(index) > -1 ) {
        seat.classList.add('selected');
      }
    });
  }

  const index = localStorage.getItem('selectedMoiveIndex');
  if(index !== null) {
    moiveSelect.selectedIndex = index
  }
}

movie.addEventListener('change', e => {
  update();
  setMoiveData(e.target.selectedIndex, e.target.value);
});

container.addEventListener('click', e => {
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    console.log(e.target);
    e.target.classList.toggle('selected');
  }
  update();
});