document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const accessoriesGrid = document.getElementById("accessories-grid")
  const noResults = document.getElementById("no-results")
  const resultsNumber = document.getElementById("results-number")
  /*const colorFilter = document.getElementById("color-filter")*/
  const compatibilityFilter = document.getElementById("compatibility")
  const searchTermInput = document.getElementById("search-term")
  const sortOrderSelect = document.getElementById("sort-order")
  const applyFiltersBtn = document.getElementById("apply-filters")
  const resetFiltersBtn = document.getElementById("reset-filters")
  const clearFiltersBtn = document.getElementById("clear-filters")
  const paginationContainer = document.getElementById("pagination")
  const categoryIcons = document.querySelectorAll(".category-icon")

  // Pagination settings
  const accessoriesPerPage = 8
  let currentPage = 1
  let totalPages = 1
  let filteredAccessories = []
  let currentCategory = "all"

  // Default accessories data
  const defaultAccessories = [
    {
      id: 1,
      name: "Funda para iPhone 16",
      /*price: 999,*/
      image: "https://placehold.co/400x400",
      category: "Funda",
      //colors: ["black", "teal", "white"],
      compatibility: ["iPhone 16"],
      description: "Experience the pinnacle of mobile technology with our premium smartphone.",
      features: [
        "Ultra-responsive 120Hz AMOLED display",
        "Professional-grade camera system",
        "All-day battery life with fast charging",
      ],
    },
    {
      id: 2,
      name: "Vidrio Templado iPhone 16 Pro",
      /*price: 1099,*/
      image: "https://placehold.co/400x400",
      category: "protector-de-pantalla",
      compatibility: ["iPhone 16"],
      //colors: ["black", "white", "gold"],
      description: "Experience the pinnacle of mobile technology with our premium smartphone.",
      features: [
        "Ultra-responsive 120Hz AMOLED display",
        "Professional-grade camera system",
        "All-day battery life with fast charging",
      ],
    },
    {
      id: 3,
      name: "AirPods 2",
      /*price: 1199,*/
      image: "https://placehold.co/400x400",
      category: "Auriculares",
      compatibility: ["all"],
      //colors: ["white"],
      description: "Experience the pinnacle of mobile technology with our premium smartphone.",
      features: [
        "Ultra-responsive 120Hz AMOLED display",
        "Professional-grade camera system",
        "All-day battery life with fast charging",
      ],
    },
    {
      id: 4,
      name: "AirPods Pro 2",
      /*price: 1299,*/
      image: "https://placehold.co/400x400",
      category: "Auriculares",
      compatibility: ["all"],
      //colors: ["white"],
      description: "Experience the pinnacle of mobile technology with our premium smartphone.",
      features: [
        "Ultra-responsive 120Hz AMOLED display",
        "Professional-grade camera system",
        "All-day battery life with fast charging",
      ],
    },
    {
      id: 5,
      name: "Funda para iPhone 15 Plus",
      /*price: 1399,*/
      image: "https://placehold.co/400x400",
      category: "Funda",
      //colors: ["blue", "black", "pink"],
      compatibility: ["iPhone 15"],
      description: "Experience the pinnacle of mobile technology with our premium smartphone.",
      features: [
        "Ultra-responsive 120Hz AMOLED display",
        "Professional-grade camera system",
        "All-day battery life with fast charging",
      ],
    },
    {
      id: 6,
      name: "Vidrio templado iPhone 11",
      /*price: 1499,*/
      image: "https://placehold.co/400x400",
      category: "protector-de-pantalla",
      compatibility: ["iPhone 11"],
      /*//colors: ["black", "white"],*/
      description: "Experience the pinnacle of mobile technology with our premium smartphone.",
      features: [
        "Ultra-responsive 120Hz AMOLED display",
        "Professional-grade camera system",
        "All-day battery life with fast charging",
      ],
    },
    {
      id: 7,
      name: "Vidrio Templado iPhone 12",
      /*price: 1599,*/
      image: "https://placehold.co/400x400",
      category: "protector-de-pantalla",
      compatibility: ["iPhone 12"],
      /*//colors: ["purple", "white", "black", "green"],*/
      description: "Experience the pinnacle of mobile technology with our premium smartphone.",
      features: [
        "Ultra-responsive 120Hz AMOLED display",
        "Professional-grade camera system",
        "All-day battery life with fast charging",
      ],
    },
    {
      id: 8,
      name: "Funda para iPhone 14",
      /*price: 1699,*/
      image: "https://placehold.co/400x400",
      //colors: ["black", "blue", "white", "red"],
      category: "Funda",
      compatibility: ["iPhone 14"],
      description: "Experience the pinnacle of mobile technology with our premium smartphone.",
      features: [
        "Ultra-responsive 120Hz AMOLED display",
        "Professional-grade camera system",
        "All-day battery life with fast charging",
      ],
    },
    {
      id: 9,
      name: "Funda para iPhone 12 Pro",
      /*price: 1799,*/
      image: "https://placehold.co/400x400",
      //colors: ["white", "black", "blue"],
      category: "Funda",
      compatibility: ["iPhone 12"],
      description: "Experience the pinnacle of mobile technology with our premium smartphone.",
      features: [
        "Ultra-responsive 120Hz AMOLED display",
        "Professional-grade camera system",
        "All-day battery life with fast charging",
      ],
    },
    {
      id: 10,
      name: "Cargador de iPhone",
      /*price: 1899,*/
      image: "https://placehold.co/400x400",
      category: "Cargador",
      compatibility: ["all"],
      //colors: ["black", "blue", "purple"],
      description: "Experience the pinnacle of mobile technology with our premium smartphone.",
      features: [
        "Ultra-responsive 120Hz AMOLED display",
        "Professional-grade camera system",
        "All-day battery life with fast charging",
      ],
    },
  ]

  // Load and display all products
  loadAccessories()

  // Event listeners
  applyFiltersBtn.addEventListener("click", () => {
    currentPage = 1
    applyFilters()
  })

  resetFiltersBtn.addEventListener("click", resetFilters)
  clearFiltersBtn.addEventListener("click", resetFilters)
  sortOrderSelect.addEventListener("change", applyFilters)

  // Category icon click handlers
  categoryIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      const category = this.getAttribute("data-category")
      currentCategory = category
      currentPage = 1

      // Update active state visually
      categoryIcons.forEach((icon) => icon.classList.remove("active"))
      this.classList.add("active")

      loadAccessories()
    })
  })

  // Handle pagination clicks
  paginationContainer.addEventListener("click", (e) => {
    e.preventDefault()

    // Find the closest anchor element (handles clicks on icons inside the buttons)
    const target = e.target.closest("a")
    if (!target) return

    // Don't process disabled buttons
    if (target.classList.contains("disabled")) return

    const pageAction = target.getAttribute("data-action")

    if (pageAction === "prev" && currentPage > 1) {
      currentPage--
      displayAccessories()
      updatePaginationUI()
      //window.scrollTo(0, 0)
    } else if (pageAction === "next" && currentPage < totalPages) {
      currentPage++
      displayAccessories()
      updatePaginationUI()
      //window.scrollTo(0, 0)
    } else if (pageAction === "page") {
      currentPage = Number.parseInt(target.getAttribute("data-page"))
      displayAccessories()
      updatePaginationUI()
      //window.scrollTo(0, 0)
    }
  })


  // Function to load all accessories
  function loadAccessories() {
    // Get custom accessories from localStorage
    const customAccessories = JSON.parse(localStorage.getItem("accessories")) || []

    // Combine default and custom accessories
    let allAccessories = [...defaultAccessories, ...customAccessories]

    // Filter by category if not "all"
    if (currentCategory !== "all") {
      allAccessories = allAccessories.filter((accessory) => accessory.category === currentCategory)
    }

    // Apply any active filters
    filteredAccessories = filterAccessories(allAccessories)

    // Sort accessories
    filteredAccessories = sortAccessories(filteredAccessories)

    // Calculate total pages
    totalPages = Math.ceil(filteredAccessories.length / accessoriesPerPage)

    // Ensure current page is valid
    if (currentPage > totalPages) {
      currentPage = totalPages > 0 ? totalPages : 1
    }

    // Display accessories for current page
    displayAccessories()

    // Update pagination UI
    updatePaginationUI()
  }

  // Function to display accessories for the current page
  function displayAccessories() {
    // Update results count
    resultsNumber.textContent = filteredAccessories.length

    // Clear the grid
    accessoriesGrid.innerHTML = ""

    // Show/hide no results message
    if (filteredAccessories.length === 0) {
      accessoriesGrid.style.display = "none"
      noResults.style.display = "block"
      paginationContainer.style.display = "none"
    } else {
      accessoriesGrid.style.display = "grid"
      noResults.style.display = "none"
      paginationContainer.style.display = "flex"

      // Calculate start and end indices for current page
      const startIndex = (currentPage - 1) * accessoriesPerPage
      const endIndex = Math.min(startIndex + accessoriesPerPage, filteredAccessories.length)

      // Add accessories to the grid for current page
      for (let i = startIndex; i < endIndex; i++) {
        const accessory = filteredAccessories[i]
        const accessoryCard = createAccessoryCard(accessory)
        accessoriesGrid.appendChild(accessoryCard)
      }
    }
  }

  // Function to update pagination UI
  function updatePaginationUI() {
    paginationContainer.innerHTML = ""

    if (totalPages <= 1) {
      return
    }

    // Previous button
    const prevBtn = document.createElement("a")
    prevBtn.href = "#"
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>'
    prevBtn.setAttribute("data-action", "prev")
    if (currentPage === 1) {
      prevBtn.classList.add("disabled")
    }
    paginationContainer.appendChild(prevBtn)

    // Page numbers
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      const pageLink = document.createElement("a")
      pageLink.href = "#"
      pageLink.textContent = i
      pageLink.setAttribute("data-action", "page")
      pageLink.setAttribute("data-page", i)

      if (i === currentPage) {
        pageLink.classList.add("active")
      }

      paginationContainer.appendChild(pageLink)
    }

    // Next button
    const nextBtn = document.createElement("a")
    nextBtn.href = "#"
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>'
    nextBtn.setAttribute("data-action", "next")
    if (currentPage === totalPages) {
      nextBtn.classList.add("disabled")
    }
    paginationContainer.appendChild(nextBtn)
  }

  
  // Function to create an accessory card
  function createAccessoryCard(accessory) {
    const card = document.createElement("div")
    card.className = "accessory-card"

    // Format compatibility text
    let compatibilityText = ""
    if (accessory.compatibility.includes("all")) {
      compatibilityText = "Compatible con todos los modelos"
    } else {
      compatibilityText = `Compatible con: ${accessory.compatibility.join(", ")}`
    }

    card.innerHTML = `
      <img src="${accessory.image}" alt="${accessory.name}" class="accessory-image">
      <div class="accessory-details">
          <span class="accessory-category">${formatCategoryName(accessory.category)}</span>
          <h3 class="accessory-name"><a href="Detalles-accesorios.html?id=${accessory.id}">${accessory.name}</a></h3>
          <p class="accessory-compatibility">${compatibilityText}</p>
      </div>
      <div class="accessory-button">
          <a href="Detalles-accesorios.html?id=${accessory.id}" class="btn2 btn-accent btn-full">
              <i class=""></i> Detalles
          </a>
      </div>
    `    

    return card
  }

  // Function to format category name for display
  function formatCategoryName(category) {
    const categoryMap = {
      fundas: "Funda",
      "screen-protectors": "Protector de pantalla",
      cargadores: "Cargador",
      auriculares: "Auriculares",
      cables: "Cable",
      stands: "Stand",
      "power-banks": "Power Bank",
    }

    return categoryMap[category] || category
  }

  // Function to filter accessories based on selected filters
  function filterAccessories(accessories) {
    /*const priceRange = priceRangeFilter.value*/
    const compatibility = compatibilityFilter.value
    const searchTerm = searchTermInput.value.toLowerCase().trim()

    return accessories.filter((accessory) => {

      // Filter by compatibility
      if (
        compatibility &&
        !accessory.compatibility.includes(compatibility) &&
        !accessory.compatibility.includes("all")
      ) {
        return false
      }

      // Filter by search term
      if (
        searchTerm &&
        !accessory.name.toLowerCase().includes(searchTerm) &&
        !accessory.description.toLowerCase().includes(searchTerm)
      ) {
        return false
      }

      return true
    })
  }

  // Function to sort accessories
  function sortAccessories(accessories) {
    const sortOrder = sortOrderSelect.value

    return accessories.sort((a, b) => {
      switch (sortOrder) {
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        default:
          return 0
      }
    })
  }

  // Function to apply filters
  function applyFilters() {
    loadAccessories()
  }

  // Function to reset filters
  function resetFilters() {
    /*priceRangeFilter.value = ""*/
    compatibilityFilter.value = ""
    searchTermInput.value = ""
    currentPage = 1
    currentCategory = "all"

    // Reset category icon active states
    categoryIcons.forEach((icon) => {
      icon.classList.remove("active")
      if (icon.getAttribute("data-category") === "all") {
        icon.classList.add("active")
      }
    })

    loadAccessories()
  }
})