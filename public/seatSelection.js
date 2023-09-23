
const rows = [
  { label: 'A', seats: [...Array(10).keys()].map(number => ({ number: number + 1, reserved: false })) },
  { label: 'B', seats: [...Array(10).keys()].map(number => ({ number: number + 1, reserved: false })) },
  { label: 'C', seats: [...Array(10).keys()].map(number => ({ number: number + 1, reserved: false })) },
  { label: 'D', seats: [...Array(10).keys()].map(number => ({ number: number + 1, reserved: false })) },
  { label: 'E', seats: [...Array(10).keys()].map(number => ({ number: number + 1, reserved: false })) },
];

const seats = document.querySelectorAll('.seat');
const submitButton = document.getElementById('submit-seats');
const selectedSeats = [];

seats.forEach((seat, index) => {
  seat.addEventListener('click', () => {
    if (!seat.classList.contains('reserved')) {
      seat.classList.toggle('selected');
      if (seat.classList.contains('selected')) {
        selectedSeats.push(index + 1); // Store the seat index (or seat number)
      } else {
        const seatIndex = selectedSeats.indexOf(index + 1);
        if (seatIndex > -1) {
          selectedSeats.splice(seatIndex, 1);
        }
      }
    }
  });
});

// Function to update the selected seats container
function updateSelectedSeats() {
  const selectedSeatsContainer = document.getElementById('selected-seats-container');
  const selectedSeatsHtml = selectedSeats.map(seatNumber => `<div>Seat ${seatNumber}</div>`).join('');
  selectedSeatsContainer.innerHTML = `<h2>Selected Seats:</h2>${selectedSeatsHtml}`;
}

// Function to save selected seats to localStorage
function saveSelectedSeats() {
  localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
}

// Event listener for the submit button
submitButton.addEventListener('click', async () => {
  try {
    const response = await fetch('/api/seats', {
      method: 'POST',
      body: JSON.stringify({ seats: selectedSeats }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Handle the response from the server (e.g., show a confirmation message)
    console.log('Seats saved successfully:', data);

    // After successfully saving seats, navigate to the confirmation page
    window.location.href = `/confirmation?selectedSeats=${JSON.stringify(selectedSeats)}`; // Redirect to the confirmation page
  } catch (error) {
    console.error('Error:', error);
  }
});