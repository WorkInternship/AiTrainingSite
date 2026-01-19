// public/js/main.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('MB9 Vibe Code Website loaded successfully!');
    
    // Update time every second
    function updateTime() {
        const now = new Date();
        const timeElement = document.getElementById('time');
        if (timeElement) {
            timeElement.textContent = now.toLocaleTimeString();
        }
    }
    
    // Update time immediately and then every second
    updateTime();
    setInterval(updateTime, 1000);
    
    // Add interactive effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Add click animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Fetch and display server info
    fetch('/health')
        .then(response => response.json())
        .then(data => {
            console.log('Server health:', data);
            const envElement = document.getElementById('env');
            if (envElement) {
                envElement.textContent = data.environment;
            }
        })
        .catch(error => {
            console.log('Error fetching health data:', error);
        });
});