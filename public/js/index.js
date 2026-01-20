document.getElementById('lead-form')?.addEventListener('submit', e => {
  e.preventDefault();
  alert('Thanks for registering your interest.');
  e.target.reset();
});

function initCarousel() {
  const cards = document.querySelectorAll('.carousel-card');
  let currentIndex = 0;

  function updateCarousel() {
    cards.forEach((card, i) => {
      card.classList.remove('active', 'prev', 'next');
      card.style.opacity = "0"; // Hide non-adjacent cards
    });

    const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
    const nextIndex = (currentIndex + 1) % cards.length;

    cards[currentIndex].classList.add('active');
    cards[prevIndex].classList.add('prev');
    cards[nextIndex].classList.add('next');
    
    // Ensure the adjacent cards are visible
    cards[currentIndex].style.opacity = "1";
    cards[prevIndex].style.opacity = "0.6";
    cards[nextIndex].style.opacity = "0.6";

    currentIndex = (currentIndex + 1) % cards.length;
  }

  updateCarousel();
  setInterval(updateCarousel, 3500); // Spins every 3.5 seconds
}

document.addEventListener('DOMContentLoaded', initCarousel);

document.getElementById('lead-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    name: e.target.querySelector('input[placeholder="Name"]').value,
    email: e.target.querySelector('input[placeholder="Email"]').value
  };

  const submitBtn = e.target.querySelector('button');
  submitBtn.innerText = 'Processing...';

  try {
    const response = await fetch('/api/leads/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (response.ok) {
      alert('Thank you! Your interest has been registered.');
      e.target.reset();
    } else {
      alert(result.error || 'Something went wrong.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Could not connect to the server.');
  } finally {
    submitBtn.innerText = '👉 Register My Interest';
  }
});
