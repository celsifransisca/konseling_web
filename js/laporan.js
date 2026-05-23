async function buatLaporan(){

    const booking_id =
    document.getElementById(
        "booking_id"
    ).value;

    const diagnosa =
    document.getElementById(
        "diagnosa"
    ).value;

    const rekomendasi =
    document.getElementById(
        "rekomendasi"
    ).value;

    const response = await fetch(
        "http:/10.179.106.236:3000/api/laporan",
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                booking_id,
                diagnosa,
                rekomendasi
            })
        }
    );

    const data = await response.json();

    alert(
        data.message ||
        "Laporan berhasil dibuat"
    );

}