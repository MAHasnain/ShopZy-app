const BASEURL = `https://backend-app-jy56.onrender.com/api/v1`

const nav_categories = document.querySelector(".category_container");

document.addEventListener("DOMContentLoaded", async () => {
    // const options = {}
    const response = await fetch(`${BASEURL}/ecommerce/categories?page=1&limit=20`);
    const data = await response.json();
    // console.log(data);

    const categoryNames = data.data.categories;
    // console.log(categoryNames)
    categoryNames.map(category => {
        nav_categories.innerHTML += `<div class="category">${category.name}</div>`
    })

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
    const response = await fetch(`${BASEURL}/ecommerce/products?page=1&limit=20`);
    const data = await response.json();
    // console.log(data);

    const products = data.data.products;

    products_container.innerHTML = "";
    products.map(product => {
        console.log(product)

        products_container.innerHTML += `
         <div class="product-card" data-id="${product._id}">
                <img src="${product.mainImage.url}" width=200px alt="">
                    <div class="product-price"><h4>${product.price}</h4></div>
                    <div class="product-name"><p>${product.name}</p></div>
                    <div class="product-description"><p>${product.description}</p></div>
                </div>`

    })
    const productCard = document.querySelectorAll(".product-card");
    // console.log(productCard)
    productCard.forEach(card => {
        card.addEventListener("click", async (e) => {
            e.preventDefault();
            const productId = card.getAttribute("data-id");

            window.location.href = `/HTML/product.html?id=${productId}`
        })
    })

    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    const res = await fetch(`${BASEURL}/ecommerce/products`);
    const final = await res.json();
    console.log("final", final);
    const a = final.data.products
    let product = a.find(p => p._id == productId)
    // console.log(a)
    // if (product) {
    //     document.querySelector(".product-img")
    //     document.querySelector(".product-price").textContent = a.price
    //     document.querySelector(".product-name").textContent = a.name
    //     document.querySelector(".product-description").textContent = a.description
    // }
})