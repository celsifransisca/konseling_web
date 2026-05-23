checkLogin();

/*
==========================
ELEMENT
==========================
*/

const messages =
document.getElementById(
    "messages"
);

const input =
document.getElementById(
    "messageInput"
);

/*
==========================
AUTO SCROLL
==========================
*/

function scrollBottom(){

    messages.scrollTop =
    messages.scrollHeight;

}

/*
==========================
SEND MESSAGE
==========================
*/

function sendMessage(){

    const message =
    input.value.trim();

    if(message === "") return;

    /*
    ==========================
    CREATE BUBBLE
    ==========================
    */

    messages.innerHTML += `

    <div class="message message-admin">

        ${message}

    </div>

    `;

    /*
    ==========================
    CLEAR INPUT
    ==========================
    */

    input.value = "";

    /*
    ==========================
    SCROLL
    ==========================
    */

    scrollBottom();

}

/*
==========================
ENTER TO SEND
==========================
*/

input.addEventListener(
    "keypress",
    function(e){

        if(e.key === "Enter"){

            sendMessage();

        }

    }
);

/*
==========================
FAKE REALTIME DEMO
==========================
*/

setTimeout(()=>{

    messages.innerHTML += `

    <div class="message message-user">

        Halo dok saya sedang cemas
        menghadapi skripsi 😔

    </div>

    `;

    scrollBottom();

},1500);

setTimeout(()=>{

    messages.innerHTML += `

    <div class="message message-user">

        Saya juga sering overthinking
        soal masa depan

    </div>

    `;

    scrollBottom();

},4000);