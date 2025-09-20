const BASEURL = `https://backend-app-jy56.onrender.com/api/v1`;

const cartItemsContainer = document.querySelector(".cart-items-container");
const cartItemsPrice = document.querySelector(".price");

document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();
    try {
        const options = { method: 'GET', headers: { accept: 'application/json', "Authorization": `Bearer ${localStorage.getItem("accessToken")}` } };

        const response = await fetch(`${BASEURL}/ecommerce/cart`, options);
        const data = await response.json();
        console.log(data);

        if (data.success) {
            const deleteAllItem = document.querySelector(".delete-btn");
            deleteAllItem.innerHTML = `<i class="fa-solid fa-trash"></i>`

            const cartItems = data.data.items;
            console.log(cartItems);

            cartItems.map(item => {
                console.log(item.product);

                cartItemsContainer.innerHTML += `
                <div class="cart-item" data-id="${item.product._id}">
                    <div class="item-img"><img src="${item.product.mainImage.url}" width="100px" id="item-img" alt=""></div>
                    <div class="item-name"><p id="item-name">${item.product.name}</p></div>
                    <div class="item-price"><p id="item-price">${item.product.price}</p></div>
                    <div class="item-qty" ><input type="number" value=1 name="" id="item-qty"></div>
                <div class="item-delete"><i class="fa-solid fa-trash" id="item-delete" ></i></div>
                    
                </div>`;

                // TOTAL PRICE SECTION
                document.querySelector("#total-price").textContent = "Total";
                cartItemsPrice.textContent = data.data.cartTotal;
                document.querySelector(".checkOutBtn").innerHTML = `
                <button id="checkoutBtn" ><a href="./checkout.html">Proceed to Checkout</a></button>`


                // const allItems = document.querySelectorAll(".cart-item");
                const deleteItem = document.querySelector("#item-delete")
                deleteItem.addEventListener("click", async (e) => {
                    e.preventDefault();
                    try {
                        const options = { method: 'DELETE', headers: { accept: 'application/json', "Authorization": `Bearer ${localStorage.getItem("accessToken")}` } };

                        const response = await fetch(`${BASEURL}/ecommerce/cart/item/${item.product._id}`, options);
                        const data = await response.json();
                        console.log(data);

                        if (data.success) {
                            window.location.reload();
                        }
                    } catch (error) {
                        console.error(error);
                    }
                })
            })

            deleteAllItem.addEventListener("click", async (e) => {
                e.preventDefault();
                try {
                    const options = { method: 'DELETE', headers: { accept: 'application/json', "Authorization": `Bearer ${localStorage.getItem("accessToken")}` } };

                    const response = await fetch(`${BASEURL}/ecommerce/cart/clear`, options);
                    const data = await response.json();
                    console.log(data);

                    if (data.success) {
                        window.location.reload();
                    }

                } catch (error) {
                    console.error(error);
                }
            })
        }

    } catch (error) {
        console.error(error)
    }
})

