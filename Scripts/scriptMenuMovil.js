document.addEventListener("DOMContentLoaded", () => {
  // Get DOM elements
  const hamburgerBtn = document.querySelector(".hamburger-menu")
  const mobileNav = document.querySelector(".mobile-nav")
  const mobileNavOverlay = document.querySelector(".mobile-nav-overlay")
  const closeMenuBtn = document.querySelector(".close-menu")

  // Toggle mobile menu when hamburger is clicked
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", () => {
      mobileNav.classList.add("active")
      mobileNavOverlay.classList.add("active")
      document.body.style.overflow = "hidden" // Prevent scrolling when menu is open
    })
  }

  // Close mobile menu when X button is clicked
  if (closeMenuBtn) {
    closeMenuBtn.addEventListener("click", closeMenu)
  }

  // Close mobile menu when overlay is clicked
  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener("click", closeMenu)
  }

  // Close menu function
  function closeMenu() {
    mobileNav.classList.remove("active")
    mobileNavOverlay.classList.remove("active")
    document.body.style.overflow = "" // Re-enable scrolling
  }

  // Close menu when window is resized to desktop size
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && mobileNav.classList.contains("active")) {
      closeMenu()
    }
  })
})