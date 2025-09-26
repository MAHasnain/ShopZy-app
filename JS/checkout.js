const BASEURL = `https://backend-app-jy56.onrender.com/api/v1`;

document.addEventListener("DOMContentLoaded", async () => {

    try {
        const options = { method: 'GET', headers: { accept: 'application/json', "Authorization": `Bearer ${localStorage.getItem("accessToken")}` } };

        const response = await fetch(`${BASEURL}/ecommerce/addresses`, options);
        const data = await response.json();
        const userAddresses = data?.data?.addresses
        console.log(userAddresses);

        if (data?.success) {
            document.querySelector(".savedAddresses-container").innerHTML = "";
            userAddresses.map(userAddress => {

                document.querySelector(".savedAddresses-container").innerHTML += `<div data-id="${userAddress?._id}" class="userAddress"><p class="userAddress">${userAddress.addressLine1} ${userAddress.addressLine2}, ${userAddress.pincode} ${userAddress.city} ${userAddress.state}  ${userAddress.country} </p> <button class="deleteAddress" ><i class="fa-solid fa-trash" id="item-delete" ></button></div>`
            })

            const deleteAddressBtns = document.querySelectorAll(".deleteAddress");
            deleteAddressBtns.forEach(deleteBtn => {

                deleteBtn.addEventListener("click", async (e) => {
                    e.preventDefault();
                    const addressDiv = e.target.closest(".userAddress")
                    const addressId = addressDiv.getAttribute("data-id")
                    console.log(addressId);

                    try {
                        const options = {
                            method: 'DELETE',
                            headers: { accept: 'application/json', 'content-type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("accessToken")}` },
                        };
                        const response = await fetch(`${BASEURL}/ecommerce/addresses/${addressId}`, options)
                        const data = await response.json();
                        console.log(data);
                        window.location.reload()

                    } catch (error) {
                        console.error(error);
                    }
                })
            })

            const linkedBtns = document.querySelector(".linkedBtns")
            linkedBtns.innerHTML = `<button id="addAddress">Add Address</button><button id="placeOrder">Place order</button>`;

            const addAddressBtn = document.querySelector("#addAddress")
            const newAddressFromContainer = document.querySelector(".newAddress-form");

            addAddressBtn.addEventListener("click", (e) => {
                e.preventDefault();
                const newAddressForm = document.createElement("form");
                newAddressForm.innerHTML = ` <div id="form-inputs"><label for="addressLine1" id="addressLine1">Address Line 1</label>
                    <input type="text" name="addressLine1" id="addressLine1Inp">
                    <label for="addressLine2" id="addressLine2">Address Line 2</label>
                    <input type="text" name="addressLine2" id="addressLine2Inp">
                    <label for="pincode" id="pincode">Pincode</label>
                    <input type="number" name="pincode" id="pincodeInp">
                    <label for="state" id="state">State</label>
                    <input type="text" name="state" id="stateInp">
                    <label for="city" id="city">City</label>
                    <input type="text" name="city" id="cityInp">
                    <label for="country" id="country">Country</label>
                    <input type="text" name="country" id="countryInp"></div>
                    
                    <div id="form-button"><p id="errorMsg"></p><button id="saveAddress" type="submit">Save</button></div>`;

                newAddressFromContainer.appendChild(newAddressForm);
                linkedBtns.innerHTML = "";


                const saveAddress = document.querySelector("#saveAddress");
                saveAddress.addEventListener("click", async (e) => {
                    e.preventDefault();

                    const addressLine1 = document.querySelector("#addressLine1Inp");
                    const addressLine2 = document.querySelector("#addressLine2Inp");
                    const pincode = document.querySelector("#pincodeInp");
                    const state = document.querySelector("#stateInp");
                    const city = document.querySelector("#cityInp");
                    const country = document.querySelector("#countryInp");

                    const options = {
                        method: 'POST',
                        headers: { accept: 'application/json', 'content-type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("accessToken")}` },
                        body: `{"addressLine1":"${addressLine1.value}","addressLine2":"${addressLine2.value}","city":"${city.value}","state":"${state.value}","pincode":${pincode.value},"country":"${country.value}"}`
                    };

                    try {
                        const response = await fetch(`${BASEURL}/ecommerce/addresses`, options)
                        const data = await response.json();

                        console.log(data);
                        if (data?.success) {
                            location.reload()
                        } else {
                            document.querySelector("#errorMsg").textContent = data?.message;
                            return
                        }
                    } catch (error) {
                        console.error(error);
                    }

                    newAddressFromContainer.innerHTML = "";
                    linkedBtns.innerHTML = `<button id="addAddress">Add</button><button id="placeOrder">Place order</button>`;

                })
            }
            )

            const placeOrderBtn = document.querySelector("#placeOrder");
            placeOrderBtn.addEventListener("click", (e) => {
                e.preventDefault()
                swal({
                    title: "Done",
                    text: "Your Order is Placed!",
                    icon: "success",
                    button: "Go to Home",
                }).then(() => {
                    window.location.href = "../index.html";
                });
            })
        }
    } catch (error) {
        console.error(error)
    }
})
