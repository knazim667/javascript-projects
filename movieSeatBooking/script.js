const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = parseInt(movieSelect.value);

//Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  updateCountSelected();
});

// Count update event
const updateCountSelected = () => {
  const seatSelected = document.querySelectorAll(".row .seat.selected");

  const seatSelectedsCount = seatSelected.length;
  count.innerText = seatSelectedsCount;
  total.innerText = seatSelectedsCount * ticketPrice;
};

// Seat select event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateCountSelected();
  }
});
