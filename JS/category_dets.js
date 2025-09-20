const BASEURL = `https://backend-app-jy56.onrender.com/api/v1`;
const categoryContainer = document.querySelector(".category-container");

document.addEventListener("DOMContentLoaded", async () => {

    const params = new URLSearchParams(window.location.search);
    const categoryId = params.get("id")
    console.log(categoryId)

    if (categoryId) {

        try {
            const options = { method: 'GET', headers: { accept: 'application/json' } };

            const response = await fetch(`${BASEURL}/ecommerce/categories/${categoryId}`, options)
            const data = await response.json();
            console.log(data)
            const category = data.data
            document.querySelector(".category-main-heading").textContent = category.name;
            // categoryContainer.innerHTML = ``

            try {
                const response = await fetch(`${BASEURL}/ecommerce/products/category/${categoryId}`, options);
                const data = await response.json();
                console.log(data);

                
            } catch (error) {
                console.error(error)
            }

        } catch (error) {
            console.error(error)
        }

    }

})