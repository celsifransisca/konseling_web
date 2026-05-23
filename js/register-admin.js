async function registerAdmin(){

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
            "http://10.179.106.236:3000/api/auth/register",
            {
                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify({
                    username,
                    password,
                    role:"psikolog"
                })
            }
        );

        const data =
        await response.json();

        if(response.ok){

            alert(
                "Akun psikolog berhasil dibuat"
            );

            window.location.href =
            "login.html";

        }else{

            alert(
                data.message ||
                "Register gagal"
            );

        }

    }catch(error){

        console.log(error);

        alert(
            "Backend belum berjalan"
        );

    }

}