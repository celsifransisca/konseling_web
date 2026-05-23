const BASE_URL = "http://10.179.106.236:3000/api";

async function request(endpoint, method = "GET", data = null){

    const token = localStorage.getItem("token");

    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };

    if(data){
        options.body = JSON.stringify(data);
    }

    const response = await fetch(BASE_URL + endpoint, options);
    return response.json();
}                                                                                                                                                                                                                                                                                                                   