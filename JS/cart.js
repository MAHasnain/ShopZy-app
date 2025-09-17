const BASEURL = `https://backend-app-jy56.onrender.com/api/v1`;

const addToCartBtn = document.querySelector("#addToCartBtn");
addToCartBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { accept: 'application/json', 'content-type': 'application/json' },
            body: '{"quantity":4}'
        };
        const response = await fetch(`${BASEURL}/ecommerce/cart/item/${productId}`, options);
        const data = await response.json();
        console.log(data);
        
    } catch (error) {
        console.error(error)
    }
})