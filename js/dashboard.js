checkLogin();

/*
==========================
AMBIL USER LOGIN
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
ANIMASI ANGKA DASHBOARD
==========================
*/

function animateValue(id, start, end, duration){

    let current = start;

    const range = end - start;

    const increment =
    end > start ? 1 : -1;

    const stepTime =
    Math.abs(
        Math.floor(duration / range)
    );

    const obj =
    document.getElementById(id);

    const timer = setInterval(()=>{

        current += increment;

        obj.innerHTML = current;

        if(current == end){

            clearInterval(timer);

        }

    }, stepTime);

}

/*
==========================
LOAD DATA DASHBOARD
==========================
*/

async function loadDashboard(){

    try{

        /*
        ==========================
        BOOKING
        ==========================
        */

        const bookingResponse =
        await fetch(
            "http://10.179.106.236:3000/api/booking"
        );

        const bookingData =
        await bookingResponse.json();

        /*
        ==========================
        LAPORAN
        ==========================
        */

        const laporanResponse =
        await fetch(
            "http://10.179.106.236:3000/api/laporan"
        );

        const laporanData =
        await laporanResponse.json();

        /*
        ==========================
        HITUNG DATA
        ==========================
        */

        const totalMahasiswa =
        bookingData.length;

        const totalBooking =
        bookingData.filter(item =>
            item.status_konseling !==
            "dibatalkan"
        ).length;

        const totalLaporan =
        laporanData.length;

        /*
        ==========================
        ANIMASI
        ==========================
        */

        animateValue(
            "totalMahasiswa",
            0,
            totalMahasiswa,
            700
        );

        animateValue(
            "totalBooking",
            0,
            totalBooking,
            700
        );

        animateValue(
            "totalLaporan",
            0,
            totalLaporan,
            700
        );

        /*
        ==========================
        TABLE BOOKING
        ==========================
        */

        const bookingTable =
        document.getElementById(
            "bookingTable"
        );

        if(bookingTable){

            bookingTable.innerHTML = "";

            bookingData.forEach(item=>{

                let badgeClass =
                "badge-warning";

                if(
                    item.status_konseling
                    ===
                    "berjalan"
                ){

                    badgeClass =
                    "badge-info";

                }

                if(
                    item.status_konseling
                    ===
                    "selesai"
                ){

                    badgeClass =
                    "badge-success";

                }

                bookingTable.innerHTML += `

                <tr>

                    <td>

                        ${item.username ||
                        "Anonim"}

                    </td>

                    <td>

                        ${item.catatan_mahasiswa ||
                        "-"}

                    </td>

                    <td>

                        <span class="badge ${badgeClass}">

                            ${item.status_konseling}

                        </span>

                    </td>

                    <td>

                        ${item.created_at
                        ?
                        new Date(
                            item.created_at
                        ).toLocaleDateString(
                            "id-ID"
                        )
                        :
                        "-"}

                    </td>

                </tr>

                `;

            });

        }

    }catch(error){

        console.log(error);

    }

}

/*
==========================
LOAD DASHBOARD
==========================
*/

loadDashboard();