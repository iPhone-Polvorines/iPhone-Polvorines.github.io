document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const accessoryImg = document.getElementById("accessory-img")
  const accessoryCategory = document.getElementById("accessory-category")
  const accessoryName = document.getElementById("accessory-name")
  const accessoryCompatibility = document.getElementById("accessory-compatibility")
  const accessoryDescription = document.getElementById("accessory-description")
  const featureList = document.getElementById("feature-list")
  const relatedAccessories = document.getElementById("related-accessories")

  // Get accessory ID from URL
  const urlParams = new URLSearchParams(window.location.search)
  const accessoryId = urlParams.get("id")

// Default accessories data (same as in accessories.js)
  const defaultAccessories = [
    {
      id: 1,
      name: "Funda para iPhone 16",
      //price: 49.99,
      image: "https://placehold.co/400x300",
      category: "cases",
      compatibility: ["iPhone 16"],
      description: "Elegant leather case with premium stitching and card slots.",
      features: [
        "Genuine leather construction",
        "Soft microfiber lining",
        "Card slots and cash pocket",
        "Magnetic closure",
      ],
    },
    {
      id: 2,
      name: "Vidrio Templado para iPhone 16 Pro",
      //price: 24.99,
      image: "https://placehold.co/400x300",
      category: "protector-de-pantalla",
      compatibility: ["iPhone 16"],
      description: "Ultra-clear tempered glass screen protector with 9H hardness.",
      features: [
        "9H hardness for scratch resistance",
        "Oleophobic coating repels fingerprints",
        "99.9% transparency",
        "Easy installation kit included",
      ],
    },
    {
      id: 3,
      name: "AirPods 2",
      //price: 59.99,
      image: "https://placehold.co/400x300",
      category: "headphones",
      compatibility: ["all"],
      description: "15W fast wireless charger with sleek design and LED indicator.",
      features: [
        "15W fast charging capability",
        "Qi-certified for safety",
        "LED charging indicator",
        "Anti-slip surface",
        "Overcharge protection",
      ],
    },
    {
      id: 4,
      name: "AirPods Pro 2",
      //price: 129.99,
      image: "https://placehold.co/400x300",
      category: "headphones",
      compatibility: ["all"],
      description: "Premium wireless earbuds with active noise cancellation and long battery life.",
      features: [
        "Active noise cancellation",
        "8-hour battery life (24 with case)",
        "IPX5 water resistance",
        "Touch controls",
        "Voice assistant compatible",
      ],
    },
    {
      id: 5,
      name: "Funda para iPhone 15 Plus",
      //price: 19.99,
      image: "https://placehold.co/400x300",
      category: "cases",
      compatibility: ["iPhone 15"],
      description: "Durable braided USB-C cable with fast charging support.",
      features: [
        "Nylon braided for durability",
        "2-meter length for convenience",
        "Fast charging support",
        "Data transfer up to 480Mbps",
        "Reinforced connectors",
      ],
    },
    {
      id: 6,
      name: "Vidrio templado para iPhone 11",
      //price: 29.99,
      image: "https://placehold.co/400x300",
      category: "protector-de-pantalla",
      compatibility: ["iPhone 11"],
      description: "Aluminum adjustable phone stand with multiple viewing angles.",
      features: [
        "Solid aluminum construction",
        "Adjustable viewing angles",
        "Non-slip silicone pads",
        "Cable management hole",
        "Foldable for portability",
      ],
    },
    {
      id: 7,
      name: "Vidrio Templado para iPhone 12",
      //price: 79.99,
      image: "https://placehold.co/400x300",
      category: "protector-de-pantalla",
      compatibility: ["iPhone 12"],
      description: "High-capacity power bank with fast charging and multiple ports.",
      features: [
        "20,000mAh capacity",
        "USB-C PD and QC 3.0 support",
        "Dual USB-A ports",
        "LED power indicator",
        "Compact design",
      ],
    },
    {
      id: 8,
      name: "Funda para iPhone 14",
      //price: 39.99,
      image: "https://placehold.co/400x300",
      category: "Funda",
      compatibility: ["iPhone 14"],
      description: "Military-grade drop protection case with built-in kickstand.",
      features: [
        "Military-grade drop protection",
        "Built-in kickstand",
        "Raised edges for screen protection",
        "Wireless charging compatible",
        "Tactile button covers",
      ],
    },
    {
      id: 9,
      name: "Funda para iPhone 12 Pro",
      //price: 29.99,
      image: "https://placehold.co/400x300",
      category: "Funda",
      compatibility: ["iPhone 12"],
      description: "Privacy screen protector that prevents side viewing.",
      features: [
        "Privacy filter blocks side views",
        "Tempered glass construction",
        "Anti-fingerprint coating",
        "Easy installation",
        "Case-friendly design",
      ],
    },
    {
      id: 10,
      name: "Cargador de iPhone",
      //price: 49.99,
      image: "https://placehold.co/400x300",
      category: "chargers",
      compatibility: ["all"],
      description: "Compact 65W GaN charger with multiple ports for all your devices.",
      features: [
        "65W total output",
        "GaN technology for compact size",
        "2 USB-C and 1 USB-A ports",
        "Foldable plug for travel",
        "Universal voltage compatibility",
      ],
    },
  ]

  if (accessoryId) {
    // First check if this is a custom accessory from localStorage
    const customAccessories = JSON.parse(localStorage.getItem("accessories")) || []
    const customAccessory = customAccessories.find((a) => a.id === Number(accessoryId))

    if (customAccessory) {
      // It's a custom accessory, load its data
      updateAccessoryDetails(customAccessory)
      loadRelatedAccessories(customAccessory)
    } else {
      // It's a default accessory
      const defaultAccessory = defaultAccessories.find((a) => a.id === Number(accessoryId))
      if (defaultAccessory) {
        updateAccessoryDetails(defaultAccessory)
        loadRelatedAccessories(defaultAccessory)
      } else {
        // Accessory not found, redirect to accessories page
        window.location.href = "Accesorios.html"
      }
    }
  } else {
    // No accessory ID provided, redirect to accessories page
    window.location.href = "Accesorios.html"
  }

  // Function to update accessory details
  function updateAccessoryDetails(accessory) {
    // Update page title
    document.title = `${accessory.name} - iPhone Polvorines`

    // Update accessory details
    if (accessoryImg) accessoryImg.src = accessory.image
    if (accessoryName) accessoryName.textContent = accessory.name
    if (accessoryCategory) accessoryCategory.textContent = formatCategoryName(accessory.category)

    // Update compatibility text
    if (accessoryCompatibility) {
      if (accessory.compatibility.includes("all")) {
        accessoryCompatibility.innerHTML = '<i class="fas fa-check-circle"></i> Compatible con todos los modelos'
      } else {
        accessoryCompatibility.innerHTML = `<i class="fas fa-check-circle"></i> Compatible con: ${accessory.compatibility.join(", ")}`
      }
      mensajeWspp()
    }

    // Update description
    if (accessoryDescription) {
      accessoryDescription.innerHTML = `<p>${accessory.description}</p>`
    }

    // Update features list
    if (featureList) {
      featureList.innerHTML = ""
      accessory.features.forEach((feature) => {
        const li = document.createElement("li")
        li.textContent = feature
        featureList.appendChild(li)
      })
    }
    mensajeWspp()
  }

  // Function to load related accessories
  function loadRelatedAccessories(currentAccessory) {
    if (!relatedAccessories) return

    // Get all accessories
    const allAccessories = [...defaultAccessories]

    // Filter out the current accessory and get accessories in the same category or compatible with the same phones
    let related = allAccessories.filter(
      (accessory) =>
        accessory.id !== currentAccessory.id &&
        (accessory.category === currentAccessory.category ||
          hasCommonCompatibility(accessory.compatibility, currentAccessory.compatibility)),
    )

    // Limit to 4 related accessories
    related = related.slice(0, 4)

    // Clear the container
    relatedAccessories.innerHTML = ""

    // Add related accessories
    related.forEach((accessory) => {
      const card = createAccessoryCard(accessory)
      relatedAccessories.appendChild(card)
    })
  }

  // Function to check if two compatibility arrays have common elements
  function hasCommonCompatibility(compat1, compat2) {
    // If either includes "all", they're compatible
    if (compat1.includes("all") || compat2.includes("all")) return true

    // Check for common elements
    return compat1.some((item) => compat2.includes(item))
  }

  // Function to create an accessory card for related accessories
  function createAccessoryCard(accessory) {
    const card = document.createElement("div")
    card.className = "accessory-card"

    card.innerHTML = `
      <img src="${accessory.image}" alt="${accessory.name}" class="accessory-card-image">
      <div class="accessory-card-details">
          <h3 class="accessory-card-name">${accessory.name}</h3>
      </div>
      <div class="accessory-card-button">
          <a href="Detalles-accesorios.html?id=${accessory.id}" class="btn2 btn-full">
              <i class="fas fa-info-circle"></i> Detalles
          </a>
      </div>
    `

    return card
  }

  // Function to format category name for display
  function formatCategoryName(category) {
    const categoryMap = {
      cases: "Case",
      "screen-protectors": "Screen Protector",
      chargers: "Charger",
      headphones: "Headphones",
      cables: "Cable",
      stands: "Stand",
      "power-banks": "Power Bank",
    }

    return categoryMap[category] || category
  }
})


function mensajeWspp() {
  const whatsappBtn = document.getElementById("whatsapp-btn")
   if (!whatsappBtn) return

  const accessoryName = document.getElementById("accessory-name")?.textContent || "Accessorio"
  
  // Create personalized message based on the product
  let mensaje = `Hola, Me gustaria saber el precio y stock del "${accessoryName}". Gracias`

  // Phone number - replace with your actual WhatsApp business number
  const phoneNumber = "541128612196" // Example: use your actual number here

  // Create WhatsApp URL with encoded message
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(mensaje)}`

  // Update the button href
  whatsappBtn.href = whatsappUrl
  whatsappBtn.setAttribute("target", "_blank")
}


            
            




