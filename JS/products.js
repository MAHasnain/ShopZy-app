const BASEURL = `https://backend-app-jy56.onrender.com/api/v1`;

const nav_categories = document.querySelector(".category_container");
const cart_btn = document.querySelector("#cart_btn");

document.addEventListener("DOMContentLoaded", async () => {
    // const options = {}
    const response = await fetch(`${BASEURL}/ecommerce/categories?page=1&limit=20`);
    const data = await response.json();
    // console.log(data);

    const categoryNames = data.data.categories;
    // console.log(categoryNames)
    categoryNames.map(category => {
        nav_categories.innerHTML += `<div class="category" data-id="${category._id}">${category.name}</div>`
    })

})

const mainCategories = document.querySelector(".main-categories");
document.addEventListener("DOMContentLoaded", async () => {
    try {

        const response = await fetch(`${BASEURL}/ecommerce/categories?page=1&limit=20`);
        const data = await response.json();
        console.log(data.data.categories);

        const categories = data.data.categories;
        categories.map(category => {

            mainCategories.innerHTML += `
            <div class="main-category" data-id="${category._id}">
            <div class="name">${category.name}</div>
            </div>`
        })

        const categoriesContainer = document.querySelectorAll(".main-category");
        categoriesContainer.forEach(category => {
            // console.log(category)
            category.addEventListener("click", () => {
                const categoryId = category.getAttribute("data-id");
                window.location.href = `../HTML/category.html?id=${categoryId}`;
            })
        })

    } catch (error) {
        console.error(error);
    }
})

const container = document.querySelector(".category_container");
document.querySelector(".scroll-btn.left").addEventListener("click", () => {
    container.scrollBy({ left: -200, behavior: "smooth" });
});
document.querySelector(".scroll-btn.right").addEventListener("click", () => {
    container.scrollBy({ left: 200, behavior: "smooth" });
});

const products_container = document.querySelector(".products_container");
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch(`${BASEURL}/ecommerce/products?page=1&limit=20`);
        const data = await response.json();
        // console.log(data);

        const products = data.data.products;

        products_container.innerHTML = "";
        const productHeading = document.createElement("h4")
        productHeading.textContent = "All Products";
        // document.getElementById("#products_section").appendChild(productHeading)
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
                window.location.href = `/HTML/product.html?id=${cardId}`
            })
        })

    } catch (error) {
        console.error(error);
    }
})

// cart_btn.addEventListener("click", () => {
//     console.log("cliickedddd")
// })