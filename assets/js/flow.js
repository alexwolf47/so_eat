const axios = require('axios').default;


window.addEventListener('load', () => {
    cta_button = document.querySelector(".js-cta")
    submit_button = document.querySelector(".js-form-submit")

    product_page = document.querySelector(".js-product-page")
    address_page = document.querySelector(".js-address-page")
    completion_page = document.querySelector(".js-complete-page")

    const selected_partition = document.querySelector(".js-selected-partition")


    cta_button.addEventListener("click", () => {
        axios.get("/api/products")
            .then(function (response) {
                cta_button.classList.add("is-hidden")
                product_page.classList.add("is-shown")
                response.data.map(product => {
                    const product_div = document.createElement("div")
                    product_div.classList.add("c-hero-product")
                    const product_title = document.createElement("p")
                    const product_title_text = document.createTextNode(product.name)
                    product_title.appendChild(product_title_text)
                    product_div.appendChild(product_title)
                    const sku_container = document.createElement("div")
                    sku_container.classList.add("c-hero-product-button-container")

                    product.skus.map(sku => {
                        const sku_div = document.createElement("div")
                        sku_div.classList.add("c-hero-product-button")
                        const sku_title = document.createTextNode(sku.name)
                        sku_div.appendChild(sku_title)
                        if (!sku.has_stock) {
                            sku_div.classList.add("out-of-stock")
                        }
                        if (sku.has_stock) {
                            sku_div.addEventListener("click", () => {
                                selected_partition.value = sku.id
                                product_page.classList.remove("is-shown")
                                address_page.classList.add("is-shown")
                            }
                            )
                        }

                        sku_container.appendChild(sku_div)

                    })
                    product_div.appendChild(sku_container)
                    const out_of_stock_tooltip = document.createElement("p")
                    const out_of_stock_tooltip_text = document.createTextNode("* red = out of stock")
                    out_of_stock_tooltip.appendChild(out_of_stock_tooltip_text)
                    product_div.appendChild(out_of_stock_tooltip)
                    product_page.appendChild(product_div)
                }
                )

            })
            .catch(function (error) {
                // handle error
                cta_button.innerHTML = "Something went wrong!"
                cta_button.value = "Something went wrong!"
                cta_button.classList.add("is-invalid")
                setTimeout(function () {
                    cta_button = document.querySelector(".js-form-submit")
                    cta_button.classList.remove("is-invalid")
                }, 500)
                return
            })
    })

    submit_button.addEventListener("click", () => {
        submit_button.classList.remove("is-invalid")
        selected_partition_input = document.querySelector(".js-selected-partition")
        name_input = document.querySelector(".js-name-input")
        email_input = document.querySelector(".js-email-input")
        line1_input = document.querySelector(".js-line1-input")
        postcode_input = document.querySelector(".js-postcode-input")
        town_input = document.querySelector(".js-town-input")
        county_input = document.querySelector(".js-county-input")

        if (name_input.value == "") {
            name_input.classList.add("is-invalid")

            submit_button.classList.add("is-invalid")
            setTimeout(function () {
                submit_button = document.querySelector(".js-form-submit")
                submit_button.classList.remove("is-invalid")
            }, 500)
            return

        }
        else {
            name_input.classList.remove("is-invalid")
        }

        if (email_input.value == "") {
            email_input.classList.add("is-invalid")

            submit_button.classList.add("is-invalid")
            setTimeout(function () {
                submit_button = document.querySelector(".js-form-submit")
                submit_button.classList.remove("is-invalid")
            }, 500)
            return

        }
        else {
            email_input.classList.remove("is-invalid")
        }


        if (line1_input.value == "") {
            line1_input.classList.add("is-invalid")

            submit_button.classList.add("is-invalid")
            setTimeout(function () {
                submit_button = document.querySelector(".js-form-submit")
                submit_button.classList.remove("is-invalid")
            }, 500)
            return

        }
        else {
            line1_input.classList.remove("is-invalid")
        }
        if (postcode_input.value == "") {
            postcode_input.classList.add("is-invalid")

            submit_button.classList.add("is-invalid")
            setTimeout(function () {
                submit_button = document.querySelector(".js-form-submit")
                submit_button.classList.remove("is-invalid")
            }, 500)
            return

        }
        else {
            postcode_input.classList.remove("is-invalid")
        }
        if (town_input.value == "") {
            town_input.classList.add("is-invalid")

            submit_button.classList.add("is-invalid")
            setTimeout(function () {
                submit_button = document.querySelector(".js-form-submit")
                submit_button.classList.remove("is-invalid")
            }, 500)
            return

        }
        else {
            town_input.classList.remove("is-invalid")
        }


        if (county_input.value == "") {
            county_input.classList.add("is-invalid")

            submit_button.classList.add("is-invalid")
            setTimeout(function () {
                submit_button = document.querySelector(".js-form-submit")
                submit_button.classList.remove("is-invalid")
            }, 500)
            return

        }
        else {
            county_input.classList.remove("is-invalid")
        }

        axios.request({
            method: "POST", url: "/api/submit",
            data: {
                partition: selected_partition_input.value, name: name_input.value, email: email_input.value,
                postcode: postcode_input.value, line1: line1_input.value, town: town_input.value, county: county_input.value
            }
        })
            .then(function (response) {
                // handle success

                address_page.classList.remove("is-shown")
                completion_page.classList.add("is-shown")

            })
            .catch(function (error) {
                // handle error

                submit_button.innerHTML = "Something went wrong!"
                submit_button.value = "Something went wrong!"
                submit_button.classList.add("is-invalid")
                setTimeout(function () {
                    submit_button = document.querySelector(".js-form-submit")
                    submit_button.classList.remove("is-invalid")
                }, 500)
                return
            })

    })
})

function removeSubmitButtonClass() {


}