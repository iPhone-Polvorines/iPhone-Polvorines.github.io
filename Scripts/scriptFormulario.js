document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const productForm = document.getElementById("product-form")
  const productNameInput = document.getElementById("product-name")
  const productImageInput = document.getElementById("product-image")
  const productDescriptionInput = document.getElementById("product-description")
  const featuresContainer = document.getElementById("features-container")
  const addFeatureBtn = document.getElementById("add-feature")
  const resetFormBtn = document.getElementById("reset-form")
  const cancelEditBtn = document.getElementById("cancel-edit")
  const alertSuccess = document.getElementById("alert-success")
  const alertError = document.getElementById("alert-error")
  const productsList = document.getElementById("products-list")
  const submitBtn = document.getElementById("submit-btn")
  const editProductIdInput = document.getElementById("edit-product-id")
  const successMessage = document.getElementById("success-message")

  // Track if we're in edit mode
  let isEditMode = false

  // Load existing products
  loadProducts()

  // Add feature button
  addFeatureBtn.addEventListener("click", () => {
    addFeatureField()
  })

  // Remove feature button
  featuresContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("feature-remove") || e.target.parentElement.classList.contains("feature-remove")) {
      const featureInput = e.target.closest(".feature-input")
      if (featuresContainer.children.length > 1) {
        featureInput.remove()
      } else {
        // Don't remove the last one, just clear it
        featureInput.querySelector(".feature-field").value = ""
      }
    }
  })

  // Reset form button
  resetFormBtn.addEventListener("click", () => {
    resetForm()
  })

  // Cancel edit button
  cancelEditBtn.addEventListener("click", () => {
    exitEditMode()
  })

  // Form submission
  productForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      showAlert(alertError)
      return
    }

    // Get form data
    const productData = getFormData()

    if (isEditMode) {
      // Update existing product
      updateProduct(productData)
      successMessage.textContent = "Producto actualizado!"
    } else {
      // Save new product
      saveProduct(productData)
      successMessage.textContent = "Producto agregado!"
    }

    // Show success message
    showAlert(alertSuccess)

    // Reset form
    exitEditMode()

    // Reload products list
    loadProducts()
  })

  // Add initial feature field
  if (featuresContainer.children.length === 0) {
    addFeatureField()
  }

  // Function to add a new feature field
  function addFeatureField(value = "") {
    const featureInput = document.createElement("div")
    featureInput.className = "feature-input"
    featureInput.innerHTML = `
            <input type="text" class="form-control feature-field" placeholder="e.g., Ultra-responsive 120Hz AMOLED display" value="${value}">
            <button type="button" class="btn btn-remove feature-remove"><i class="fas fa-trash"></i></button>
        `
    featuresContainer.appendChild(featureInput)
  }

  // Function to validate the form
  function validateForm() {
    // Check required fields
    if (
      !productNameInput.value ||
      /*!productPriceInput.value ||*/
      !productImageInput.value ||
      !productDescriptionInput.value
    ) {
      return false
    }

    // Check if at least one color is selected
    const colorCheckboxes = document.querySelectorAll('input[name="colors"]:checked')
    if (colorCheckboxes.length === 0) {
      return false
    }

    // Check if at least one feature is entered
    const features = getFeatures()
    if (features.length === 0) {
      return false
    }

    return true
  }

  // Function to get form data
  function getFormData() {
    // Get selected colors
    const selectedColors = []
    document.querySelectorAll('input[name="colors"]:checked').forEach((checkbox) => {
      selectedColors.push(checkbox.value)
    })

    // Get features
    const features = getFeatures()

    // Get existing products to determine next ID
    const products = JSON.parse(localStorage.getItem("products")) || []

    const id = isEditMode ? Number.parseInt(editProductIdInput.value) : products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 11

    const nextId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 11 /* <--- aca es desde que id empizan los priductos, como ya habian 10 productos puestos anteriormente, los siguiententes
                                                                                                productos empezaran desde el id 11 asi ningun producto tendra la misma id*/

    return {
      id: id,
      name: productNameInput.value,
      image: productImageInput.value,
      colors: selectedColors,
      description: productDescriptionInput.value,
      features: features,
    }
  }

  // Function to get features from the form
  function getFeatures() {
    const features = []
    document.querySelectorAll(".feature-field").forEach((field) => {
      if (field.value.trim()) {
        features.push(field.value.trim())
      }
    })
    return features
  }

  // Function to save product to localStorage
  function saveProduct(productData) {
    const products = JSON.parse(localStorage.getItem("products")) || []
    products.push(productData)
    localStorage.setItem("products", JSON.stringify(products))
  }

  // Function to update an existing product
  function updateProduct(productData) {
    const products = JSON.parse(localStorage.getItem("products")) || []
    const index = products.findIndex((p) => p.id === productData.id)

    if (index !== -1) {
      products[index] = productData
      localStorage.setItem("products", JSON.stringify(products))
    }
  }

  // Function to reset the form
  function resetForm() {
    productForm.reset()

    // Clear features
    featuresContainer.innerHTML = ""
    addFeatureField()

    // Hide alerts
    alertSuccess.style.display = "none"
    alertError.style.display = "none"
  }

  // Function to exit edit mode
  function exitEditMode() {
    isEditMode = false
    editProductIdInput.value = ""
    submitBtn.textContent = "Agregar Producto"
    cancelEditBtn.style.display = "none"
    resetForm()
  }

  // Function to enter edit mode
  function enterEditMode(product) {
    isEditMode = true
    editProductIdInput.value = product.id
    submitBtn.textContent = "Actualizar Producto"
    cancelEditBtn.style.display = "inline-block"

    // Fill the form with product data
    productNameInput.value = product.name
    productImageInput.value = product.image
    productDescriptionInput.value = product.description

    // Check the appropriate color checkboxes
    document.querySelectorAll('input[name="colors"]').forEach((checkbox) => {
      checkbox.checked = product.colors.includes(checkbox.value)
    })

    // Clear and add feature fields
    featuresContainer.innerHTML = ""
    product.features.forEach((feature) => {
      addFeatureField(feature)
    })

    // If no features, add an empty one
    if (product.features.length === 0) {
      addFeatureField()
    }

    // Scroll to the form
    productForm.scrollIntoView({ behavior: "smooth" })
  }


  // Function to show an alert
  function showAlert(alertElement) {
    // Hide all alerts
    alertSuccess.style.display = "none"
    alertError.style.display = "none"

    // Show the specified alert
    alertElement.style.display = "block"

    // Hide after 3 seconds
    setTimeout(() => {
      alertElement.style.display = "none"
    }, 3000)
  }

  // Function to load products from localStorage
  function loadProducts() {
    const products = JSON.parse(localStorage.getItem("products")) || []

    // Clear the products list
    productsList.innerHTML = ""

    // Add products to the table
    products.forEach((product) => {
      const row = document.createElement("tr")

      // Format colors for display
      const colorNames = {
        black: "Black",
        silver: "Silver",
        gold: "Gold",
        blue: "Blue",
        red: "Red",
        green: "Green",
        purple: "Purple",
        white: "White",
        teal: "Teal",
        pink: "Pink",
        graphite: "Graphite",
      }

      const colorsList = product.colors.map((color) => colorNames[color] || color).join(", ")

      row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${colorsList}</td>
                <td class="action-buttons">
                    <a href="Detalles-productos.html?id=${product.id}" class="btn btn-small">Ver</a>
                    <button class="btn btn-small btn-edit" data-id="${product.id}">Editar</button>
                    <button class="btn btn-small btn-remove" data-id="${product.id}">Borrar</button>
                </td>
            `

      productsList.appendChild(row)
    })

    // Add event listeners for edit buttons
    document.querySelectorAll(".btn-edit[data-id]").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = Number.parseInt(this.getAttribute("data-id"))
        editProduct(productId)
      })
    })

    // Add event listeners for delete buttons
    document.querySelectorAll(".btn-remove[data-id]").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = Number.parseInt(this.getAttribute("data-id"))
        deleteProduct(productId)
      })
    })
  }

  // Function to edit a product
  function editProduct(productId) {
    const products = JSON.parse(localStorage.getItem("products")) || []
    const product = products.find((p) => p.id === productId)

    if (product) {
      enterEditMode(product)
    }
  }

  // Function to delete a product
  function deleteProduct(productId) {
    if (confirm("¿Seguro que quieres borrar este producto?")) {
      const products = JSON.parse(localStorage.getItem("products")) || []
      const updatedProducts = products.filter((product) => product.id !== productId)
      localStorage.setItem("products", JSON.stringify(updatedProducts))
      loadProducts()
    }
  }
})



