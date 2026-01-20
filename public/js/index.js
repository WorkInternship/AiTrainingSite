/* =========================================
   1. CAROUSEL LOGIC
   ========================================= */
function initCarousel() {
  const cards = document.querySelectorAll('.carousel-card');
  if (cards.length === 0) return;

  let currentIndex = 0;

  function updateCarousel() {
    cards.forEach((card) => {
      card.classList.remove('active', 'prev', 'next');
      card.style.opacity = "0";
    });

    const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
    const nextIndex = (currentIndex + 1) % cards.length;

    cards[currentIndex].classList.add('active');
    cards[prevIndex].classList.add('prev');
    cards[nextIndex].classList.add('next');
    
    cards[currentIndex].style.opacity = "1";
    cards[prevIndex].style.opacity = "0.6";
    cards[nextIndex].style.opacity = "0.6";

    currentIndex = (currentIndex + 1) % cards.length;
  }

  updateCarousel();
  setInterval(updateCarousel, 3500);
}

/* =========================================
   2. FORM SUBMISSION LOGIC
   ========================================= */
function initForm() {
  const leadForm = document.getElementById('lead-form');
  if (!leadForm || leadForm.dataset.listenerAttached === "true") return;

  leadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();

    const submitBtn = leadForm.querySelector('button');
    const nameInput = leadForm.querySelector('input[placeholder="Name"]');
    const emailInput = leadForm.querySelector('input[placeholder="Email"]');

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();

    if (!nameValue || !emailValue) {
      showStatusModal('Wait!', 'Please fill in all fields.', false);
      return;
    }

    submitBtn.disabled = true;
    const originalText = submitBtn.innerText;
    submitBtn.innerText = 'Processing...';

    try {
      const response = await fetch('/api/leads/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nameValue, email: emailValue })
      });

      const result = await response.json();

      if (response.ok) {
        // SUCCESS MODAL CALL MOVED HERE
        showStatusModal('Success!', 'Your interest has been registered. We will be in touch soon.', true);
        leadForm.reset();
      } else {
        // ERROR MODAL CALL MOVED HERE
        showStatusModal('Oops!', result.error || 'Something went wrong.', false);
      }

    } catch (error) {
      console.error('Fetch Error:', error);
      showStatusModal('Connection Error', 'Could not connect to the server. Please try again.', false);
    } finally {
      submitBtn.innerText = originalText;
      submitBtn.disabled = false;
    }
  });

  leadForm.dataset.listenerAttached = "true";
}

/* =========================================
   3. CUSTOM NOTIFICATION LOGIC
   ========================================= */
function showStatusModal(title, message, isSuccess = true) {
  const modal = document.getElementById('status-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalMessage = document.getElementById('modal-message');
  const modalIcon = document.getElementById('modal-icon');

  if(!modal) return;

  modalTitle.innerText = title;
  modalMessage.innerText = message;
  modalIcon.innerText = isSuccess ? "✅" : "❌";
  
  modal.classList.add('active');
}

// This function needs to be global so the HTML button can see it
window.closeModal = function() {
  const modal = document.getElementById('status-modal');
  if(modal) modal.classList.remove('active');
}

/* =========================================
   4. INITIALIZATION
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  initForm();
  
  // Close modal when clicking on the blurred background
  window.addEventListener('click', (event) => {
    const modal = document.getElementById('status-modal');
    if (event.target === modal) {
      closeModal();
    }
  });
});