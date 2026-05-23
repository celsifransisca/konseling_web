checkLogin();

/*
==========================
KONEKSI SOCKET KE BACKEND (LAPTOPMU)
==========================
*/
// Pastikan IP ini sama dengan laptopmu yang menyalakan server Node.js
const socket = io('http://10.179.106.236:3000'); 

// DATA DUMMY SEMENTARA UNTUK TESTING (Sesuaikan ID ini agar sama dengan di Flutter)
const bookingId = 999; 
const psikologId = 1; // Anggap ini ID psikolog yang sedang login

/*
==========================
ELEMENT HTML
==========================
*/
const messages = document.getElementById("messages");
const input = document.getElementById("messageInput");

/*
==========================
AUTO SCROLL
==========================
*/
function scrollBottom() {
    messages.scrollTop = messages.scrollHeight;
}

/*
==========================
LOGIKA SOCKET.IO (TERIMA PESAN)
==========================
*/
// 1. Saat berhasil konek, masuk ke ruang obrolan (room)
socket.on('connect', () => {
    console.log('Psikolog terhubung ke Server Chat!');
    socket.emit('join_room', bookingId);
});

// 2. Saat menerima pesan dari mahasiswa (Flutter)
socket.on('receive_message', (data) => {
    // Kalau yang ngirim mahasiswa, munculkan di sebelah kiri
    if (data.sender_role === 'mahasiswa') {
        messages.innerHTML += `
        <div class="message message-user">
            ${data.text}
        </div>
        `;
        scrollBottom();
    }
});

/*
==========================
SEND MESSAGE (KIRIM PESAN)
==========================
*/
function sendMessage() {
    const message = input.value.trim();
    if (message === "") return;

    // 1. Tampilkan di layar Psikolog sendiri (Kanan)
    messages.innerHTML += `
    <div class="message message-admin">
        ${message}
    </div>
    `;

    // 2. Tembakkan ke Server Node.js (biar diterusin ke Flutter & MongoDB)
    socket.emit('send_message', {
        booking_id: bookingId,
        sender_id: psikologId,
        sender_role: 'psikolog',
        text: message
    });

    // 3. Bersihkan kolom input & scroll
    input.value = "";
    scrollBottom();
}

/*
==========================
ENTER TO SEND
==========================
*/
input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});