document.addEventListener("DOMContentLoaded", async () => {

    const BASEURL = `https://backend-app-jy56.onrender.com/api/v1`;

    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
    console.log(productId)

    if (productId) {

        try {
            const response = await fetch(`${BASEURL}/ecommerce/products/${productId}`);
            const productData = await response.json();
            console.log(productData.data);

            const product = productData?.data;
            
            console.log(product)

            document.querySelector("#product-img").src = product.mainImage.url;
            document.querySelector("#product-price").textContent = product.price;
            document.querySelector("#product-name").textContent = product.name;
            document.querySelector("#product-description").textContent = product.description;
            

        } catch (error) {
            console.error(error)
        }
    }
})