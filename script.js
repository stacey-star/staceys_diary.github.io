// Navigation functionality
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

    // "Explore My Story" button - scrolls smoothly to About section
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

// Delete diary entry function
function deleteEntry(button) {
    if (confirm('Are you sure you want to delete this entry?')) {
        button.closest('.diary-entry').style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            button.closest('.diary-entry').remove();
        }, 300);
    }
}

// Delete gallery item function
function deleteGalleryItem(button) {
    if (confirm('Are you sure you want to delete this photo?')) {
        button.closest('.gallery-item').style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            button.closest('.gallery-item').remove();
        }, 300);
    }
}