var questions = [
    {
        question: "Commongly used data types do not include:",
        answers: ["strings", "booleans", "alerts", "numbers"],
        correct: 2,
    },
    {
        question: "The condition in an if/else statement is enclosed with ______.",
        answers: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        correct: 2,
    },
    {
        question: "Arrays in Javascript can be used to store ______.",
        answers: ["numbers and strings", "booleans", "other arrays", "all of tha above"],
        correct: 3,
    },
    {
        question: "Strings values must be enclosed within _____, when being assigned to variables.",
        answers: ["quotes", "curly brackets", "commas", "parenthesis"],
        correct: 0,
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["Javascript", "Terminal/Bash", "for loops", "console.log"],
        correct: 3,
    },
]


var currentQuestion = 0;
var score = 0;
var timeLeft = 60;
var timerInterval;
var initialsInput = document.getElementById("initials");
var finalScore = document.getElementById("final-score");

var startButton = document.getElementById("start-quiz");
startButton.addEventListener("click", function() {
    startQuiz();
});

var highscoresButton = document.getElementById("view-highscores");
highscoresButton.addEventListener("click", function() {
});

var submitButton = document.getElementById("submit-score");
submitButton.addEventListener("click", function() {

    var initials = initialsInput.value;
   
});

function startQuiz() {
    var startPage = document.getElementById("start-page");
    var quizPage = document.getElementById("quiz");

    startPage.style.display = "none";
    quizPage.style.display = "block";

    displayQuestion();
    startTimer();
}

function displayQuestion() {
    var question = questions[currentQuestion];
    var questionElement = document.getElementById("question");
    questionElement.textContent = question.question;

    var answerButtons = document.querySelectorAll(".answer");
    for (var i = 0; i < answerButtons.length; i++) {
        answerButtons[i].textContent = question.answers[i];
        answerButtons[i].addEventListener("click", function() {
            checkAnswer(this.textContent);
        });
    }
}

function checkAnswer(selectedAnswer) {
    var question = questions[currentQuestion];
    if (selectedAnswer === question.answers[question.correct]) {
        score++;
    } else {
        timeLeft -= 5; 
    }
    currentQuestion++;

    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        finishQuiz();
    }
}

function startTimer() {
    var timeLeftElement = document.getElementById("time-left");
    timerInterval = setInterval(function() {
        timeLeft--;
        timeLeftElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            finishQuiz();
        }
    }, 1000);
    
    quizPage.style.display = "block";
    timeLeftElement.style.display = "block";
}


function finishQuiz() {
    clearInterval(timerInterval);
    var quizPage = document.getElementById("quiz");
    var scoreInputPage = document.getElementById("score-input");

    quizPage.style.display = "none";
    scoreInputPage.style.display = "block";
    finalScore.textContent = score;
}
