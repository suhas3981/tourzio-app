// Handle booking form submission
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
  const numberOfPeopleInput = document.getElementById('numberOfPeople');
  const startDateInput = document.getElementById('startDate');

  // Update price calculation
  function updatePriceCalculation() {
    const numberOfPeople = parseInt(numberOfPeopleInput.value) || 1;
    const startDate = new Date(startDateInput.value);
    const today = new Date();
    const daysInAdvance = Math.floor((startDate - today) / (1000 * 60 * 60 * 24));

    let subtotal = packagePrice * numberOfPeople;
    let discounts = [];
    let totalDiscount = 0;

    // Group discount
    if (numberOfPeople >= 4) {
      discounts.push('Group Discount (15%): -$' + (subtotal * 0.15).toFixed(2));
      totalDiscount += 0.15;
    }

    // Early bird discount
    if (daysInAdvance >= 60) {
      const earlyBirdDiscount = subtotal * (1 - totalDiscount) * 0.20;
      discounts.push('Early Bird Discount (20%): -$' + earlyBirdDiscount.toFixed(2));
      totalDiscount += 0.20 * (1 - totalDiscount);
    }

    // Student discount (check if user is student from session)
    // This would need to be passed from the server

    const total = subtotal * (1 - totalDiscount);

    document.getElementById('base-price').textContent = packagePrice;
    document.getElementById('people-count').textContent = numberOfPeople;
    document.getElementById('subtotal').textContent = subtotal.toFixed(0);
    
    const discountsElement = document.getElementById('discounts-applied');
    if (discounts.length > 0) {
      discountsElement.innerHTML = '<strong>Discounts:</strong><br>' + discounts.join('<br>');
    } else {
      discountsElement.innerHTML = '';
    }

    document.getElementById('total-price').textContent = Math.round(total);
  }

  numberOfPeopleInput.addEventListener('input', updatePriceCalculation);
  startDateInput.addEventListener('change', updatePriceCalculation);

  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(bookingForm);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.success) {
        alert('Booking created successfully!');
        window.location.href = '/bookings/dashboard';
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  });
}

// Cancel booking function
async function cancelBooking(bookingId) {
  if (!confirm('Are you sure you want to cancel this booking?')) {
    return;
  }

  try {
    const response = await fetch(`/bookings/${bookingId}/cancel`, {
      method: 'POST'
    });

    const result = await response.json();

    if (result.success) {
      alert('Booking cancelled successfully!');
      location.reload();
    } else {
      alert('Error: ' + result.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
}

// Load featured packages on home page
document.addEventListener('DOMContentLoaded', async () => {
  const featuredPackagesContainer = document.getElementById('featured-packages');
  
  if (featuredPackagesContainer) {
    try {
      const response = await fetch('/packages?limit=6');
      // Note: You'd need to modify the controller to return JSON when requested
      // For now, this is a placeholder
    } catch (error) {
      console.error('Error loading featured packages:', error);
    }
  }
});
