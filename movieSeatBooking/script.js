const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

//Populate UI
populateUI();

let ticketPrice = parseInt(movieSelect.value);

//Movie selected index and price
const movieSelectedIndex = (movieIndex, moviePrice) => {
  localStorage.setItem("MovieIndex", movieIndex);
  localStorage.setItem("MoviePrice", moviePrice);
};

// Count update event
const updateCountSelected = () => {
  const seatSelected = document.querySelectorAll(".row .seat.selected");

  const seatSelectedIndex = [...seatSelected].map((item) =>
    [...seats].indexOf(item)
  );
  localStorage.setItem("SelectedSeatIndex", JSON.stringify(seatSelectedIndex));

  const seatSelectedsCount = seatSelected.length;
  count.innerText = seatSelectedsCount;
  total.innerText = seatSelectedsCount * ticketPrice;
};
//Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  movieSelectedIndex(e.target.selectedIndex, e.target.value);
  updateCountSelected();
});

// Populate UI
function populateUI() {
  const selectedIndex = localStorage.getItem("SelectedSeatIndex");
  if (selectedIndex !== null && selectedIndex.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedIndex.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("MovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

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
updateCountSelected();
