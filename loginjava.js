// const { functionsV2Origin } = require("firebase-tools/lib/api");

var headto;
const urlParams = new URLSearchParams(window.location.search);
const mode = urlParams.get('mode');


if (mode == 'login') {
    toggleForm('L');
} else if (mode == 'register') {
    toggleForm('R');
}

function toggleForm(a) {
    if (a === "R") {
        document.getElementById('register-form').style.display = "block";
        document.getElementById('login-form').style.display = "none";
    }
    else {
        document.getElementById('login-form').style.display = "block";
        document.getElementById('register-form').style.display = "none";
    }
}

function show_mbox(a, b = "def") {

    document.getElementById("click-protector").style.display = "block";
    document.getElementById("message_text").innerHTML = a;
    headto = b;
}
function OK() {
    if (headto == "login") {
        open("login.html?mode=login", "_self");
    }
    else if (headto == "home") {
        open("home.html", "_self");
    }
    else {
        hide_mbox();
    }
}

function hide_mbox() {
    document.getElementById("click-protector").style.display = "none";
}

function password_reset() {
    let element = document.getElementById("reset-pass-menu");
    if (window.getComputedStyle(element).display == "block") {
        document.getElementById("reset-pass-menu").style.display = "none";
    }
    else if (window.getComputedStyle(element).display == "none") {
        document.getElementById("reset-pass-menu").style.display = "block";
    }
}

