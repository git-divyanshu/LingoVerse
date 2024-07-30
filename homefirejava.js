import firebaseFunctions from "./firebase_init.js";
const { database, analytics, auth, app, set, ref, update, get, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail, updateEmail, sendEmailVerification, firestore, doc, setDoc, updateDoc, addDoc, collection, arrayUnion, arrayRemove, increment, getDoc } = firebaseFunctions;

// var goal_value;
var language;
var division;
var isuser = true;

window.is_loggedin = () => {
    auth.onAuthStateChanged(function (user) {
        if (user) {
            console.log("User LoggedIn");
        } else {
            console.log("User not logged in");
            isuser = false;
        }
    });
};

window.log_out = () => {
    auth.signOut()
        .then(() => {
            console.log("User logged out successfully.");
            open("index.html", "_self");
        })
        .catch((error) => {
            console.error("Error during logout:", error);
        });
};


const user = auth.currentUser;
function fetchData(a, callback) {
    var goal_value = "0";
    auth.onAuthStateChanged(function (user) {
        if (user) {
            var dataRef = ref(database, "users/" + user.uid + "/" + a);
            get(dataRef)
                .then(function (snapshot) {
                    var value = snapshot.val();
                    // console.log(a + " Value: " + value);
                    goal_value = value;
                    callback(goal_value);
                })
                .catch(function (error) {
                    console.error("Error retrieving data:", error);
                    callback(goal_value);
                });
        } else {
            console.log("User not logged in");
            callback(goal_value);
        }
    });
}
window.updateElements = () => {
    send_diff();
        fetchData("division", function (result) {
            document.getElementById("crnt_level").innerHTML = result;
            division = result;
        });
        fetchData("language", function (result) {
            document.getElementById("crnt_lang").innerHTML = result;
            language = result;
        });
        fetchData("goal", function (result) {
            document.getElementById("crnt_goal_value").innerHTML = result;
        });
        fetchData("word_count", function (result) {
            document.getElementById("word_num").innerHTML = result;
        });
        fetchData("atword", function (result) {
            document.getElementById("crnt_atword").innerHTML = result;
        });

};
function send_diff() {
    var a = localStorage.difficult;
    auth.onAuthStateChanged(function (user) {
        if (user) {
            var dataRef = ref(database, "users/" + user.uid);
            var updatedData = {
                difficult: a
            };
            update(dataRef, updatedData);
        } else {
            console.log("User not logged in");
        }

    });
}
window.goal = (a) => {
    auth.onAuthStateChanged(function (user) {
        if (user) {
            var dataRef = ref(database, "users/" + user.uid);
            var updatedData = {
                goal: a
            };
            update(dataRef, updatedData);
        } else {
            console.log("User not logged in");
        }

    });
    close_word_goal_win();
    updateElements();
};

