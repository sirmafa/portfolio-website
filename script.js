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

// Initialize EmailJS - Updated for production
(function() {
    emailjs.init('u_KSwvc8g5_hu7Q0z');
})();

// Form submission handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Get form data
    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Send notification email to you
    emailjs.send('service_wjr2aua', 'template_6sbfxlp', templateParams)
        .then(function(response) {
            console.log('Notification sent successfully:', response);
            
            // Send auto-reply to visitor
            return emailjs.send('service_wjr2aua', 'template_0w1xz7z', templateParams);
        })
        .then(function(response) {
            console.log('Auto-reply sent successfully:', response);
            alert('Thank you for reaching out! You should receive a confirmation email shortly.');
            contactForm.reset();
        })
        .catch(function(error) {
            console.error('EmailJS error:', error);
            alert('Sorry, there was an error sending your message. Please try again.');
        })
        .finally(function() {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
});