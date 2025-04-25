document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const accessoryForm = document.getElementById("accessory-form")
  const accessoryNameInput = document.getElementById("accessory-name")
  const accessoryImageInput = document.getElementById("accessory-image")
  const accessoryCategoryInput = document.getElementById("accessory-category")
  const accessoryDescriptionInput = document.getElementById("accessory-description")
  const featuresContainer = document.getElementById("features-container")
  const addFeatureBtn = document.getElementById("add-feature")
  const resetFormBtn = document.getElementById("reset-form")
  const cancelEditBtn = document.getElementById("cancel-edit")
  const alertSuccess = document.getElementById("alert-success")
  const alertError = document.getElementById("alert-error")
  const accessoriesList = document.getElementById("accessories-list")
  const submitBtn = document.getElementById("submit-btn")
  const editAccessoryIdInput = document.getElementById("edit-accessory-id")
  const successMessage = document.getElementById("success-message")
  const compatAllCheckbox = document.getElementById("compat-all")

  // Track if we're in edit mode
  let isEditMode = false

  // Load existing accessories
  loadAccessories()

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

  // "All Models" checkbox handler
  compatAllCheckbox.addEventListener("change", function () {
    const compatCheckboxes = document.querySelectorAll('input[name="compatibility"]')

    if (this.checked) {
      // If "All Models" is checked, disable other checkboxes
      compatCheckboxes.forEach((checkbox) => {
        if (checkbox.id !== "compat-all") {
          checkbox.checked = false
          checkbox.disabled = true
        }
      })
    } else {
      // If "All Models" is unchecked, enable other checkboxes
      compatCheckboxes.forEach((checkbox) => {
        if (checkbox.id !== "compat-all") {
          checkbox.disabled = false
        }
      })
    }
  })

  // Form submission
  accessoryForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      showAlert(alertError)
      return
    }

    // Get form data
    const accessoryData = getFormData()

    if (isEditMode) {
      // Update existing accessory
      updateAccessory(accessoryData)
      successMessage.textContent = "Accessorio actualizado!"
    } else {
      // Save new accessory
      saveAccessory(accessoryData)
      successMessage.textContent = "Accessorio agregado!"
    }

    // Show success message
    showAlert(alertSuccess)

    // Reset form and exit edit mode
    exitEditMode()

    // Reload accessories list
    loadAccessories()
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
      <input type="text" class="form-control feature-field" placeholder="e.g., Premium materials" value="${value}">
      <button type="button" class="btn btn-remove feature-remove"><i class="fas fa-trash"></i></button>
    `
    featuresContainer.appendChild(featureInput)
  }

  // Function to validate the form
  function validateForm() {
    // Check required fields
    if (
      !accessoryNameInput.value ||
      !accessoryImageInput.value ||
      !accessoryCategoryInput.value ||
      !accessoryDescriptionInput.value
    ) {
      return false
    }

    // Check if at least one compatibility option is selected
    const compatibilityCheckboxes = document.querySelectorAll('input[name="compatibility"]:checked')
    if (compatibilityCheckboxes.length === 0) {
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
    // Get selected compatibility options
    const selectedCompatibility = []
    document.querySelectorAll('input[name="compatibility"]:checked').forEach((checkbox) => {
      selectedCompatibility.push(checkbox.value)
    })

    // Get features
    const features = getFeatures()

    // Get existing accessories to determine next ID
    const accessories = JSON.parse(localStorage.getItem("accessories")) || []

    // If in edit mode, use the existing ID, otherwise generate a new one
    const id = isEditMode ? Number.parseInt(editAccessoryIdInput.value) : accessories.length > 0 ? Math.max(...accessories.map((a) => a.id)) + 1 : 11

    return {
      id: id,
      name: accessoryNameInput.value,
      image: accessoryImageInput.value,
      category: accessoryCategoryInput.value,
      compatibility: selectedCompatibility,
      description: accessoryDescriptionInput.value,
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

  // Function to save accessory to localStorage
  function saveAccessory(accessoryData) {
    const accessories = JSON.parse(localStorage.getItem("accessories")) || []
    accessories.push(accessoryData)
    localStorage.setItem("accessories", JSON.stringify(accessories))
  }

  // Function to update an existing accessory
  function updateAccessory(accessoryData) {
    const accessories = JSON.parse(localStorage.getItem("accessories")) || []
    const index = accessories.findIndex((a) => a.id === accessoryData.id)

    if (index !== -1) {
      accessories[index] = accessoryData
      localStorage.setItem("accessories", JSON.stringify(accessories))
    }
  }

  // Function to reset the form
  function resetForm() {
    accessoryForm.reset()

    // Clear features
    featuresContainer.innerHTML = ""
    addFeatureField()

    // Enable all compatibility checkboxes
    document.querySelectorAll('input[name="compatibility"]').forEach((checkbox) => {
      checkbox.disabled = false
    })

    // Hide alerts
    alertSuccess.style.display = "none"
    alertError.style.display = "none"
  }

  // Function to exit edit mode
  function exitEditMode() {
    isEditMode = false
    editAccessoryIdInput.value = ""
    submitBtn.textContent = "Agregar Accessorio"
    cancelEditBtn.style.display = "none"
    resetForm()
  }

  // Function to enter edit mode
  function enterEditMode(accessory) {
    isEditMode = true
    editAccessoryIdInput.value = accessory.id
    submitBtn.textContent = "Actualizar Accessorio"
    cancelEditBtn.style.display = "inline-block"

    // Fill the form with accessory data
    accessoryNameInput.value = accessory.name
    /*accessoryPriceInput.value = accessory.price.toString()*/
    accessoryImageInput.value = accessory.image
    accessoryCategoryInput.value = accessory.category
    accessoryDescriptionInput.value = accessory.description

    // Check the appropriate compatibility checkboxes
    document.querySelectorAll('input[name="compatibility"]').forEach((checkbox) => {
      checkbox.checked = accessory.compatibility.includes(checkbox.value)

      // If "All Models" is checked, disable other checkboxes
      if (checkbox.id === "compat-all" && checkbox.checked) {
        document.querySelectorAll('input[name="compatibility"]').forEach((cb) => {
          if (cb.id !== "compat-all") {
            cb.disabled = true
          }
        })
      }
    })

    // Clear and add feature fields
    featuresContainer.innerHTML = ""
    accessory.features.forEach((feature) => {
      addFeatureField(feature)
    })

    // If no features, add an empty one
    if (accessory.features.length === 0) {
      addFeatureField()
    }

    // Scroll to the form
    accessoryForm.scrollIntoView({ behavior: "smooth" })
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

  // Function to load accessories from localStorage
  function loadAccessories() {
    const accessories = JSON.parse(localStorage.getItem("accessories")) || []

    // Clear the accessories list
    accessoriesList.innerHTML = ""

    // Add accessories to the table
    accessories.forEach((accessory) => {
      const row = document.createElement("tr")

      // Format compatibility for display
      let compatibilityText = ""
      if (accessory.compatibility.includes("all")) {
        compatibilityText = "Todos los Modelos"
      } else {
        compatibilityText = accessory.compatibility.join(", ")
      }

      // Format category for display
      const categoryMap = {
        cases: "Fundas",
        "screen-protectors": "Protector de pantalla",
        chargers: "Cargador",
        headphones: "Auriculares",
        cables: "Cable",
        stands: "Stand",
        "power-banks": "Power Bank",
      }

      const categoryDisplay = categoryMap[accessory.category] || accessory.category

      row.innerHTML = `
        <td>${accessory.id}</td>
        <td>${accessory.name}</td>
        <td><span class="category-badge">${categoryDisplay}</span></td>
        <td>${compatibilityText}</td>
        <td class="action-buttons">
            <a href="Detalles-accesorios.html?id=${accessory.id}" class="btn btn-small">Ver</a>
            <button class="btn btn-small btn-edit" data-id="${accessory.id}">Editar</button>
            <button class="btn btn-small btn-remove" data-id="${accessory.id}">Borrar</button>
        </td>
      `

      accessoriesList.appendChild(row)
    })

    // Add event listeners for edit buttons
    document.querySelectorAll(".btn-edit[data-id]").forEach((button) => {
      button.addEventListener("click", function () {
        const accessoryId = Number.parseInt(this.getAttribute("data-id"))
        editAccessory(accessoryId)
      })
    })

    // Add event listeners for delete buttons
    document.querySelectorAll(".btn-remove[data-id]").forEach((button) => {
      button.addEventListener("click", function () {
        const accessoryId = Number.parseInt(this.getAttribute("data-id"))
        deleteAccessory(accessoryId)
      })
    })
  }

  // Function to edit an accessory
  function editAccessory(accessoryId) {
    const accessories = JSON.parse(localStorage.getItem("accessories")) || []
    const accessory = accessories.find((a) => a.id === accessoryId)

    if (accessory) {
      enterEditMode(accessory)
    }
  }

  // Function to delete an accessory
  function deleteAccessory(accessoryId) {
    if (confirm("¿Seguro que quieres borrar este producto?")) {
      const accessories = JSON.parse(localStorage.getItem("accessories")) || []
      const updatedAccessories = accessories.filter((accessory) => accessory.id !== accessoryId)
      localStorage.setItem("accessories", JSON.stringify(updatedAccessories))
      loadAccessories()
    }
  }
})




