const BASEURL = `https://backend-app-jy56.onrender.com/api/v1`;
const categoryContainer = document.querySelector(".category-container");
const products_container = document.querySelector(".products_container");

document.addEventListener("DOMContentLoaded", async () => {

    const params = new URLSearchParams(window.location.search);
    const categoryId = params.get("id")
    // console.log(categoryId)

    if (categoryId) {

        try {
            const options = { method: 'GET', headers: { accept: 'application/json' } };

            const response = await fetch(`${BASEURL}/ecommerce/categories/${categoryId}`, options)
            const data = await response.json();
            // console.log(data)
            const category = data.data
            document.querySelector(".category-main-heading").textContent = category.name;
            // categoryContainer.innerHTML = ``

            try {
                const response = await fetch(`${BASEURL}/ecommerce/products/category/${categoryId}`, options);
                const data = await response.json();
                console.log(data.data.products);
                const products = data.data.products

                products.map(product => {
                    console.log(product)
                    products_container.innerHTML += `
         <div class="product-card" data-id="${product._id}">
                <img src="${product.mainImage.url}" width=200px alt="">
                    <div class="product-price"><h4>Rs. ${product.price}</h4></div>
                    <div class="product-name"><p>${product.name}</p></div>
                    <div class="product-description"><p>${product.description}</p></div>
                    <button id="cart_btn">Add to Cart</button>
                </div>`})

                const productCard = document.querySelectorAll(".product-card");
                // console.log(productCard)
                productCard.forEach(card => {
                    card.addEventListener("click", async (e) => {
                        e.preventDefault()
                        const cardId = card.getAttribute("data-id")
                        window.location.href = `../HTML/product.html?id=${cardId}`
                    })
                })

            } catch (error) {
                console.error(error)
            }

        } catch (error) {
            console.error(error)
        }

    }

})