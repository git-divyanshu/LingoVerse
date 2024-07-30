import firebaseFunctions from "./firebase_init.js";
const { database, analytics, auth, app, set, ref, update, get, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail, updateEmail, sendEmailVerification, firestore, doc, setDoc, updateDoc, addDoc, collection, arrayUnion, arrayRemove, increment, getDoc } = firebaseFunctions;

function empty_form() {
    document.getElementById('fullname').value = "";
    document.getElementById('email').value = "";
    document.getElementById('use').value = "";
    document.getElementById('pass').value = "";
    document.getElementById('confirm-password').value = "";
}

signup.addEventListener('click', (e) => {
    e.preventDefault();

    var email = document.getElementById("email").value;
    var username = document.getElementById("use").value;
    var password = document.getElementById("pass").value;
    var passconfirm = document.getElementById("confirm-password").value;
    var name = document.getElementById("fullname").value;
    var startlang = document.getElementById("startlangmenu").value;
    var agreetotnc = document.getElementById("checkboxtnc_pp");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var isvalidmail = emailRegex.test(email);

    if (email === "" || username === "" || password === "" || passconfirm === "" || name === "") {
        show_mbox("User Details cannot be empty.");

    }
    else if (!isvalidmail) {
        show_mbox("Enter a Valid Email Address.");

    }
    else if (password != passconfirm) {
        show_mbox("Recheck Password: Password and Confirm Password are not same.");
    }
    else if (startlang === "Selectlang") {
        show_mbox("Please Select Language to Continue.");
    }
    else if (!agreetotnc.checked) {
        show_mbox("Agree to T&C and Privacy Policy to Continue.");
    }
    else {
        createUserWithEmailAndPassword(auth, email, password, name)
            .then((userCredential) => {
                const user = userCredential.user;

                set(ref(database, "users/" + user.uid), {
                    name: name,
                    username: username,
                    email: email,
                    language: startlang,
                    division: "Beginner",
                    atword: 0,
                    difficult: "",
                    goal: 20,
                    word_count: 0,
                    journey_database: []
                });

                show_mbox("User Created Successfully. You will be redirected to home page in few seconds.");
                setTimeout(() => { open("login.html?mode=login", "_self"); }, 2000);

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                show_mbox("Error Code: " + errorCode + "<br>" + "Error: " + errorMessage);
            });
    }



});

function auto_login() {
    var asd = document.getElementById("register-form");
    var style = window.getComputedStyle(asd);
    console.log(style.display);
    if (style.display == "none") {
        open("home.html", "_self");
    }
}

window.is_loggedin = () => {
    auth.onAuthStateChanged(function (user) {
        if (user) {
            console.log("User LoggedIn");
            auto_login();
        } else {
            console.log("User not logged in");
        }
    });
};


login.addEventListener('click', (e) => {
    e.preventDefault();
    var email = document.getElementById("emaillogin").value;
    var password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            const dt = new Date();
            update(ref(database, "users/" + user.uid), {
                last_login: dt,
            });

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            show_mbox("Error Code: " + errorCode + "<br>" + "Error: " + errorMessage);
        });
});



window.resetpassword = () => {
    event.preventDefault();
    let email = document.getElementById("email-pass-reset").value;
    sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log("Password reset email sent successfully.");
            show_mbox("Password reset email sent successfully.");
            password_reset();
        })
        .catch((error) => {
            if (error.code === "auth/invalid-email") {
                console.log("Invalid email address.");
                show_mbox("Invalid email address.");
            } else if (error.code === "auth/user-not-found") {
                console.log("User not found.");
                show_mbox("User not found.");
            } else {
                console.log("Failed to send password reset email.");
                show_mbox("Failed to send password reset email.");
            }
        });
};


window.changeEmail = (newEmail) => {
    const user = auth.currentUser;

    if (user) {
        updateEmail(user, newEmail)
            .then(() => {
                console.log("Email address changed successfully.");
            })
            .catch((error) => {
                console.log("Failed to change email address.");
            });
    } else {
        console.log("User not signed in.");
    }
};

window.recoverEmail = (email) => {
    sendEmailVerification(auth, { email })
        .then(() => {
            console.log("Email recovery email sent successfully.");
        })
        .catch((error) => {
            if (error.code === "auth/invalid-email") {
                console.log("Invalid email address.");
            } else if (error.code === "auth/user-not-found") {
                console.log("User not found.");
            } else {
                console.log("Failed to send recovery email.");
            }
        });
};
