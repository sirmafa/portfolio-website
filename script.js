// Initialize Feather icons
feather.replace();

// Mobile menu toggle
document.querySelector('.mobile-menu-button').addEventListener('click', function() {
    // You would implement mobile menu functionality here
    alert('Mobile menu would open here in a full implementation');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        console.log('Sending form data:', { name, email, subject, message });
        
        //API Gateway URL
        const response = await fetch('https://uk5t4xna4f.execute-api.us-east-1.amazonaws.com/prod/contact?v=' + Date.now(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, subject, message })
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        const responseText = await response.text();
        console.log('Response body:', responseText);
        
        if (response.ok) {
            alert('Thank you for reaching out! I will get back to you soon.');
            contactForm.reset();
        } else {
            throw new Error(`HTTP ${response.status}: ${responseText}`);
        }
    } catch (error) {
        console.error('Full error details:', error);
        alert('Sorry, there was an error sending your message. Please try again.');
    } finally {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});