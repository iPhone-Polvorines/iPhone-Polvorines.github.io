// Script to update product details based on URL parameter
document.addEventListener("DOMContentLoaded", () => {
  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search)
  const productId = urlParams.get("id")

  if (productId) {
    // First check if this is a custom product from localStorage
    const customProducts = JSON.parse(localStorage.getItem("products")) || []
    const customProduct = customProducts.find((p) => p.id === Number(productId))

    if (customProduct) {
      // It's a custom product, load its data
      updateProductDetails(customProduct)
    } else {
      // It's a default product, use the switch statement
      updateDefaultProduct(productId)
    }
  }

  // Handle color selection
  const colorSelect = document.getElementById("color-select")
  if (colorSelect) {
    colorSelect.addEventListener("change", function () {
      updateColorPreview(this.value)
      mensajeWspp()  
    })
    // Initialize color preview with the default selected color
    updateColorPreview(colorSelect.value)
  }
})

// Function to update product details for a custom product
function updateProductDetails(product) {
  const productName = document.getElementById("product-name")
  /*const productPrice = document.getElementById("product-price")*/
  const productImg = document.getElementById("product-img")
  const colorSelect = document.getElementById("color-select")
  const featuresList = document.querySelector(".feature-list")
  const productDescription = document.querySelector(".product-description")

  if (productName) productName.textContent = product.name
  /*if (productPrice) productPrice.textContent = `$${product.price}`*/
  if (productImg) productImg.src = product.image || "https://placehold.co/600x600"

  // Update product description if available
  if (productDescription && product.description) {
    productDescription.innerHTML = `<p>${product.description}</p>`
  }

  // Update colors dropdown
  if (colorSelect) {
    // Clear existing options
    colorSelect.innerHTML = ""

    // Map of color values to display names
    const colorNames = {
      black: "Midnight Black",
      silver: "Silver",
      gold: "Gold",
      blue: "Deep Blue",
      red: "Ruby Red",
      green: "Emerald Green",
      purple: "Royal Purple",
      white: "Pearl White",
      greenblue: "Teal",
      pink: "Pink",
      graphite: "Graphite",
    }

    // Add new options based on available colors
    product.colors.forEach((color) => {
      const option = document.createElement("option")
      option.value = color
      option.textContent = colorNames[color] || color.charAt(0).toUpperCase() + color.slice(1)
      colorSelect.appendChild(option)
    })

    // Update the color preview
    if (product.colors.length > 0) {
      updateColorPreview(product.colors[0])
    }
  }

  // Update features list
  if (featuresList && product.features) {
    featuresList.innerHTML = ""
    product.features.forEach((feature) => {
      const li = document.createElement("li")
      li.textContent = feature
      featuresList.appendChild(li)
    })
  }
  mensajeWspp()

}

