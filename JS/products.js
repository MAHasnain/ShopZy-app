const BASEURL = `https://backend-app-jy56.onrender.com/api/v1`

const nav_categories = document.querySelector(".category_container");

document.addEventListener("DOMContentLoaded", async () => {
    // const options = {}
    const response = await fetch(`${BASEURL}/ecommerce/categories?page=1&limit=20`);
    const data = await response.json();
    console.log(data);

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
