const BASEURL = `https://backend-app-jy56.onrender.com/api/v1`;

document.addEventListener("DOMContentLoaded", async () => {

    const options = { method: 'GET', headers: { accept: 'application/json', "Authorization": `Bearer ${localStorage.getItem("accessToken")}` } };

    try {
        const response = await fetch(`${BASEURL}/users/current-user`, options);
        const data = await response.json();
        console.log(data);



    } catch (error) {
        console.error(error)
    }
})

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
        }
    } catch (error) {
        console.error(error);
    }
})


