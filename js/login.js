async function login(){

    const username =
    document.getElementById(
        "username"
    ).value;

    const password =
    document.getElementById(
        "password"
    ).value;

    if(!username || !password){

        alert(
            "Semua field wajib diisi"
        );

        return;

    }

    try{

        const response =
        await fetch(
            "http://10.179.106.236:3000/api/auth/login",
            {
                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify({
                    username,
                    password
                })
            }
        );

        const data =
        await response.json();

        if(response.ok){

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "username",
                data.username
            );

            localStorage.setItem(
                "role",
                data.role
            );

            /*
            ==========================
            REDIRECT
            ==========================
            */

            window.location.href =
            "dashboard-admin.html";

        }else{

            alert(
                data.message ||
                "Login gagal"
            );

        }

    }catch(error){

        console.log(error);

        alert(
            "Backend belum berjalan"
        );

    }

}