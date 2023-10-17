var questions = [
    {
        question: "Commongly used data types do not include:",
        options: ["strings", "booleans", "alerts", "numbers"],
        answer: 2,
    },
    {
        question: "The condition in an if/else statement is enclosed with ______.",
        options: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        answer: 2,
    },
    {
        question: "Arrays in Javascript can be used to store ______.",
        options: ["numbers and strings", "booleans", "other arrays", "all of tha above"],
        answer: 3,
    },
    {
        question: "Strings values must be enclosed within _____, when being assigned to variables.",
        options: ["quotes", "curly brackets", "commas", "parenthesis"],
        answer: 0,
    },
    {
        question: "A very useful toll used during development and debugging for printing content to the debugger is:",
        options: ["Javascript", "Terminal/Bash", "for loops", "console.log"],
        answer: 3,
    },
]

var quizContainer = document.getElementById("quiz");
var startButton = document.getElementById("Start-button");
var timerElement = document.getElementById("timer");
var submitButton = document.getElementById("submit");
var questionFeedback = document.getElementById("question")
var resultElement = document.getElementById("result");
var scoreElement = document.getElementById("score");
var initialsInput = document.getElementById("initials");

var currentQuestion = 0;
var score = 0;
var timeLeft = 60;
var timerInterval;
var submitted = false;

function startQuiz() {
    startButton.style.display = "none";
    quizContainer.style.display = "block";
    showQuestion();
    startTimer();
}
function showQuestion() {
    if (currentQuestion < questions.length) {
        var questionData = questions[currentQuestion];
        var options = questionData.options

        for(var i = 0; i < options.length; i++){
            console.log(options[i])
        document.createElement()
        }

    } else {
        finishQuiz();
    }
}

startButton.addEventListener("click", startQuiz)

function startTimer() {
    timerInterval = setInterval(function() {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            finishQuiz ();
        }
    }, 1000);
}

function finishQuiz() {
    clearInterval(timerInterval);
    quizContainer.style.display = "none";
    if (!submitted) {
        submitButton.style.display = "block";
        initialsInput.style.display = "block";
    }
}

function evaluateAnswer() {
    var selectedOption = document.querySelector("input[name='option']:checked");
    if (selectedOption) {
        var selectedAnswer = parseInt(selectedOption.value);
        if (selectedAnswer === questions[currentQuestion].answer) {
            score ++;
            questionFeedback.textContent = "Correct!";
        } else {
            questionFeedback.textContent = "Incorrect!";
            timeLeft -= 10;
        }
        currentQuestion++;
        showQuestion();
        selectedOption.checked = false;
    }
}

submitButton.addEventListener("click", function () {
    if (!submitted) {
        submitted = true;
        initialsInput.disabled = true;
        submitButton.style.display = "none";
        scoreElement.textContent = score;
    }
});