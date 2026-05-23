checkLogin();

const API_URL =
"http://10.179.106.236:3000/api/booking";

const username =
localStorage.getItem("username");

const userId =
localStorage.getItem("user_id");

document.getElementById(
    "doctorName"
).innerHTML =
username || "Psikolog";


// ======================================
// LOAD BOOKING
// ======================================

async function loadBooking(){

    try{

        const response =
        await fetch(

            `${API_URL}/psikolog/${userId}`

        );

        const data =
        await response.json();

        console.log(
            "BOOKING:",
            data
        );

        const table =
        document.getElementById(
            "bookingTable"
        );

        table.innerHTML = "";

        // ======================================
        // KALAU TIDAK ADA DATA
        // ======================================

        if(!data || data.length === 0){

            table.innerHTML = `

            <tr>

                <td colspan="4"
                style="
                text-align:center;
                padding:20px;
                ">

                    Belum ada booking

                </td>

            </tr>

            `;

            return;

        }

        // ======================================
        // LOOP DATA BOOKING
        // ======================================

        data.forEach((booking) => {

            table.innerHTML += `

            <tr>

                <td>
                    ${booking.nama_mahasiswa || "-"}
                </td>

                <td>
                    ${booking.keluhan || "-"}
                </td>

                <td>
                    ${booking.status_konseling || "menunggu"}
                </td>

                <td>

                    <button
                    class="btn-primary"
                    onclick="terimaBooking(${booking.id})">

                        Terima

                    </button>

                </td>

            </tr>

            `;

        });

    }catch(error){

        console.log(error);

        alert(
            "Gagal load booking"
        );

    }

}



// ======================================
// TERIMA BOOKING
// ======================================

async function terimaBooking(id){

    try{

        const response =
        await fetch(

            `${API_URL}/${id}`,

            {

                method:"PUT",

                headers:{

                    "Content-Type":
                    "application/json"

                },

                body: JSON.stringify({

                    status_konseling:
                    "berjalan"

                })

            }

        );

        const data =
        await response.json();

        console.log(data);

        if(response.ok){

            alert(
                "Booking diterima"
            );

            loadBooking();

        }else{

            alert(
                data.error ||
                data.message ||
                "Gagal update booking"
            );

        }

    }catch(error){

        console.log(error);

        alert(
            "Backend error"
        );

    }

}



// ======================================
// AUTO LOAD
// ======================================

loadBooking();