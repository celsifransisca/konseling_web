checkLogin();

const username =
localStorage.getItem(
    "username"
);

document.getElementById(
    "doctorName"
).innerHTML = username;

async function loadProfile(){

    document.getElementById(
        "nama"
    ).value =
    "Dr Amanda Pratama, M.Psi";

    document.getElementById(
        "spesialisasi"
    ).value =
    "Anxiety & Academic Stress";

    document.getElementById(
        "bio"
    ).value =
    "Psikolog profesional untuk konseling mahasiswa.";

}

function saveProfile(){

    alert(
        "Profile berhasil diperbarui"
    );

}

loadProfile();