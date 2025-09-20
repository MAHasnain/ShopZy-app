const BASEURL = `https://backend-app-jy56.onrender.com/api/v1`;

document.addEventListener("DOMContentLoaded", async () => {

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

            const cartBtn = document.createElement("button");
            const qtyInp = document.createElement("input");

            // cartBtn.classList.add("cartBtn");
            // cartBtn.innerText = "Add to Cart";
            // qtyInp.value = 1;
            // qtyInp.min = 1
            // qtyInp.type = "number";
            // qtyInp.setAttribute = ("readonly", "readonly")

            document.querySelector(".action-btns-section").innerHTML = `
            <div id="change-Quantity">
            <button class="qtyInc">+</button>
            <input type="number" value=1 min=1 class="qtyInp" readonly>
            <button class="qtyDec">-</button>
            </div>
            <button class="cartBtn">Add to Cart</button>`;

            // Quantity update section

            const productQty = document.querySelector(".qtyInp");
            document.querySelector(".qtyInc").addEventListener("click", (e) => {
                e.preventDefault();
                console.log(productQty.value);
                productQty.value = parseInt(productQty.value) + 1;
            })
            document.querySelector(".qtyDec").addEventListener("click", (e) => {
                e.preventDefault();
                let currentVal = parseInt(productQty.value);
                if (currentVal > 1) {
                    productQty.value = currentVal - 1;
                }
            })

            const addToCartBtn = document.querySelector(".cartBtn")
            addToCartBtn.addEventListener("click", async (e) => {
                console.log("Cart button clicked..")
                e.preventDefault();
                try {
                    const options = {
                        method: 'POST',
                        headers: { accept: 'application/json', 'content-type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("accessToken")}` },
                        body: `{"quantity":${productQty.value}}`
                    };
                    const response = await fetch(`${BASEURL}/ecommerce/cart/item/${productId}`, options)
                    const data = await response.json();
                    console.log(productId)
                    console.log(data);

                    if (data.statusCode == 401) {
                        window.location.href = `../HTML/login.html`;
                    }

                } catch (error) {
                    console.error(error);
                }
            })

        } catch (error) {
            console.error(error)
        }
    }
})
