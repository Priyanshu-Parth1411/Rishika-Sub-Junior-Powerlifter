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
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        // For now, we'll just log it and show a success message
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
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
    
    currentMediaIndex = mediaItems.findIndex(item => item.src === src);
    
    if (type === 'image') {
        lightboxImg.style.display = 'block';
        lightboxVideo.style.display = 'none';
        lightboxImg.src = src;
    } else {
        lightboxImg.style.display = 'none';
        lightboxVideo.style.display = 'block';
        lightboxVideo.src = src;
        lightboxVideo.load();
        lightboxVideo.play();
    }
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxVideo = document.getElementById('lightbox-video');
    
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxVideo.pause();
    lightboxVideo.currentTime = 0;
}

function prevItem(e) {
    e.stopPropagation();
    currentMediaIndex = (currentMediaIndex - 1 + mediaItems.length) % mediaItems.length;
    const item = mediaItems[currentMediaIndex];
    openLightbox(item.src, item.type);
}

function nextItem(e) {
    e.stopPropagation();
    currentMediaIndex = (currentMediaIndex + 1) % mediaItems.length;
    const item = mediaItems[currentMediaIndex];
    openLightbox(item.src, item.type);
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
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}

window.addEventListener('scroll', reveal);
reveal(); // Initial check

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