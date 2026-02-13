/* ========================================
   Valentine's Day Website - JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all features
  initFloatingHearts();
  initFloatingFlowers();
  initCarousel();
  initScrollAnimations();
});

/* ========================================
   Floating Hearts Animation
   ======================================== */
function initFloatingHearts() {
  const container = document.getElementById('floatingHearts');
  const heartSymbols = ['♥', '❤', '💕', '💖', '💗', '❤️'];
  const numberOfHearts = 25;

  for (let i = 0; i < numberOfHearts; i++) {
    createHeart(container, heartSymbols);
  }
}

function createHeart(container, symbols) {
  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  heart.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
  
  // Random positioning
  heart.style.left = Math.random() * 100 + '%';
  
  // Random animation delay
  heart.style.animationDelay = Math.random() * 6 + 's';
  
  // Random animation duration
  heart.style.animationDuration = (4 + Math.random() * 4) + 's';
  
  // Random size
  const size = 15 + Math.random() * 25;
  heart.style.fontSize = size + 'px';
  
  // Random opacity
  heart.style.opacity = 0.5 + Math.random() * 0.5;
  
  container.appendChild(heart);
  
  // Remove and recreate heart after animation
  heart.addEventListener('animationend', function() {
    heart.remove();
    createHeart(container, symbols);
  });
}

/* ========================================
   Floating Tulips Animation
   ======================================== */
function initFloatingFlowers() {
  const container = document.getElementById('floatingFlowers');
  const tulipSymbols = ['🌷', '🌷', '🌷', '🌸', '🌺']; // Primarily tulips
  const numberOfTulips = 18;

  for (let i = 0; i < numberOfTulips; i++) {
    createFlower(container, tulipSymbols);
  }
}

function createFlower(container, symbols) {
  const flower = document.createElement('div');
  flower.className = 'floating-flower';
  flower.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
  
  // Random positioning
  flower.style.left = Math.random() * 100 + '%';
  
  // Random animation delay
  flower.style.animationDelay = Math.random() * 8 + 's';
  
  // Random animation duration
  flower.style.animationDuration = (6 + Math.random() * 6) + 's';
  
  // Random size
  const size = 20 + Math.random() * 20;
  flower.style.fontSize = size + 'px';
  
  // Random opacity
  flower.style.opacity = 0.4 + Math.random() * 0.4;
  
  container.appendChild(flower);
  
  // Remove and recreate flower after animation
  flower.addEventListener('animationend', function() {
    flower.remove();
    createFlower(container, symbols);
  });
}

/* ========================================
   Image Carousel
   ======================================== */
function initCarousel() {
  const track = document.getElementById('carouselTrack');
  const dotsContainer = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  // Image paths (1.jpeg to 15.jpeg)
  const images = [];
  for (let i = 1; i <= 15; i++) {
    images.push(`css/${i}.jpeg`);
  }
  
  let currentIndex = 0;
  let autoplayInterval;
  
  // Create carousel slides
  images.forEach((src, index) => {
    // Create slide
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Memory ${index + 1}`;
    img.loading = 'lazy';
    
    slide.appendChild(img);
    track.appendChild(slide);
    
    // Create dot
    const dot = document.createElement('div');
    dot.className = 'dot' + (index === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  
  function updateCarousel() {
    // Update track position
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
  
  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
    resetAutoplay();
  }
  
  function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
  }
  
  function prevSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
  }
  
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 4000); // 4 seconds
  }
  
  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }
  
  // Event listeners for buttons
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
  });
  
  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
      resetAutoplay();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
      resetAutoplay();
    }
  });
  
  // Pause on hover
  const carouselContainer = document.querySelector('.carousel-container');
  carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
  });
  
  carouselContainer.addEventListener('mouseleave', () => {
    startAutoplay();
  });
  
  // Start autoplay
  startAutoplay();
  
  // Handle image load errors
  const carouselImages = document.querySelectorAll('.carousel-slide img');
  carouselImages.forEach(img => {
    img.addEventListener('error', function() {
      this.style.display = 'none';
    });
  });
}

/* ========================================
   Scroll Animations
   ======================================== */
function initScrollAnimations() {
  // Check if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements with fade-in effect
    const fadeElements = document.querySelectorAll('.sweet-note, .carousel-section');
    fadeElements.forEach(el => {
      el.classList.add('fade-in-section');
      observer.observe(el);
    });
  }
}

/* ========================================
   Additional Effects
   ======================================== */

// Add click ripple effect to buttons
document.querySelectorAll('.carousel-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 50%;
      width: 100px;
      height: 100px;
      transform: translate(-50%, -50%) scale(0);
      animation: rippleEffect 0.6s ease-out;
      pointer-events: none;
    `;
    
    const rect = this.getBoundingClientRect();
    ripple.style.left = (e.clientX - rect.left) + 'px';
    ripple.style.top = (e.clientY - rect.top) + 'px';
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes rippleEffect {
    to {
      transform: translate(-50%, -50%) scale(2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Heartfelt message typing effect (optional enhancement)
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Add subtle parallax effect on scroll
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const floatingHearts = document.getElementById('floatingHearts');
  const floatingFlowers = document.getElementById('floatingFlowers');
  
  if (floatingHearts) {
    floatingHearts.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
  if (floatingFlowers) {
    floatingFlowers.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// Add cursor heart trail effect (subtle)
let cursorHearts = [];
const maxCursorHearts = 5;

document.addEventListener('mousemove', (e) => {
  if (Math.random() > 0.8) { // Only create heart occasionally
    const heart = document.createElement('div');
    heart.textContent = '♥';
    heart.style.cssText = `
      position: fixed;
      left: ${e.pageX}px;
      top: ${e.pageY}px;
      font-size: 15px;
      color: #c9184a;
      pointer-events: none;
      z-index: 10000;
      opacity: 0.8;
      animation: fadeOut 1s ease forwards;
    `;
    document.body.appendChild(heart);
    cursorHearts.push(heart);
    
    if (cursorHearts.length > maxCursorHearts) {
      const oldHeart = cursorHearts.shift();
      oldHeart.remove();
    }
    
    setTimeout(() => {
      heart.remove();
    }, 1000);
  }
});

// Add fadeOut animation for cursor hearts
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
  @keyframes fadeOut {
    to {
      opacity: 0;
      transform: translateY(-20px) scale(0.5);
    }
  }
`;
document.head.appendChild(cursorStyle);

console.log('❤️ Happy Valentine\'s Day! ❤️');

