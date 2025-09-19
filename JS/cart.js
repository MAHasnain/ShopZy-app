const BASEURL = `https://backend-app-jy56.onrender.com/api/v1`;


document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();
    try {
        const options = { method: 'GET', headers: { accept: 'application/json', "Authorization": `Bearer ${localStorage.getItem("accessToken")}` } };

        const response = await fetch(`${BASEURL}/ecommerce/cart`, options);
        const data = await response.json();
        console.log(data);

    } catch (error) {
        console.error(error)
    }
})

