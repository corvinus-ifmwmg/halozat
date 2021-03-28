var kérdések;
var kérdésszám = 1;

window.onload = () => {
    letöltés();

    document.getElementById("vissza").onclick = () => {
        if (kérdésszám==0) {
            kérdésszám = kérdések.length - 1;
            letöltés();
        }

        else {
            kérdésszám--;
            letöltés();
        }

    }

    document.getElementById("előre").onclick = () => {
        if (kérdésszám == kérdések.length-1) {
            kérdésszám = 0;
            letöltés();
        }

        else {
            kérdésszám++;
            letöltés();
        }
    }
}

function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    kérdések = d;
    kérdésMegjelenítés(kérdésszám);
}

function letöltés() {
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letöltésBefejeződött(data)
        );
}

function kérdésMegjelenítés(kérdésSzám) {
    let kérdés_szöveg = document.getElementById("kérdés_szöveg");
    let kép = document.getElementById("kép1");
    let válasz1 = document.getElementById("válasz1");
    let válasz2 = document.getElementById("válasz2");
    let válasz3 = document.getElementById("válasz3");

    kérdés_szöveg.innerHTML = kérdések[kérdésSzám].questionText;
    kép.src = "https://szoft1.comeback.hu/hajo/" + kérdések[kérdésSzám].image
    válasz1.innerText = kérdések[kérdésSzám].answer1;
    válasz2.innerText = kérdések[kérdésSzám].answer2;
    válasz3.innerText = kérdések[kérdésSzám].answer3;
}