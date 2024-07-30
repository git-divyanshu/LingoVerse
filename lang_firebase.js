import firebaseFunctions from "./firebase_init.js";
const { database, analytics, auth, app, set, ref, update, get, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } = firebaseFunctions;
var isuser = true;


window.is_loggedin = () => {
    auth.onAuthStateChanged(function (user) {
        if (user) {
            console.log("User LoggedIn");
            return true;
        } else {
            console.log("User not logged in");
            isuser = false;
            return false;
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


reset_word_count();
window.send_lang_div = (a) => {
    let language = a[0];
    let division = a[1];
    let atword = a[2];
    auth.onAuthStateChanged(function (user) {
        if (user) {
            var dataRef = ref(database, "users/" + user.uid);
            var updatedData = {
                language: language,
                division: division,
                atword: atword
            };
            update(dataRef, updatedData);
        } else {
            console.log("User not logged in");
        }

    });
};


window.send_atword = (a) => {

    let atword = 0;
    let journey_database = JSON.parse(localStorage.getItem("journey_database"));
    if (typeof (a) != 'undefined') {
        atword = a;
    }
    auth.onAuthStateChanged(function (user) {
        if (user) {
            var dataRef = ref(database, "users/" + user.uid);
            var updatedData = {
                atword: atword,
                journey_database: journey_database
            };
            update(dataRef, updatedData);
        } else {
            console.log("User not logged in");
        }

    });
    return atword;
};


const user = auth.currentUser;
function fetchData(a, callback) {
    auth.onAuthStateChanged(function (user) {
        if (user) {
            var dataRef = ref(database, "users/" + user.uid + "/" + a);
            get(dataRef)
                .then(function (snapshot) {
                    var value = snapshot.val();
                    callback(value);
                })
                .catch(function (error) {
                    console.error("Error retrieving data:", error);
                    callback(value);
                });
        } else {
            console.log("User not logged in");
            callback(value);
        }
    });
}


window.send_word = () => {
    fetchData("word_count", function (result) {

        auth.onAuthStateChanged(function (user) {
            if (user) {
                var dataRef = ref(database, "users/" + user.uid);
                var updatedData = {
                    word_count: result + 1
                };
                update(dataRef, updatedData);
            } else {
                console.log("User not logged in");
            }
        });
    });
};

// Reset word count to zero
function reset_word_count() {
    fetchData("last_updated", function (result) {
        var current_date = new Date();
        current_date = current_date.toISOString().split('T')[0];
        var last_updated = result;
        if (last_updated != current_date) {
            console.log("set count to zero!");
            set_word_count_to_zero();
            reset_last_update(current_date);
        }
        else {
            console.log("Date checked");
        }
    });
}


function set_word_count_to_zero() {
    auth.onAuthStateChanged(function (user) {
        if (user) {
            var dataRef = ref(database, "users/" + user.uid);
            var updatedData = {
                word_count: 0
            };
            update(dataRef, updatedData);
        } else {
            console.log("User not logged in");
        }
    });
}


function reset_last_update(crnt_date) {
    auth.onAuthStateChanged(function (user) {
        if (user) {
            var dataRef = ref(database, "users/" + user.uid);
            var updatedData = {
                last_updated: crnt_date
            };
            update(dataRef, updatedData);
        } else {
            console.log("User not logged in");
        }
    });
}


window.get_journey_database = () => {
    fetchData("journey_database", function (result) {
        localStorage.setItem("journey_database") = JSON.stringify(result);
    });
}