// Function to update product details for default products
function updateDefaultProduct(productId) {
  const productName = document.getElementById("product-name")
  /*const productPrice = document.getElementById("product-price")*/
  const productImg = document.getElementById("product-img")
  const featuresList = document.querySelector(".feature-list")
  const productDescription = document.querySelector(".product-description")

  // Product data with unique descriptions and features for each product
  const productData = {
    1: {
      name: "iPhone 16",
      /*price: "$999",*/
      image: "https://res.cloudinary.com/dvkc3eup2/image/upload/v1745517837/iPhone_16_grande_ulno5e.jpg",
      colors: ["black", "teal", "white"],
      description: "Con su procesador A18, disfrutarás de un rendimiento ultrarrápido, ideal para multitarea, juegos y productividad sin interrupciones. Su pantalla Super Retina XDR te ofrece colores vibrantes y detalles impresionantes, mientras que su cámara de 48 MP captura cada momento con una calidad profesional. Además, con una batería optimizada que dura hasta un 25% más, estarás siempre conectado y con la inteligencia artificial de Apple ahora está más avanzada que nunca, personalizando tu experiencia como nunca antes.",
      features: [
        "Carga inalámbrica de hasta 25 W",
        "Red 5G ultrarrápida",
        "Face ID",
        "Sistema avanzado de dos cámaras de 48 MP|Ultra gran angular de 12 MP",
        "Chip Chip A18",
        "Pantalla Super Retina XDR",
      ],
    },
    2: {
      name: "iPhone 16 Pro",
      /*price: "$1,099",*/
      image: "https://res.cloudinary.com/dvkc3eup2/image/upload/v1745517837/iPhone_16_grande_ulno5e.jpg",
      colors: ["black", "white", "gold"],
      description: "Un dispositivo diseñado para quienes buscan innovación, potencia y estilo en la palma de su mano. Con su pantalla Super Retina XDR de 6.1 pulgadas, experimentarás colores vibrantes y un brillo impresionante en cualquier condición de luz. Su procesador A18 Pro lleva la velocidad y la eficiencia a otro nivel, permitiéndote realizar múltiples tareas sin esfuerzo. Además, integra la nueva Apple Intelligence, una inteligencia artificial revolucionaria que optimiza tu experiencia, facilitando tareas y personalizando tu interacción con el dispositivo",
      features: [
        "Apple Intelligence (AI)",
        "Chip A18 Pro",
        "Sistema de cámaras Pro de 48 MP|Teleobjetivo",
        "USB-C Compatible con USB 3",
        "Red 5G ultrarrápida",
        "Grabacion de Videos en 4K",
      ],
    },
    3: {
      name: "iPhone 16 Pro Max",
      /*price: "$1,199",*/
      image: "https://res.cloudinary.com/dvkc3eup2/image/upload/v1745517837/iPhone_16_Pro_Max_grande_rw1ryp.jpg",
      colors: ["black", "gold", "white"],
      description: "El iPhone 16 Pro Max es el modelo más avanzado de la serie iPhone 16, ofreciendo características de alta gama para usuarios exigentes. El iPhone 16 Pro Max es el modelo más avanzado ofreciendo características de alta gama para usuarios exigentes. Con su impresionante pantalla Super Retina XDR de 6.9”, experimentarás colores más vibrantes y un brillo sin igual, perfecto para ver contenido en cualquier condición de luz. es solo un teléfono, es tu mejor herramienta para trabajo, entretenimiento y creatividad.",
      features: [
        "Apple Intelligence (AI)",
        "Chip A18 Pro",
        "Sistema de cámaras Pro de 48 MP|Teleobjetivo",
        "Compatible con USB 3",
        "Red 5G ultrarrápida",
        "Grabacion de Videos en 4K",
      ],
    },
    4: {
      name: "iPhone 12",
      /*price: "$1,299",*/
      image: "https://res.cloudinary.com/dvkc3eup2/image/upload/v1745517836/iPhone_12_grande_yam7zm.jpg",
      colors: ["green", "white"],
      description:
        "Con su pantalla Super Retina XDR de 6.1 pulgadas, disfrutarás de colores vibrantes y una calidad de imagen impresionante. Su chip A14 Bionic te garantiza un rendimiento rápido y fluido, ideal para juegos, aplicaciones y multitareas sin interrupciones. Además, su doble cámara de 12 MP con Modo Noche te permite capturar fotos y videos espectaculares en cualquier condición de luz.",
      features: [
        "Pantalla Super Retina XDR",
        "Resolución de 2532 x 1170 pixeles",
        "Chip A14 Bionic",
        "Cámara principal de 12 MP|Ultra gran angular",
        "Grabación de video 4K ",
        "Conectividad 5G",
      ],
    },
    5: {
      name: "iPhone 12 Pro",
      /*price: "$1,399",*/
      image: "https://res.cloudinary.com/dvkc3eup2/image/upload/v1745517835/iPhone_12_Pro_grande_t3ecgx.jpg",
      colors: ["blue", "black", "pink"],
      description:
        "Con su pantalla Super Retina XDR de 6.1 pulgadas, disfrutarás de colores vibrantes y una calidad de imagen impresionante. Su chip A14 Bionic te garantiza un rendimiento rápido y fluido, ideal para juegos, aplicaciones y multitareas sin interrupciones. Además, su doble cámara de 12 MP con Modo Noche te permite capturar fotos y videos espectaculares en cualquier condición de luz.",
      features: [
        "Pantalla Super Retina XDR de 6.1 pulgadas",
        "Resolución de 2532 x 1170 pixeles",
        "Chip A14 Bionic",
        "Sistema de 12 MP|Ultra gran angular",
        "Capacidad de hasta 512GB de alamcenamiento",
        "Conectividad 5G",
      ],
    },
    6: {
      name: "iPhone 12 Pro Max",
      /*price: "$1,499",*/
      image: "https://res.cloudinary.com/dvkc3eup2/image/upload/v1745517836/iPhone_12_Pro_Max_grande_lmkxox.jpg",
      colors: ["graphite", "gold", "white", "blue"],
      description:
        "Su diseño en acero inoxidable y Ceramic Shield lo hace más resistente que nunca, y con 5G, estarás siempre conectado a la máxima velocidad. Además, su triple cámara de 12 MP con sensor LiDAR te permite capturar fotos y videos con calidad profesional, incluso en condiciones de poca luz.",
      features: [
        "Pantalla Super Retina XDR de 6.1 pulgadas",
        "Chip A17 Pro",
        "Apple Intelligence (AI)",
        "Cámara principal de 12 MP|Teleobjetivo",
        "Red 5G ultrarrápida",
        "Capacidad de hasta 512GB de alamcenamiento",
        "Carga rápida",
      ],
    },
    7: {
      name: "iPhone 11",
      /*price: "$1,599",*/
      image: "https://res.cloudinary.com/dvkc3eup2/image/upload/v1745517829/iPhone_11_grande_dmeyjn.jpg",
      colors: ["purple", "white", "black", "green"],
      description:
        "El equilibrio perfecto entre rendimiento y accesibilidad. Con su pantalla Liquid Retina HD de 6.1 pulgadas, disfrutarás de colores vibrantes y una experiencia visual envolvente. Diseñado para resistir el día a día, es resistente al agua y al polvo, y su batería de larga duración te mantendrá conectado por más tiempo.",
      features: [
        "Chip A13 Bionic",
        "Sistema de dos cámaras de 12 MP|Ultra gran angular",
        "Grabación de video 4K",
        "Red 4G LTE",
        "Carga inalámbrica de hasta 7.5 W",
        "Face ID",
      ],
    },
    8: {
      name: "iPhone 11 Pro",
      /*price: "$1,699",*/
      image: "https://res.cloudinary.com/dvkc3eup2/image/upload/v1745517834/iPhone_11_Pro_grande_tp9wpi.jpg",
      colors: ["black", "blue", "white", "red"],
      description:
        "El equilibrio perfecto entre rendimiento y accesibilidad. Con su pantalla Liquid Retina HD de 6.1 pulgadas, disfrutarás de colores vibrantes y una experiencia visual envolvente. Diseñado para resistir el día a día, es resistente al agua y al polvo, y su batería de larga duración te mantendrá conectado por más tiempo.",
      features: [
        "Chip A13 Bionic",
        "Pantalla Super Retina XDR1 de 5.8 pulgadas",
        "Acero inoxidable y vidrio mate texturizado",
        "Cámara principal de 12 MP|Teleobjetivo",
        "Red 4G LTE",
      ],
    },
    9: {
      name: "iPhone 13",
      /*price: "$1,799",*/
      image: "https://res.cloudinary.com/dvkc3eup2/image/upload/v1745517836/iPhone_13_grande_rzz8rf.jpg",
      colors: ["white", "black", "blue", "green", "red"],
      description:
        "Su chip A15 Bionic ofrece un rendimiento ultrarrápido y eficiente, ideal para juegos, aplicaciones y multitareas sin esfuerzo. Además, su sistema de doble cámara de 12 MP con Modo Noche y Estilos Fotográficos captura fotos y videos impresionantes con calidad profesional. Con una batería de larga duración, compatibilidad con 5G y un diseño resistente con Ceramic Shield.",
      features: [
        "Chip A15 Bionic",
        "Carga rápida",
        "Grabación de video 4K",
        "Red 5G ultrarrápida",
        "Pantalla Super Retina XDR de 6.1 pulgadas",
        "Resolución de 2532 x 1170 pixeles",
      ],
    },
    10: {
      name: "iPhone 13 Pro",
      /*price: "$1,899",*/
      image: "https://res.cloudinary.com/dvkc3eup2/image/upload/v1745517837/iPhone_13_Pro_grande_xnp5vj.jpg",
      colors: ["graphite", "blue", "green"],
      description:
        "Su sistema de triple cámara de 12 MP con Teleobjetivo, Gran Angular y Ultra Gran Angular, junto con el sensor LiDAR, te permite capturar fotos y videos profesionales, incluso en condiciones de poca luz. Además, el Modo Cine lleva la grabación de video a otro nivel con efectos de desenfoque dinámico. Con una batería de hasta 22 horas de reproducción de video, compatibilidad con 5G y un diseño en acero inoxidable con Ceramic Shield, no solo es potente, sino también increíblemente resistente.",
      features: [
        "Acero inoxidable con parte posterior de vidrio mate texturizado",
        "Chip A15 Bionic",
        "Tecnología ProMotion",
        "Lightning Compatible con USB 2",
        "Red 5G ultrarrápida",
        "Capacidad de hasta 1TB de alamcenamiento",
      ],
    },
  }

  // Get the product data or use default if not found
  const product = productData[productId] || {
    name: "iPhone",
    /*price: "$1,299",*/
    image: "https://placehold.co/600x600",
    colors: ["black", "silver", "gold"],
    description:
      "Experience the pinnacle of mobile technology with our premium smartphone. This device combines cutting-edge features with elegant design to deliver an unparalleled user experience.",
    features: [
      "Ultra-responsive 120Hz AMOLED display",
      "Professional-grade camera system",
      "All-day battery life with fast charging",
      "Advanced AI capabilities",
      "Premium build quality with luxury materials",
    ],
  }

  // Update product details
  if (productName) productName.textContent = product.name
  /*if (productPrice) productPrice.textContent = product.price*/
  if (productImg) productImg.src = product.image

  // Update product description
  if (productDescription) {
    productDescription.innerHTML = `<p>${product.description}</p>`
  }

  // Update colors dropdown
  updateProductColors(product.colors)

  // Update features list
  if (featuresList) {
    featuresList.innerHTML = ""
    product.features.forEach((feature) => {
      const li = document.createElement("li")
      li.textContent = feature
      featuresList.appendChild(li)
    })
  }
  mensajeWspp()
}

