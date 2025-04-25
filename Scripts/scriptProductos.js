document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const productsGrid = document.getElementById("products-grid")
  const noResults = document.getElementById("no-results")
  const resultsNumber = document.getElementById("results-number")
  /*const priceRangeFilter = document.getElementById("price-range")*/
  const colorFilter = document.getElementById("color-filter")
  const searchTermInput = document.getElementById("search-term")
  const sortOrderSelect = document.getElementById("sort-order")
  const applyFiltersBtn = document.getElementById("apply-filters")
  const resetFiltersBtn = document.getElementById("reset-filters")
  const clearFiltersBtn = document.getElementById("clear-filters")
  const paginationContainer = document.getElementById("pagination")

  // Pagination settings
  const productsPerPage = 12
  let currentPage = 1
  let totalPages = 1
  let filteredProducts = []


  // Cambiar la estetica de las grillas de los productos en el catalogo
  const defaultProducts = [
    {
      id: 1,
      name: "iPhone 16",
      /*price: 999,*/
      image: "https://res.cloudinary.com/dvkc3eup2/image/upload/v1745452783/iPhone_16_exiylt.jpg",
      colors: ["black", "teal", "white"],
      description: "Experience the pinnacle of mobile technology with our premium smartphone.",
      features: [
        "Ultra-responsive 120Hz AMOLED display",
        "Professional-grade camera system",
        "All-day battery life with fast charging",
      ],
    },
    {
      id: 2,
      name: "iPhone 16 Pro",
      /*price: 1099,*/
      image: "https://res.cloudinary.com/dvkc3eup2/image/upload/v1745452783/iPhone_16_exiylt.jpg",
      colors: ["black", "white", "gold"],
      description: "Experience the pinnacle of mobile technology with our premium smartphone.",
      features: [
        "Ultra-responsive 120Hz AMOLED display",
        "Professional-grade camera system",
        "All-day battery life with fast charging",
      ],
    },
    {
      id: 3,
      name: "iPhone 16 Pro Max",
      /*price: 1199,*/
      image: "https://res.cloudinary.com/dvkc3eup2/image/upload/v1745452783/iPhone_16_pro_max_sodpwt.jpg",
      colors: ["black", "gold", "white"],
      description: "Experience the pinnacle of mobile technology with our premium smartphone.",
      features: [
        "Ultra-responsive 120Hz AMOLED display",
        "Professional-grade camera system",
        "All-day battery life with fast charging",
      ],
    },
    {
      id: 4,
      name: "iPhone 12",
      /*price: 1299,*/
      image: "https://res.cloudinary.com/dvkc3eup2/image/upload/v1745452784/iPhone_12_xl7mvf.jpg",
      colors: ["green", "white"],
      description: "Experience the pinnacle of mobile technology with our premium smartphone.",
      features: [
        "Ultra-responsive 120Hz AMOLED display",
        "Professional-grade camera system",
        "All-day battery life with fast charging",
      ],
    },
    {
      id: 5,
      name: "iPhone 12 Pro",
      /*price: 1399,*/
      image: "https://res.cloudinary.com/dvkc3eup2/image/upload/v1745452784/iPhone_12_pro_khufjq.jpg",
      colors: ["blue", "black", "pink"],
      description: "Experience the pinnacle of mobile technology with our premium smartphone.",
      features: [
        "Ultra-responsive 120Hz AMOLED display",
        "Professional-grade camera system",
        "All-day battery life with fast charging",
      ],
    },
    {
      id: 6,
      name: "iPhone 12 Pro Max",
      /*price: 1499,*/
      image: "https://res.cloudinary.com/dvkc3eup2/image/upload/v1745452784/iPhone_12_pro_max_muqhal.jpg",
      colors: ["black", "white"],
      description: "Experience the pinnacle of mobile technology with our premium smartphone.",
      features: [
        "Ultra-responsive 120Hz AMOLED display",
        "Professional-grade camera system",
        "All-day battery life with fast charging",
      ],
    },
    {
      id: 7,
      name: "iPhone 11",
      /*price: 1599,*/
      image: "https://res.cloudinary.com/dvkc3eup2/image/upload/v1745452784/iPhone_11_efjj9c.jpg",
      colors: ["purple", "white", "black", "green"],
      description: "Experience the pinnacle of mobile technology with our premium smartphone.",
      features: [
        "Ultra-responsive 120Hz AMOLED display",
        "Professional-grade camera system",
        "All-day battery life with fast charging",
      ],
    },
    {
      id: 8,
      name: "iPhone 11 Pro",
      /*price: 1699,*/
      image: "https://res.cloudinary.com/dvkc3eup2/image/upload/v1745452783/iPhone_11_pro_okk1wt.jpg",
      colors: ["black", "blue", "white", "red"],
      description: "Experience the pinnacle of mobile technology with our premium smartphone.",
      features: [
        "Ultra-responsive 120Hz AMOLED display",
        "Professional-grade camera system",
        "All-day battery life with fast charging",
      ],
    },
    {
      id: 9,
      name: "iPhone 13",
      /*price: 1799,*/
      image: "https://res.cloudinary.com/dvkc3eup2/image/upload/v1745452785/iPhone_13_iayv67.jpg",
      colors: ["white", "black", "blue"],
      description: "Experience the pinnacle of mobile technology with our premium smartphone.",
      features: [
        "Ultra-responsive 120Hz AMOLED display",
        "Professional-grade camera system",
        "All-day battery life with fast charging",
      ],
    },
    {
      id: 10,
      name: "iPhone 13 Pro",
      /*price: 1899,*/
      image: "https://res.cloudinary.com/dvkc3eup2/image/upload/v1745452784/iPhone_13_Pro_wepmjj.jpg",
      colors: ["black", "blue", "purple"],
      description: "Experience the pinnacle of mobile technology with our premium smartphone.",
      features: [
        "Ultra-responsive 120Hz AMOLED display",
        "Professional-grade camera system",
        "All-day battery life with fast charging",
      ],
    },
  ]

  // Load and display all products
  loadProducts()

  // Event listeners
  applyFiltersBtn.addEventListener("click", () => {
    currentPage = 1
    applyFilters()
  })

  // Event listeners
  applyFiltersBtn.addEventListener("click", applyFilters)
  resetFiltersBtn.addEventListener("click", resetFilters)
  clearFiltersBtn.addEventListener("click", resetFilters)
  sortOrderSelect.addEventListener("change", applyFilters)

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
      displayProducts()
      updatePaginationUI()
      //window.scrollTo(0, 0)
    } else if (pageAction === "next" && currentPage < totalPages) {
      currentPage++
      displayProducts()
      updatePaginationUI()
      //window.scrollTo(0, 0)
    } else if (pageAction === "page") {
      currentPage = Number.parseInt(target.getAttribute("data-page"))
      displayProducts()
      updatePaginationUI()
      //window.scrollTo(0, 0)
    }
  })


  // Function to load all products
  function loadProducts() {
    // Get custom products from localStorage
    const customProducts = JSON.parse(localStorage.getItem("products")) || []

    // Combine default and custom products
    const allProducts = [...defaultProducts, ...customProducts]

    // Apply any active filters
    filteredProducts = filterProducts(allProducts)

    // Sort products
    filteredProducts = sortProducts(filteredProducts)

    // Calculate total pages
    totalPages = Math.ceil(filteredProducts.length / productsPerPage)

    // Ensure current page is valid
    if (currentPage > totalPages) {
      currentPage = totalPages > 0 ? totalPages : 1
    }

    // Display products for current page
    displayProducts()

    // Update pagination UI
    updatePaginationUI()
  }

  // Function to display products for the current page
  function displayProducts() {
    // Update results count
    resultsNumber.textContent = filteredProducts.length

    // Clear the grid
    productsGrid.innerHTML = ""

    // Show/hide no results message
    if (filteredProducts.length === 0) {
      productsGrid.style.display = "none"
      noResults.style.display = "block"
      paginationContainer.style.display = "none"
    } else {
      productsGrid.style.display = "grid"
      noResults.style.display = "none"
      paginationContainer.style.display = "flex"

      // Calculate start and end indices for current page
      const startIndex = (currentPage - 1) * productsPerPage
      const endIndex = Math.min(startIndex + productsPerPage, filteredProducts.length)

      // Add products to the grid for current page
      for (let i = startIndex; i < endIndex; i++) {
        const product = filteredProducts[i]
        const productCard = createProductCard(product)
        productsGrid.appendChild(productCard)
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
    prevBtn.href = "#products-grid"
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
      pageLink.href = "#products-grid"
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
    nextBtn.href = "Mas-productos.html#products-grid"
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>'
    nextBtn.setAttribute("data-action", "next")
    if (currentPage === totalPages) {
      nextBtn.classList.add("disabled")
    }
    paginationContainer.appendChild(nextBtn)
  }


  // Function to create a product card
  function createProductCard(product) {
    const card = document.createElement("div")
    card.className = "phone-card"

    // Create color dots HTML
    let colorDotsHTML = ""
    const colorMap = {
      black: "#000000",
      silver: "#C0C0C0",
      gold: "#FFD700",
      blue: "#0047AB",
      red: "#B22222",
      green: "#2E8B57",
      purple: "#800080",
      white: "#FFFFFF",
      teal: "#008080",
      pink: "#e293ed",
      graphite: "#454545"
    }

    product.colors.forEach((color) => {
      const colorHex = colorMap[color] || "#000000"
      const border = color === "white" ? "border: 1px solid #ccc;" : ""
      colorDotsHTML += `<span class="color-dot" style="background-color: ${colorHex}; ${border}"></span>` 
    })

    card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="phone-image">
            <div class="phone-details">
                <h3 class="phone-name"><a href="Detalles-productos.html?id=${product.id}">${product.name}</a></h3>
                
                <div class="phone-colors">
                    ${colorDotsHTML}
                </div>
            </div>
            <div class="phone-button">
                <a href="Detalles-productos.html?id=${product.id}" class="btn2 btn-accent btn-full">
                    <i class=""></i> Detalles
                </a>
            </div>
        `

    return card
  }

  // Function to filter products based on selected filters
  function filterProducts(products) {
    /*const priceRange = priceRangeFilter.value*/
    const color = colorFilter.value
    const searchTerm = searchTermInput.value.toLowerCase().trim()

    return products.filter((product) => {
      // Filter by price range
      /*if (priceRange) {
        const price = Number.parseFloat(
          typeof product.price === "string" ? product.price.replace(/[^0-9.]/g, "") : product.price,
        )

        if (priceRange === "0-999" && price >= 1000) return false
        if (priceRange === "1000-1499" && (price < 1000 || price >= 1500)) return false
        if (priceRange === "1500-1999" && (price < 1500 || price >= 2000)) return false
        if (priceRange === "2000+" && price < 2000) return false
      }*/

      // Filter by color
      if (color && !product.colors.includes(color)) return false

      // Filter by search term
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm)) return false

      return true
    })
  }

  // Function to sort products
  function sortProducts(products) {
    const sortOrder = sortOrderSelect.value

    return products.sort((a, b) => {

      switch (sortOrder) {
        case "name-asc":
          return b.name.localeCompare(a.name)
        case "name-desc":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })
  }

  // Function to apply filters
  function applyFilters() {
    loadProducts()
  }

  // Function to reset filters
  function resetFilters() {
    /*priceRangeFilter.value = ""*/
    colorFilter.value = ""
    searchTermInput.value = ""
    sortOrderSelect.value = "price-desc"
    loadProducts()
  }
})

