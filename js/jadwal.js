checkLogin();

/*
==========================
USERNAME
==========================
*/

const username =
localStorage.getItem(
    "username"
);

document.getElementById(
    "doctorName"
).innerHTML = username;

/*
==========================
LOAD JADWAL
==========================
*/

async function loadJadwal(){

    try{

        const response =
        await fetch(
            "http://localhost:3000/api/jadwal"
        );

        const data =
        await response.json();

        const table =
        document.getElementById(
            "jadwalTable"
        );

        table.innerHTML = "";

        data.forEach((item)=>{

            table.innerHTML += `

            <tr>

                <td>

                    ${item.tanggal}

                </td>

                <td>

                    ${item.jam_mulai}
                    -
                    ${item.jam_selesai}

                </td>

                <td>

                    <span class="badge badge-success">

                        ${item.status}

                    </span>

                </td>

                <td>

                    <button
                    class="btn-primary"
                    onclick="hapusJadwal(
                    ${item.id}
                    )">

                        Hapus

                    </button>

                </td>

            </tr>

            `;

        });

    }catch(error){

        console.log(error);

    }

}

/*
==========================
TAMBAH JADWAL
==========================
*/

async function tambahJadwal(){

    const tanggal =
    document.getElementById(
        "tanggal"
    ).value;

    const jam_mulai =
    document.getElementById(
        "jam_mulai"
    ).value;

    const jam_selesai =
    document.getElementById(
        "jam_selesai"
    ).value;

    if(
        !tanggal ||
        !jam_mulai ||
        !jam_selesai
    ){

        alert(
            "Semua field wajib diisi"
        );

        return;

    }

    try{

        const response =
        await fetch(
            "http://localhost:3000/api/jadwal",
            {
                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify({

                    tanggal,
                    jam_mulai,
                    jam_selesai,
                    status:"tersedia"

                })
            }
        );

        const data =
        await response.json();

        alert(
            data.message ||
            "Jadwal berhasil ditambah"
        );

        loadJadwal();

    }catch(error){

        console.log(error);

    }

}

/*
==========================
HAPUS JADWAL
==========================
*/

async function hapusJadwal(id){

    const confirmDelete =
    confirm(
        "Hapus jadwal ini?"
    );

    if(!confirmDelete) return;

    try{

        await fetch(
            `http://10.179.106.236:3000/api/jadwal/${id}`,
            {
                method:"DELETE"
            }
        );

        alert(
            "Jadwal berhasil dihapus"
        );

        loadJadwal();

    }catch(error){

        console.log(error);

    }

}

/*
==========================
LOAD
==========================
*/

loadJadwal();