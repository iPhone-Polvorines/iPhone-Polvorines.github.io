document.addEventListener('DOMContentLoaded', function() {
  // Carousel functionality
  const slides = document.querySelectorAll('.carousel-slide');
  let currentSlide = 0;
  let slideInterval;
  let direction = 1; // 1 for forward, -1 for backward

  // Initialize the carousel
  function startCarousel() {
      slideInterval = setInterval(changeSlide, 5000); // Change slide every 5 seconds
  }

  // Stop the carousel
  function stopCarousel() {
      clearInterval(slideInterval);
  }

  // Change slide based on current direction
  function changeSlide() {
      // Calculate next slide index
      const nextSlide = currentSlide + direction;
      
      // Check if we need to reverse direction
      if (nextSlide >= slides.length) {
          // We've reached the end, reverse direction
          direction = -1;
          goToSlide(currentSlide - 1);
      } else if (nextSlide < 0) {
          // We've reached the beginning, reverse direction
          direction = 1;
          goToSlide(currentSlide + 1);
      } else {
          // Continue in current direction
          goToSlide(nextSlide);
      }
  }

  // Go to specific slide
  function goToSlide(n) {
      // Remove active class from current slide
      slides[currentSlide].classList.remove('active');
      
      // Update current slide index
      currentSlide = n;
      
      // Add active class to new slide
      slides[currentSlide].classList.add('active');
  }

  // Pause carousel on hover
  /*const carousel = document.querySelector('.carousel');
  carousel.addEventListener('mouseenter', stopCarousel);
  carousel.addEventListener('mouseleave', startCarousel);*/

  // Start the carousel
  startCarousel();
  
  // Load custom products from localStorage
  loadCustomProducts();
  
  function loadCustomProducts() {
      const customProducts = JSON.parse(localStorage.getItem('products')) || [];
      const phoneGrid = document.querySelector('.phone-grid');
      
      if (!phoneGrid || customProducts.length === 0) return;
      
      // Add custom products to the grid
      customProducts.forEach(product => {
          const productCard = createProductCard(product);
          phoneGrid.appendChild(productCard);
      });
  }
  
  function createProductCard(product) {
      const card = document.createElement('div');
      card.className = 'phone-card';
      
      card.innerHTML = `
          <img src="${product.image}" alt="${product.name}" class="phone-image">
          <div class="phone-details">
              <h3 class="phone-name">${product.name}</h3>
              <p class="phone-price">$${product.price}</p>
          </div>
          <div class="phone-button">
              <a href="product-details.html?id=${product.id}" class="btn btn-accent btn-full">
                  <i class="fas fa-info-circle"></i> Details
              </a>
          </div>
      `;
      
      return card;
  }
});