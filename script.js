//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris",
    },
    {
        question: "What is the highest mountain in the world?",
        choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
        answer: "Everest",
    },
    {
        question: "What is the largest country by area?",
        choices: ["Russia", "China", "Canada", "United States"],
        answer: "Russia",
    },
    {
        question: "Which is the largest planet in our solar system?",
        choices: ["Earth", "Jupiter", "Mars"],
        answer: "Jupiter",
    },
    {
        question: "What is the capital of Canada?",
        choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
        answer: "Ottawa",
    },
];

// Load saved progress from session storage
const userAnswers = JSON.parse(sessionStorage.getItem('progress')) || [];

// Display the quiz questions and choices
function renderQuestions() {
    const questionsElement = document.getElementById("quiz");
    questionsElement.innerHTML = ""; // Clear previous questions
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const questionElement = document.createElement("div");
        
        // Display question text
        const questionText = document.createTextNode(question.question);
        questionElement.appendChild(questionText);
        
        // Create radio buttons for choices
        for (let j = 0; j < question.choices.length; j++) {
            const choice = question.choices[j];
            const choiceElement = document.createElement("input");
            choiceElement.setAttribute("type", "radio");
            choiceElement.setAttribute("name", `question-${i}`);
            choiceElement.setAttribute("value", choice);
            if (userAnswers[i] === choice) {
                choiceElement.checked = true; // Restore saved answer
            }
            
            const choiceText = document.createTextNode(choice);
            questionElement.appendChild(choiceElement);
            questionElement.appendChild(choiceText);
        }
        questionsElement.appendChild(questionElement);
    }
}

// Save user answers to session storage
function saveProgress() {
    const answers = [];
    for (let i = 0; i < questions.length; i++) {
        const selected = document.querySelector(`input[name="question-${i}"]:checked`);
        answers[i] = selected ? selected.value : null; // Store selected answer or null
    }
    sessionStorage.setItem('progress', JSON.stringify(answers));
}

// Calculate score and display results
function calculateScore() {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
        const selectedAnswer = userAnswers[i];
        if (selectedAnswer === questions[i].answer) {
            score++;
        }
    }
    document.getElementById("result").innerText = `Your score is ${score} out of ${questions.length}.`;
    localStorage.setItem('score', score); // Store score in local storage
}

// Event listeners
document.getElementById("submit").addEventListener("click", () => {
    saveProgress(); // Save progress before submission
    calculateScore();
});

// Render questions on page load
renderQuestions();


