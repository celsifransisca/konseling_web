checkLogin();

const API_URL =
"http://10.179.106.236:3000/api/psikolog/profile";

const userId =
localStorage.getItem("user_id");

const username =
localStorage.getItem("username");

document.getElementById(
    "doctorName"
).innerHTML =
username || "Psikolog";

// ==============================
// LOAD PROFILE
// ==============================

async function loadProfile(){

    try{

        const response =
        await fetch(

            `${API_URL}/${userId}`

        );

        const data =
        await response.json();

        console.log(data);

        if(data){

            document.getElementById(
                "nama"
            ).value =
            data.nama_lengkap || "";

            document.getElementById(
                "spesialisasi"
            ).value =
            data.spesialisasi || "";

            document.getElementById(
                "bio"
            ).value =
            data.bio || "";

            document.getElementById(
                "doctorName"
            ).innerHTML =
            data.nama_lengkap || "Psikolog";

            document.getElementById(
                "doctorSpecialist"
            ).innerHTML =
            data.spesialisasi || "Psikolog";

        }

    }catch(error){

        console.log(error);

    }

}

// ==============================
// SAVE PROFILE
// ==============================

async function saveProfile(){

    const nama =
    document.getElementById(
        "nama"
    ).value;

    const spesialisasi =
    document.getElementById(
        "spesialisasi"
    ).value;

    const bio =
    document.getElementById(
        "bio"
    ).value;

    if(
        !nama ||
        !spesialisasi ||
        !bio
    ){

        alert(
            "Semua field wajib diisi"
        );

        return;

    }

    try{

        const response =
        await fetch(API_URL, {

            method: "POST",

            headers: {

                "Content-Type":
                "application/json"

            },

            body: JSON.stringify({

                user_id: userId,

                nama_lengkap: nama,

                spesialisasi: spesialisasi,

                bio: bio

            })

        });

        const data =
        await response.json();

        console.log(data);

        if(response.ok){

            alert(
                "Profile berhasil disimpan"
            );

            loadProfile();

        }else{

            alert(
                data.message ||
                "Gagal save profile"
            );

        }

    }catch(error){

        console.log(error);

        alert(
            "Backend error"
        );

    }

}

loadProfile();