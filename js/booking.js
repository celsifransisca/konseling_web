async function loadBooking(){

    const response = await fetch(
        "http://localhost:3000/api/booking"
    );

    const data = await response.json();

    const table =
    document.getElementById(
        "bookingTable"
    );

    table.innerHTML = "";

    data.forEach((item)=>{

        table.innerHTML += `

        <tr>

            <td>
                ${item.username || "Anonim"}
            </td>

            <td>
                ${item.catatan_mahasiswa}
            </td>

            <td>

                <span class="badge badge-warning">

                    ${item.status_konseling}

                </span>

            </td>

            <td>

                <button
                onclick="ubahStatus(
                ${item.id},
                'berjalan'
                )"
                class="btn-primary">

                    Mulai

                </button>

            </td>

        </tr>

        `;

    });

}

async function ubahStatus(id,status){

    await fetch(
        `http://localhost:3000/api/booking/${id}/status`,
        {
            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                status_konseling:status
            })
        }
    );

    alert("Status berhasil diubah");

    loadBooking();

}

loadBooking();