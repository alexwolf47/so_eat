const axios = require('axios').default;


window.addEventListener('load', () => {
    cta_button = document.querySelector(".js-cta")
    copy_page = document.querySelector(".js-copy-page")
    const selected_partition = document.querySelector(".js-selected-partition")


    cta_button.addEventListener("click", () => {
        cta_button.classList.add("is-hidden")
        copy_page.classList.add("is-shown")

        axios.get("/api/products")
            .then(function (response) {
                // handle success
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
                        console.log("SKU", sku)
                        const sku_div = document.createElement("div")
                        sku_div.classList.add("c-hero-product-button")
                        const sku_title = document.createTextNode(sku.name)
                        sku_div.appendChild(sku_title)
                        if (!sku.has_stock) {
                            sku_div.classList.add("out-of-stock")
                        }
                        if (sku.has_stock) {
                            sku_div.addEventListener("click", () => {
                                console.log("hello", sku)
                                selected_partition.value = sku.id
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



                    copy_page.appendChild(product_div)
                    console.log(product_div)
                }
                )

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    })
})