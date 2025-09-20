const BASEURL = `https://backend-app-jy56.onrender.com/api/v1`;
// Login

const loginUsernameInp = document.querySelector("#loginUsernameInp")
const loginPassInp = document.querySelector("#loginPassInp")
const loginBtn = document.querySelector("#loginBtn");
loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("Login Button clicked...")
    try {
        const options = {
            method: 'POST',
            headers: { accept: 'application/json', 'content-type': 'application/json' },
            body: `{"password":"${loginPassInp.value}","username":"${loginUsernameInp.value}"}`
        };

        const response = await fetch(`${BASEURL}/users/login`, options);
        const data = await response.json();
        console.log(data.data.accessToken);

        if (data.success) {
            // console.log(data.data.accessToken);
            JSON.stringify(localStorage.setItem("accessToken", data.data.accessToken));
        }

    } catch (error) {
        console.error(error);
    }
})