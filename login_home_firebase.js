import firebaseFunctions from "./firebase_init.js";
const { database, analytics, auth, app, set, ref, update, get, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } = firebaseFunctions;
var isuser = true;


function deactivateLinks() {
    const links = document.getElementsByClassName('lang_link');
    for (let i = 0; i < links.length; i++) {
        var link = links[i];
        link.addEventListener('click', (event) => {
            event.preventDefault();
        });
    }
}

function align_strtlearn() {
    document.getElementById("strtlearn").style.top = "0px";
    document.getElementById("strtlearn").style.left = "-10px";
}

window.is_loggedin = () => {
    auth.onAuthStateChanged(function (user) {
        if (user) {
            console.log("User LoggedIn");
        } else {
            console.log("User not logged in");
            document.getElementById("nav_linksa").style.display = "none";
            isuser = false;
            align_strtlearn();
            console.log("Login to Continue.");
            deactivateLinks();
        }
    });
};

window.log_out = () => {
    auth.signOut()
        .then(() => {
            console.log("User logged out successfully.");
        })
        .catch((error) => {
            console.error("Error during logout:", error);
        });
};
