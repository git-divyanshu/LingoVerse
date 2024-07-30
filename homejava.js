
setTimeout(() => { hide_loading(); }, 4000);
function hide_loading() {
    document.getElementById('loading-back').style.display = "none";
    document.getElementById('loading').style.display = "none";
}
let containerlist = document.getElementById("container_list");
let radioinputs = document.getElementsByClassName("radio-inputs")[0];
radioinputs.addEventListener("mouseover", showList);
containerlist.addEventListener("mouseover", showList);
var a, b;
containerlist.addEventListener("mouseout", function () {
    a = setTimeout(hideList, 1000);
});
radioinputs.addEventListener("mouseout", function () {
    b = setTimeout(hideList, 1000);
});


function showList() {
    radioinputs.style.display = "flex";
    clearTimeout(a);
    clearTimeout(b);
}

function hideList() {
    radioinputs.style.display = "none";
}
diff_count();

function diff_count() {

    var difflength = JSON.parse(localStorage.getItem("difficult")).length;
    document.getElementById("diff_count_num").innerHTML = difflength;
    console.log("Diff count: ", difflength);

}


function word_goal_win() {
    document.getElementById('set_wrd_goal').style.display = "block";
}

function close_word_goal_win() {
    document.getElementById('set_wrd_goal').style.display = "none";
}

function goto_diff() {
    open("difficult.html", "_self");
}



function checkindatabase(lang, division, atword) {
    if (localStorage.getItem("journey_database") !== null) {
        var data = JSON.parse(localStorage.getItem("journey_database"));
        var thisarray = [lang, division, atword];
        var index = data.findIndex((arr) => arr[0] === thisarray[0] && arr[1] === thisarray[1]);
        if (index === -1) {
            return [lang, division, atword];
        }
        else {
            return data[index];
        }
    } else {
        return [lang, division, atword];
    }

}

function goto(b, diviv = "1", atword = 0) {
    let a;
    let divisionsname = ["Beginner", "Moderate", "Advance"];
    if (atword === 0) {
        let arrayreq = checkindatabase(b, divisionsname[parseInt(diviv) - 1], atword);
        atword = arrayreq[2];
    }

    switch (b) {
        case "chinese":
            a = "1" + String(diviv);
            break;
        case "french":
            a = "2" + String(diviv);
            break;
        case "german":
            a = "3" + String(diviv);
            break;
        case "hindi":
            a = "4" + String(diviv);
            break;
        case "japanese":
            a = "5" + String(diviv);
            break;
        case "korean":
            a = "6" + String(diviv);
            break;
        case "russian":
            a = "7" + String(diviv);
            break;
        case "spanish":
            a = "8" + String(diviv);
            break;
        case "tamil":
            a = "9" + String(diviv);
            break;
        case "turkish":
            a = "10" + String(diviv);
            break;
        case "portuguese":
            a = "11" + String(diviv);
            break;
        case "indonesian":
            a = "12" + String(diviv);
            break;
        case "italian":
            a = "13" + String(diviv);
            break;
        case "arabic":
            a = "14" + String(diviv);
            break;
        case "danish":
            a = "15" + String(diviv);
            break;
        case "dutch":
            a = "16" + String(diviv);
            break;
        case "greek":
            a = "17" + String(diviv);
            break;
        case "icelandic":
            a = "18" + String(diviv);
            break;
        case "mongolian":
            a = "19" + String(diviv);
            break;
        case "norwegian":
            a = "20" + String(diviv);
            break;
        case "polish":
            a = "21" + String(diviv);
            break;
        case "vietnamese":
            a = "22" + String(diviv);
            break;
        case "slovenian":
            a = "23" + String(diviv);
            break;
        case "swedish":
            a = "24" + String(diviv);
            break;
        case "yoruba":
            a = "25" + String(diviv);
            break;
        case "Difficult Words":
            a = "100";
            atword = 0;
            break;
        default:
            break;
    }
    let link = "language.html?langid=" + String(a) + "&atword=" + String(atword);
    open(link, "_self");
}
function continuej_to() {

    let got_lang_div = [String(document.getElementById("crnt_lang").innerHTML), String(document.getElementById("crnt_level").innerHTML)];
    let divnumber;
    switch (String(got_lang_div[1])) {
        case "Beginner":
            divnumber = "1";
            break;
        case "Moderate":
            divnumber = "2";
            break;
        case "Advance":
            divnumber = "3";
            break;
        case "Hard":
            goto("Difficult Words");
            break;
        default:
            console.log("Nothing matched");
            break;
    }
    let atwordfromhtml = document.getElementById("crnt_atword").innerHTML;
    goto(got_lang_div[0], String(divnumber), String(atwordfromhtml));
};
