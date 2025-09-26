const BASEURL = `https://backend-app-jy56.onrender.com/api/v1`;
const navBtnContainer = document.querySelector(".auth-btns");

const userAvatar = document.querySelector(".user-avatar");
const userfName = document.querySelector(".user-fName");
const userlName = document.querySelector(".user-lName");
const useremail = document.querySelector(".user-email");
const userUsername = document.querySelector(".user-username");
const userpNumber = document.querySelector(".user-pNumber");

const addressLine1 = document.querySelector(".AddressLine1");
const addressLine2 = document.querySelector(".AddressLine2");
const addressPincode = document.querySelector(".pincode");
const addressCity = document.querySelector(".city");
const addressState = document.querySelector(".state");
const addressCountry = document.querySelector(".country");

document.addEventListener("DOMContentLoaded", async () => {

    const options = { method: 'GET', headers: { accept: 'application/json', "Authorization": `Bearer ${localStorage.getItem("accessToken")}` } };

    try {
        const response = await fetch(`${BASEURL}/users/current-user`, options);
        const data = await response.json();
        console.log(data);
        const currentUser = data?.data

        if (data.success) {

            try {
                const response = await fetch(`${BASEURL}/ecommerce/addresses`, options);
                const data = await response.json();
                console.log(data);
                const userAddress = data?.data?.addresses

                if (data?.success) {
                    addressLine1.innerHTML = `<label for="addressLine1">Address 1</label><p>${userAddress?.[0].addressLine1}</p>`
                    addressLine2.innerHTML = `<label for="addressLine2">Address 2</label><p>${userAddress?.[0].addressLine2}</p>`
                    addressPincode.innerHTML = `<label for="addressPincode">Pin code</label><p>${userAddress?.[0].pincode}</p>`
                    addressCity.innerHTML = `<label for="addressCity">City</label><p>${userAddress?.[0].city}</p>`
                    addressState.innerHTML = `<label for="addressState">State</label><p>${userAddress?.[0].state}</p>`
                    addressCountry.innerHTML = `<label for="addressCountry">Country</label><p>${userAddress?.[0].country}</p>`
                }

            } catch (error) {
                console.error(error)
            }

            try {
                const response = await fetch(`${BASEURL}/ecommerce/profile`, options);
                const data = await response.json();
                console.log(data)

                if (data?.success) {
                    userAvatar.innerHTML = `<img width= src="${currentUser?.avatar?.url}" alt="" srcset="">`
                    userfName.innerHTML = `<label for="user-fName" id="first-name">First Name</label><p>${data?.data?.firstName}</p>`
                    userlName.innerHTML = `<label for="user-lName">Last Name</label><p>${data?.data?.lastName}</p>`
                    useremail.innerHTML = `<label for="user-email" id="email">Email</label><p>${currentUser.email}</p>`
                    userUsername.innerHTML = `
                            <label for="user-username" id="username">Username</label><p>${currentUser.username}</p>`
                    userpNumber.innerHTML = `<label for="addressCountry">Country</label><p>${data?.data?.countryCode} ${data?.data?.phoneNumber}</p>`
                }

            } catch (error) {
                console.error(error)
            }

            navBtnContainer.innerHTML = ` <button id="logout-btn">
            <a href="">Logout</a>
            </button>`;

            // Logout
            const logoutBtn = document.querySelector("#logout-btn");
            logoutBtn.addEventListener("click", async (e) => {
                e.preventDefault();
                const options = { method: 'POST', headers: { accept: 'application/json', "Authorization": `Bearer ${localStorage.getItem("accessToken")}` } };

                try {
                    const response = await fetch(`${BASEURL}/users/logout`, options);
                    const data = await response.json();
                    console.log(data);
                    if (data.success) {
                        localStorage.removeItem("accessToken");
                        window.location.href = `../HTML/login.html`
                    }
                } catch (error) {
                    console.error(error);
                }
            })

        } else {
            document.querySelector(".user-account").innerHTML = `<div class="">Please <a href="./login.html">Login</a> or <a href="./register.html">Register</a></div>`;

            navBtnContainer.innerHTML = `<button id="logIn-btn">
                    <a href="../HTML/login.html">Log in</a>
                </button>
                <button id="register-btn">
                    <a href="../HTML/register.html">Register</a>
                </button>`

        }

    } catch (error) {
        console.error(error)
    }
})



