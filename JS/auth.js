const BASEURL = `https://backend-app-jy56.onrender.com/api/v1`;

// Register 
const regEmailInp = document.querySelector("#regEmailInp");
const regUsernameInp = document.querySelector("#regUsernameInp");
const regRoleInp = document.querySelector("#regRoleInp");
const regPassInp = document.querySelector("#regPasswordInp");
const registerBtn = document.querySelector("#register-btn");

registerBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { accept: 'application/json', 'content-type': 'application/json' },
            body: `{"email":"${regEmailInp.value}","password":"${regUsernameInp.value}","role":"${regRoleInp.value}","username":"${regUsernameInp.value}"}`
        };
        const response = await fetch(`${BASEURL}/users/register`, options);
        const data = await response.json();
        console.log(data);

    } catch (error) {
        console.error(error);
    }
})


// Login

const loginUsernameInp = document.querySelector("#loginUsernameInp")
const loginPassInp = document.querySelector("#loginPassInp")
const loginBtn = document.querySelector("#loginBtn");
loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { accept: 'application/json', 'content-type': 'application/json' },
            body: `{"password":"${loginPassInp.value}","username":"${loginUsernameInp.value}"}`
        };

        const response = await fetch(`${BASEURL}/users/login`, options);
        const data = await response.json();
        console.log(data);

    } catch (error) {
        console.error(error);
    }
})