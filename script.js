const questions = [
    {
        question: 'What is the capital of France?',
        answer: [
            { Text: 'Paris', correct: true },
            { Text: 'Rome', correct: false },
            { Text: 'London', correct: false },
            { Text: 'New York', correct: false }
        ]
    },
    {
        question: 'What is the capital of Canada?',
        answer: [
            { Text: 'Iraq', correct: false },
            { Text: 'Iran', correct: false },
            { Text: 'Tokyo', correct: false },
            { Text: 'Ottawa', correct: true }
        ]
    },
    {
        question: 'What is the capital of Russia?',
        answer: [
            { Text: 'Moscow', correct: true },
            { Text: 'Delhi', correct: false },
            { Text: 'Vegas', correct: false },
            { Text: 'Chicago', correct: false }
        ]
    },
    {
        question: 'What is the capital of Germany?',
        answer: [
            { Text: 'Berlin', correct: true },
            { Text: 'Vienna', correct: false },
            { Text: 'Mumbai', correct: false },
            { Text: 'Madrid', correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        score++;
        selectedButton.classList.add("correct");
    } else {
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;  // Disable all buttons after an answer is selected
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
    });

    nextButton.style.display = "block";  // Show the "Next" button after answering
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        nextButton.style.display = "none";
    } else {
        showResults();
    }
}

function showResults() {
    questionElement.innerHTML = `Quiz Over! You scored ${score} out of ${questions.length}`;
    answerButtons.innerHTML = "";  // Clear answer buttons
    nextButton.style.display = "none";  // Hide the Next button
}

nextButton.addEventListener("click", showNextQuestion);

startQuiz();  // Start the quiz when the script loads
