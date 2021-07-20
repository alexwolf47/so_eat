const axios = require('axios').default;

window.addEventListener('load', () => {
    ctaButton = document.querySelector(".js-cta")
    submitButton = document.querySelector(".js-form-submit")
    productPageElement = document.querySelector(".js-product-page")
    addressPage = document.querySelector(".js-address-page")
    completionPage = document.querySelector(".js-complete-page")

    ctaButton.addEventListener("click", () => {
        axios.get("/api/products")
            .then(function (response) {
                ctaButton.classList.add("is-hidden")
                constructProductPage(productPageElement, response)

            })
            .catch(function (error) {
                // handle error
                ctaButton.innerHTML = error.response.data.error
                ctaButton.value = error.response.data.error
                ctaButton.classList.add("is-invalid")
                setTimeout(function () {
                    ctaButton = document.querySelector(".js-form-submit")
                    ctaButton.classList.remove("is-invalid")
                }, 500)
                return
            })
    })

    addInputBlurValidation()

    submitButton.addEventListener("click", () => {
        submitButton.classList.remove("is-invalid")
        submitOrder()
    }
    )
})

function constructProductPage(productPageElement, response) {
    const selectedPartition = document.querySelector(".js-selected-partition")

    productPageElement.classList.add("is-shown")
    response.data.map(product => {
        const productDiv = document.createElement("div")
        productDiv.classList.add("c-hero-product")
        const productTitle = document.createElement("p")
        const productTitleText = document.createTextNode(product.name)
        productTitle.appendChild(productTitleText)
        productDiv.appendChild(productTitle)
        const skuContainer = document.createElement("div")
        skuContainer.classList.add("c-hero-product-button-container")

        product.skus.map(sku => {
            const skuDiv = document.createElement("div")
            skuDiv.classList.add("c-hero-product-button")
            const skuTitle = document.createTextNode(sku.name)
            skuDiv.appendChild(skuTitle)
            if (!sku.has_stock) {
                skuDiv.classList.add("out-of-stock")
            } else {
                skuDiv.addEventListener("click", () => {
                    selectedPartition.value = sku.id
                    productPageElement.classList.remove("is-shown")
                    addressPage.classList.add("is-shown")
                })
            }
            skuContainer.appendChild(skuDiv)
        })
        productDiv.appendChild(skuContainer)
        const outOfStockTooltip = document.createElement("p")
        const outOfStockTooltipText = document.createTextNode("* red = out of stock")
        outOfStockTooltip.appendChild(outOfStockTooltipText)
        productDiv.appendChild(outOfStockTooltip)
        productPageElement.appendChild(productDiv)
    }
    )
}

function addInputBlurValidation() {
    nameInput = document.querySelector(".js-name-input")
    emailInput = document.querySelector(".js-email-input")
    line1Input = document.querySelector(".js-line1-input")
    postcodeInput = document.querySelector(".js-postcode-input")
    townInput = document.querySelector(".js-town-input")
    countyInput = document.querySelector(".js-county-input")

    nameInput.addEventListener("blur", () => {
        if (validName(nameInput.value)) {
            nameInput.classList.remove("is-invalid")
        } else {
            nameInput.classList.add("is-invalid")
        }
    })

    emailInput.addEventListener("blur", () => {
        if (validEmail(emailInput.value)) {
            emailInput.classList.remove("is-invalid")
        } else {
            emailInput.classList.add("is-invalid")
        }
    })

    postcodeInput.addEventListener("blur", () => {
        if (validPostcode(postcodeInput.value)) {
            postcodeInput.classList.remove("is-invalid")
        } else {
            postcodeInput.classList.add("is-invalid")
        }
    })

    line1Input.addEventListener("blur", () => {
        if (line1Input.value != "") {
            line1Input.classList.remove("is-invalid")
        } else {
            line1Input.classList.add("is-invalid")
        }
    })

    townInput.addEventListener("blur", () => {
        if (townInput.value != "") {
            townInput.classList.remove("is-invalid")
        } else {
            townInput.classList.add("is-invalid")
        }
    })

    countyInput.addEventListener("blur", () => {
        if (countyInput.value != "") {
            countyInput.classList.remove("is-invalid")
        } else {
            countyInput.classList.add("is-invalid")
        }
    })
}

function submitOrder() {
    nameInput = document.querySelector(".js-name-input")
    emailInput = document.querySelector(".js-email-input")
    line1Input = document.querySelector(".js-line1-input")
    postcodeInput = document.querySelector(".js-postcode-input")
    townInput = document.querySelector(".js-town-input")
    countyInput = document.querySelector(".js-county-input")
    selectedPartitionInput = document.querySelector(".js-selected-partition")

    if (validInputs()) {
        axios.request({
            method: "POST", url: "/api/submit",
            data: {
                partition: selectedPartitionInput.value, name: nameInput.value, email: emailInput.value,
                postcode: postcodeInput.value, line1: line1Input.value, town: townInput.value, county: countyInput.value
            }
        })
            .then(function (response) {
                // handle success
                addressPage.classList.remove("is-shown")
                completionPage.classList.add("is-shown")

            })
            .catch(function (error) {
                // handle error
                submitButton.innerHTML = error.response.data.error
                submitButton.value = error.response.data.error
                submitButtonShake()
                return
            })
    } else {
        return
    }
}

function validInputs() {
    nameInput = document.querySelector(".js-name-input")
    emailInput = document.querySelector(".js-email-input")
    line1Input = document.querySelector(".js-line1-input")
    postcodeInput = document.querySelector(".js-postcode-input")
    townInput = document.querySelector(".js-town-input")
    countyInput = document.querySelector(".js-county-input")

    var allInputsValid = true

    if (validName(nameInput.value)) {
        nameInput.classList.remove("is-invalid")
    } else {
        nameInput.classList.add("is-invalid")
        submitButtonShake()
        allInputsValid = false
    }

    if (validEmail(emailInput.value)) {
        emailInput.classList.remove("is-invalid")
    } else {
        emailInput.classList.add("is-invalid")
        submitButtonShake()
        allInputsValid = false
    }

    if (line1Input.value != "") {
        line1Input.classList.remove("is-invalid")
    } else {
        line1Input.classList.add("is-invalid")
        submitButtonShake()
        allInputsValid = false
    }

    if (validPostcode(postcodeInput.value)) {
        postcodeInput.classList.remove("is-invalid")
    } else {
        postcodeInput.classList.add("is-invalid")
        submitButtonShake()
        allInputsValid = false
    }

    if (townInput.value != "") {
        townInput.classList.remove("is-invalid")
    } else {
        townInput.classList.add("is-invalid")
        submitButtonShake()
        allInputsValid = false
    }

    if (countyInput.value != "") {
        countyInput.classList.remove("is-invalid")
    } else {
        countyInput.classList.add("is-invalid")
        submitButtonShake()
        allInputsValid = false
    }
    return allInputsValid
}

function validName(nameString) {
    const atLeastTwoWords = (nameString.trim().indexOf(' ') != -1)
    return atLeastTwoWords
}

function validEmail(emailString) {
    var regex = RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')
    var emailValid = regex.test(emailString.trim())
    return emailValid
}

function validPostcode(postcodeString) {
    var regex = RegExp('^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$')
    var postcodeValid = regex.test(postcodeString.trim())
    return postcodeValid
}

function submitButtonShake() {
    submitButton.classList.add("is-invalid")
    setTimeout(function () {
        submitButton = document.querySelector(".js-form-submit")
        submitButton.classList.remove("is-invalid")
    }, 500)
}