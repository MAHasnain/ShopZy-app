const BASEURL = `https://backend-app-jy56.onrender.com/api/v1`;

const addressLine1 = document.querySelector("#addressLine1");
const addressLine2 = document.querySelector("#addressLine2");
const city = document.querySelector("#city");
const state = document.querySelector("#state");
const pincode = document.querySelector("#pincode");
const country = document.querySelector("#country");

const saveAddress = document.querySelector("#saveAddress");
saveAddress.addEventListener("click", async (e) => {
    e.preventDefault();

    const options = {
        method: 'POST',
        headers: { accept: 'application/json', 'content-type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("accessToken")}` },
        body: `{"addressLine1":"${addressLine1.value}","addressLine2":"${addressLine2.value}","city":"${city.value}","state":"${state.value}","pincode":${pincode.value},"country":"${country.value}"}`
    };
    try {
        const response = await fetch(`${BASEURL}/ecommerce/addresses`, options)
        const data = await response.json();
        console.log(data);

    } catch (error) {
        console.error(error);
    }
}
)