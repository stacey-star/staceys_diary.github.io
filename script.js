// Navigation functionality only
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const ctaButton = document.querySelector('.cta-button');

    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and pages
            navLinks.forEach(l => l.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding page
            const targetPage = document.getElementById(this.getAttribute('data-page'));
            targetPage.classList.add('active');
        });
    });

    // "Explore more about me" button - goes to About section
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            // Navigate to About Me section
            navLinks.forEach(l => l.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));
            
            const aboutLink = document.querySelector('[data-page="about"]');
            const aboutPage = document.getElementById('about');
            
            if (aboutLink) aboutLink.classList.add('active');
            if (aboutPage) aboutPage.classList.add('active');
        });
    }
});
