// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: this.querySelector('input[name="name"]').value,
            email: this.querySelector('input[name="email"]').value,
            message: this.querySelector('textarea[name="message"]').value
        };
        
        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-message success';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! I will get back to you soon.';
            contactForm.appendChild(successMessage);
            
            // Reset form
            contactForm.reset();
            
            // Reset button state
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }, 1500);
    });
}

// Add animation to stats when they come into view
const stats = document.querySelectorAll('.stat');
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

stats.forEach(stat => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(20px)';
    stat.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(stat);
});

// Get all gallery items
const galleryItems = document.querySelectorAll('.certificate-card');
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';

// Create lightbox HTML
lightbox.innerHTML = `
    <div class="lightbox-content">
        <img src="" alt="Lightbox Image">
        <span class="lightbox-close">&times;</span>
        <div class="lightbox-nav">
            <button class="prev-button">&lt;</button>
            <button class="next-button">&gt;</button>
        </div>
    </div>
`;

document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector('img');
const closeButton = lightbox.querySelector('.lightbox-close');
const prevButton = lightbox.querySelector('.prev-button');
const nextButton = lightbox.querySelector('.next-button');
let currentIndex = 0;

// Function to open lightbox
function openLightbox(index) {
    currentIndex = index;
    const imgSrc = galleryItems[currentIndex].querySelector('img').src;
    lightboxImg.src = imgSrc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Function to close lightbox with animation
function closeLightbox() {
    lightbox.classList.add('closing');
    setTimeout(() => {
        lightbox.classList.remove('active', 'closing');
        document.body.style.overflow = ''; // Restore scrolling
    }, 300); // Match animation duration
}

// Function to navigate to next/previous image
function navigate(direction) {
    currentIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
    const imgSrc = galleryItems[currentIndex].querySelector('img').src;
    
    // Add fade out animation
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
        lightboxImg.src = imgSrc;
        lightboxImg.style.opacity = '1';
    }, 200);
}

// Add click event listeners to gallery items
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
});

// Close lightbox when clicking close button or outside the image
closeButton.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Navigation buttons
prevButton.addEventListener('click', () => navigate(-1));
nextButton.addEventListener('click', () => navigate(1));

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    switch(e.key) {
        case 'ArrowLeft':
            navigate(-1);
            break;
        case 'ArrowRight':
            navigate(1);
            break;
        case 'Escape':
            closeLightbox();
            break;
    }
});

// Add transition for image changes
lightboxImg.style.transition = 'opacity 0.2s ease';

// Lightbox functionality
let currentMediaIndex = 0;
const mediaItems = [
    { src: './g1.jpg', type: 'image' },
    { src: './g2.jpg', type: 'image' },
    { src: './g3.jpg', type: 'image' },
    { src: './g4.jpg', type: 'image' },
    { src: './g5.jpg', type: 'image' },
    { src: './g6.jpg', type: 'image' },
    { src: './g7.jpg', type: 'image' },
    { src: './video4.mp4', type: 'video' },
    { src: './video5.mp4', type: 'video' },
    { src: './video6.mp4', type: 'video' }
];

function openLightbox(src, type) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    
    if (type === 'image') {
        lightboxImg.src = src;
        lightboxImg.style.display = 'block';
        lightboxVideo.style.display = 'none';
    } else if (type === 'video') {
        lightboxVideo.src = src;
        lightboxVideo.style.display = 'block';
        lightboxImg.style.display = 'none';
    }
    
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    
    lightbox.style.display = 'none';
    lightboxImg.style.display = 'none';
    lightboxVideo.style.display = 'none';
    lightboxVideo.pause();
    document.body.style.overflow = 'auto';
}

function prevItem(event) {
    event.stopPropagation();
    // Add navigation logic for images
}

function nextItem(event) {
    event.stopPropagation();
    // Add navigation logic for images
}

// Close lightbox when clicking outside the content
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) {
        closeLightbox();
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Set volume for videos
document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('.gallery-item.video-item video');
    videos.forEach(video => {
        video.volume = 1.0; // Set volume to maximum
        video.addEventListener('loadedmetadata', function() {
            this.volume = 1.0; // Ensure volume is set after metadata is loaded
        });
    });
});

// Scroll Animations
function revealOnScroll() {
    const sections = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < windowHeight - revealPoint) {
            section.classList.add('active');
        }
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Initial reveal check
    revealOnScroll();

    // Add scroll event listener
    window.addEventListener('scroll', revealOnScroll);

    // Add hover effects to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05)';
            item.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
            item.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });

    // Add hover effects to certificate cards
    const certificateCards = document.querySelectorAll('.certificate-card');
    certificateCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });

    // Add hover effects to qualification cards
    const qualificationCards = document.querySelectorAll('.qualification-card');
    qualificationCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your public key
    emailjs.init("YOUR_PUBLIC_KEY"); // You'll need to replace this with your actual EmailJS public key

    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Get form data
            const formData = {
                from_name: this.querySelector('input[type="text"]').value,
                from_email: this.querySelector('input[type="email"]').value,
                message: this.querySelector('textarea').value
            };
            
            // Send email using EmailJS
            emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData)
                .then(function() {
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'form-message success';
                    successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! I will get back to you soon.';
                    contactForm.appendChild(successMessage);
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                })
                .catch(function(error) {
                    // Show error message
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'form-message error';
                    errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Sorry, there was an error sending your message. Please try again later.';
                    contactForm.appendChild(errorMessage);
                    
                    // Remove error message after 5 seconds
                    setTimeout(() => {
                        errorMessage.remove();
                    }, 5000);
                })
                .finally(function() {
                    // Reset button state
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                });
        });
    }
}); 
