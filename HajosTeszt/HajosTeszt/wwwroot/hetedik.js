var kérdések;
var hotList = [];
var displayedQuestion;
var questionsInHotList = 3;
var jóVálasz;
var questionId = 4;
var nextQuestion = 1;
var numberOfQuestions;

document.addEventListener("DOMContentLoaded", init);

    function vissza() {
        displayedQuestion--;
        if (displayedQuestion < 0) displayedQuestion = questionsInHotList - 1;

    }

   function előre() {
        displayedQuestion++;
        if (displayedQuestion === questionsInHotList) displayedQuestion = 0;
        kérdésMegjelenítés();
    }

function init() {
    for (let i = 0; i < questionsInHotList; i++) {
        hotList[i] = {
            question: [],
            goodAnswers: 0
        }
    }

    for (let i = 0; i < questionsInHotList; i++) {
        kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
    }

    fetch("questions/count")
        .then(result => result.text())
        .then(n => { numberOfQuestions = parseInt(n) })
}



function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;

    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText;
    document.getElementById("válasz1").innerText = kérdés.answer1;
    document.getElementById("válasz2").innerText = kérdés.answer2;
    document.getElementById("válasz3").innerText = kérdés.answer3;
    jóVálasz = kérdés.correctAnswer;
    if (kérdés.image) {
        document.getElementById("kép").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
        document.getElementById("kép").classList.remove("rejtett");
    }
    else {
        document.getElementById("kép").classList.add("rejtett");
    }
 
    document.getElementById("válasz1").classList.remove("jó", "rossz");
    document.getElementById("válasz2").classList.remove("jó", "rossz");
    document.getElementById("válasz3").classList.remove("jó", "rossz");
  
}

function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                kérdésMegjelenítés(response.json());
            }
        })
        .then(q => {
            hotList[destination] = q;
            hotList[destination].goodAnswers = 0;
            console.log(`A ${questionNumber}. kérdés letöltésre került a hotlist ${destination}. helyére"`)
            if (displayedQuestion === undefined && destination === 0) {
                displayedQuestion = 0;
                kérdésMegjelenítés();

            }
        })
}

    function választás(n) {
        let kérdés = hotList[displayedQuestion].question;
        if (n == kérdés.correctAnswer) {
            document.getElementyById("válasz" + n).classList.add("jó");

        }
        else {
            document.getElementyById("válasz" + n).classList.add("rossz");
            document.getElementyById("válasz" + kérdés.correctAnswer).classList.add("jó");
        }
    }
  