// Function to update available colors for a product
function updateProductColors(availableColors) {
  const colorSelect = document.getElementById("color-select")

  if (!colorSelect) return

  // Clear existing options
  colorSelect.innerHTML = ""

  // Map of color values to display names
  const colorNames = {
    black: "Midnight Black",
    silver: "Silver",
    gold: "Gold",
    blue: "Deep Blue",
    red: "Ruby Red",
    green: "Emerald Green",
    purple: "Royal Purple",
    white: "Pearl White",
    teal: "Teal",
    pink: "Pink",
    graphite: "Graphite",
  }

  // Add new options based on available colors
  availableColors.forEach((color) => {
    const option = document.createElement("option")
    option.value = color
    option.textContent = colorNames[color] || color.charAt(0).toUpperCase() + color.slice(1)
    colorSelect.appendChild(option)
  })

  // Update the color preview
  updateColorPreview(colorSelect.value)
}

// Function to update the color preview
function updateColorPreview(colorValue) {
  const colorPreview = document.getElementById("color-preview")
  if (!colorPreview) return

  // Map color names to hex values
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
    graphite: "#454545",
  }

  // Update the color preview
  colorPreview.style.backgroundColor = colorMap[colorValue] || "#000000"
}

function mensajeWspp() {
  const whatsappBtn = document.getElementById("whatsapp-btn")
   if (!whatsappBtn) return

  const productName = document.getElementById("product-name")?.textContent || "iPhone"
  const colorSelect = document.getElementById("color-select")

  // Get the selected color display name
  const colorNames = {
    black: "Midnight Black",
    silver: "Silver",
    gold: "Gold",
    blue: "Deep Blue",
    red: "Ruby Red",
    green: "Emerald Green",
    purple: "Royal Purple",
    white: "Pearl White",
    teal: "Teal",
    pink: "Pink",
    graphite: "Graphite",
  }

  const selectedColor = colorSelect ? colorNames[colorSelect.value] || colorSelect.value : "Black"

  // Create personalized message based on the product
  let mensaje = `Hola, Me gustaria saber el precio y stock del "${productName}", Color: "${selectedColor}". Gracias`


  // Add product-specific questions based on the product name
  /*if (productName.includes("1")) {
    message += " Does it come with a warranty?"
  } else if (productName.includes("4") || productName.includes("10")) {
    message += " I'm particularly interested in the camera capabilities. Can you tell me more about them?"
  } else if (productName.includes("5")) {
    message += " How does the cooling system perform during extended gaming sessions?"
  } else if (productName.includes("6")) {
    message += " What security features does it offer for business users?"
  } else if (productName.includes("8")) {
    message += " How durable is it for outdoor activities?"
  } else if (productName.includes("9")) {
    message += " Can you tell me more about its eco-friendly features?"
  } else if (productName.includes("11") || productName.includes("12")) {
    message += " Is there a waiting list for this premium model?"
  }*/

  // Phone number - replace with your actual WhatsApp business number
  const phoneNumber = "541128612196" // Example: use your actual number here

  // Create WhatsApp URL with encoded message
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(mensaje)}`

  // Update the button href
  whatsappBtn.href = whatsappUrl
  whatsappBtn.setAttribute("target", "_blank")
}
