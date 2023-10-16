console.log ("connected");

const question = [
    {
        question: "Commongly used data types do not include:",
        answers: [
            {Text: "strings", correct: false},
            {Text: "booleans", correct: false},
            {Text: "alerts", correct: true},
            {Text: "numbers", correct: false},
        ]
    },
    {
        question: "The condition in an if/else statement is enclosed with ______.",
        answers: [
            {Text: "quotes", correct: false},
            {Text: "curly brackets", correct: false},
            {Text: "parenthesis", correct: true},
            {Text: "square brackets", correct: false},
        ]
    },
    {
        question: "Arrays in Javascript can be used to store ______.",
        answers: [
            {Text: "number and strings", correct: false},
            {Text: "booleans", correct: false},
            {Text: "other arrays", correct: false},
            {Text: "all of the above", correct: true},
        ]
    },
    {
        question: "Strings values must be enclosed within _____, when being assigned to variables.",
        answers: [
            {Text: "commas", correct: false},
            {Text: "curly brackets", correct: false},
            {Text: "quotes", correct: true},
            {Text: "parenthesis", correct: false},
        ]
    },
    {
        question: "A very useful toll used during development and debugging for printing content to the debugger is:",
        answers: [
            {Text: "Javascript", correct: false},
            {Text: "terminal/bash", correct: false},
            {Text: "for loops", correct: false},
            {Text: "console.log", correct: true},
        ]
    }
]

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");

let currrentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currrentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currrentQuestionIndex];
    let questionNbr = currrentQuestionIndex + 1;
    questionElement.innerHTML = questionNbr + "." + currentQuestion.question;

    currentQuestion.Question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


