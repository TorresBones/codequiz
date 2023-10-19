document.addEventListener('DOMContentLoaded', function() {
var startPage = document.querySelector('#start-page');
var startButton = document.querySelector ('#start-quiz');

var quizPage = document.querySelector ('#quiz-page');
var askQuestion = document.querySelector (".ask-question");

var answerBtns = document.querySelectorAll(".choices")
var answerBtn1 = document.querySelector("#answer-btn1");
var answerBtn2 = document.querySelector("#answer-btn2");
var answerBtn3 = document.querySelector("#answer-btn3");
var answerBtn4 = document.querySelector("#answer-btn4");

var finalScore = document.getElementById("final-score");
var checkLine = document.getElementById("check-line");
var scoreBoard = document.querySelector('#submit-page');
var initialsInput = document.getElementById("initials");

var submitButton = document.querySelector('#submit-btn')
var highScorePage = document.querySelector('#highscore-page');
var scoreRecord = document.querySelector('#score-record')
var scoreCheck = document.querySelector('#view-highscores');

var backBtn = document.querySelector('#back-btn');
var clearBtn = document.querySelector('#clear-btn');

var questions = [
    {
        question: "Commonly used data types do not include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        correct: 2,
    },
    {
        question: "The condition in an if/else statement is enclosed with ____.",
        choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        correct: 2,
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        choices: ["numbers and strings", "booleans", "other arrays", "all of the above"],
        correct: 3,
    },
    {
        question: "String values must be enclosed within ____, when being assigned to variables.",
        choices: ["quotes", "curly brackets", "commas", "parentheses"],
        correct: 0,
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "Terminal/Bash", "for loops", "console.log"],
        correct: 3,
    },
];

var timeLeft = document.getElementById("timer");

var questionNumber = 0;
var totalScore = 0;
var secondsLeft = 60;
var questionCount = 1;

function startTimer() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeLeft.textContent = "Time Left:" + secondsLeft + " s ";

        if (secondsLeft <= 0){
            clearInterval(timerInterval);
            timeLeft.textContent + "Time is up!";
            finishQuiz();
        } else if (questionCount >= questions.length +1) {
            clearInterval(timerInterval);
            finishQuiz();
        }
    },1000);
};

function startQuiz() {
    startPage.style.display = "none";
    quizPage.style.display = "block";
    checkLine.style.display = "none";
    timeLeft.style.display = "block";
    questionNumber = 0;

    startTimer();
    displayQuestion(questionNumber);

};

function displayQuestion(n) {
    askQuestion.textContent = questions[n].question;
    answerBtn1.textContent = questions[n].choices[0];
    answerBtn2.textContent = questions[n].choices[1];
    answerBtn3.textContent = questions[n].choices[2];
    answerBtn4.textContent = questions[n].choices[3];
    questionNumber = n;

};

function checkAnswer(event) {
    event.preventDefault();
    checkLine.style.display = 'block';
    setTimeout(function () {
        checkLine.style.display = 'none';
    },1000);
    
    if (questions[questionNumber].correct == event.target.value) {
        checkLine.textContent = "Correct!";
        totalScore = totalScore +1;
    } else {
        secondsLeft = secondsLeft -10;
        checkLine.textContent = "wrong!";
    }

    if (questionNumber < questions.length - 1 ) {
        displayQuestion(questionNumber +1);
    } else {
        finishQuiz();
    }
    questionCount ++;
};

function finishQuiz() {
    
    startPage.style.display = "none";
    quizPage.style.display = "none";
    scoreBoard.style.display = "block";
    console.log(scoreBoard);

    finalScore.textContent = "Your final score is :" + totalScore ;
    timeLeft.style.display = "none";
    
};

function getScore() {
    var currentList = localStorage.getItem("ScoreList");
    if (currentList !== null) {
        freshList = JSON.parse(currentList);
        return freshList;
    } else {
        freshList = [];
    }
    return freshList;
};

function renderScore() {
    scoreRecord.innerHTML = "";
    scoreRecord.style.display = "block";
    var highScores = sort();
    var topFive = highScores.slice(0, 5);
    for (var i = 0; i < topFive.length; i++) {
        var item = topFive[i];
        var li = document.createElement("li");
        li.textContent = item.user + " - " + item.score;
        li.setAttribute("data-index", i);
        scoreRecord.appendChild(li);
    }
}

function sort() {
    var unsortedList = getScore();
    if(getScore() == null) {
        return;
    } else {
        unsortedList.sort(function(a,b){
            return b.score - a.score;
        })
        return unsortedList;
    }};

function addItem(n) {
    var addedList = getScore();
    addedList.push(n);
    localStorage.setItem("ScoreList", JSON.stringify(addedList));
};

function saveScore() {
    var scoreItem = {
        user: initialsInput.value,
        score: totalScore,
    };

    addItem(scoreItem);
    renderScore();
}

startButton.addEventListener("click", startQuiz);
    answerBtns.forEach(function(click){
        click.addEventListener("click", checkAnswer);
    });

submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    scoreBoard.style.display = "none";
    startPage.style.display = "none";
    highScorePage.style.display = "block";
    quizPage.style.display = "none";
    saveScore();
});

scoreCheck.addEventListener("click", function(event){
    event.preventDefault();
    scoreBoard.style.display = "none";
    startPage.style.display = "none";
    highScorePage.style.display = "block";
    quizPage.style.display = "none";
    renderScore();
});

backBtn.addEventListener ("click", function(event){
    event.preventDefault();
    scoreBoard.style.display = "none";
    startPage.style.display = "block";
    highScorePage.style.display = "none";
    quizPage.style.display = "none";
    location.reload();
});

clearBtn.addEventListener("click", function(event) {
    event.preventDefault();
    localStorage.clear();
    renderScore();
});
});