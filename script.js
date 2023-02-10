const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonElement = document.getElementById("answer-buttons");
const timerElement = document.getElementById("timer");
const saveScoreElement = document.getElementById("save-score");
const saveScoreButton = document.getElementById("save-score-btn");
const initialsInput = document.getElementById("initials");
let shuffledQuestions;
let currentQuestionIndex = 0;
let time = 60;
let timer = time;
let highScore = 0;
let lostTime = -5;
const highScoreElement = document.getElementById("highscore");
highScoreElement.textContent = highScore;
let canAnswer = true;
let timerinterval = null;


function endGame(timeUp = false) {
  clearInterval(timerinterval);
  timerElement.textContent = `Time left: 0 seconds`;
  startButton.textContent = "Restart";
  questionContainerElement.classList.add("hide");
  nextButton.classList.add("hide");
  startButton.classList.remove("hide");
  currentQuestionIndex = 0;
  canAnswer = true;
  alert(`${timeUp ? "Time Up! " : ""}Game Over your score is; ${highScore}`);
  saveScoreElement.classList.remove("hide");
  saveScoreButton.onclick = () => {
    localStorage.setItem(
      "highscore",
      `highScore : ${highScore} initials : ${initialsInput.value}`
    );
  };
  return false;
}
function startGame() {
  timer = time;
  timerElement.classList.remove("hide");
  startButton.classList.add("hide");
  timerElement.textContent = `Time left: ${timer} seconds`;
  highScore = 0;
  highScoreElement.textContent = highScore;
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  function updateTimer() {
    timer--;
    if (timer < 1) {
      endGame(true);
    }
    console.log(timer);
    timerElement.textContent = `Time left: ${timer} seconds`;
  }
  timerinterval = setInterval(updateTimer, 1000);
  setNextQuestion();
}
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    console.log(currentQuestionIndex);
    setNextQuestion();
  } else {
    endGame();
  }
});
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    setStatusClass(button, button.dataset.correct);
    button.addEventListener("click", selectAnswer);
    answerButtonElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonElement.firstChild) {
    answerButtonElement.removeChild(answerButtonElement.firstChild);
  }
  canAnswer = true;
}
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  if (canAnswer) {
    if (selectedButton.dataset.correct) {
      highScore += 1;
      highScoreElement.textContent = highScore;
    } else {
      timer = Math.max(0, timer - 5);
      console.log(timer);
      highScore -= 1;
      highScoreElement.textContent = highScore;
    }
  }
  canAnswer = false;
  console.log("click");

  if (questions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    endGame();
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}
const questions = [
  {
    question: "What is a String?",
    answers: [
      {
        text: "values made up of text and can contain letters, numbers, symbols, punctuation, and even emojis!",
        correct: true,
      },
      {
        text: "values that can be used in mathematical operations",
        correct: false,
      },
      { text: "values within a JS object", correct: false },
      { text: "The thing use to tie your shoe", correct: false },
    ],
  },
  {
    question: "What do you call this []?",
    answers: [
      { text: "A Value", correct: false },
      { text: "Variables", correct: false },
      { text: "Array", correct: true },
      { text: "A Box", correct: false },
    ],
  },
  {
    question:
      "If you need to know “yes” or “no” about something, what function you would want to use?",
    answers: [
      { text: "Array", correct: false },
      { text: "Conditional", correct: false },
      { text: "A Coin flip", correct: false },
      { text: "Boolean", correct: true },
    ],
  },
  {
    question:
      "A string toLowerCase method in JavaScript returns a copy of the string with its letters converted to lowercase. What is not affected?",
    answers: [
      { text: "Numbers, Symbols, and other characters", correct: true },
      { text: "Numbers and Symbols", correct: false },
      { text: "Nothing", correct: false },
      { text: "Everything", correct: false },
    ],
  },
  {
    question: "What is a strings trim method?",
    answers: [
      {
        text: "Returns a copy of the string with only the beginning whitespace characters removed",
        correct: false,
      },
      {
        text: "Returns a copy of the string with only the ending whitespace characters removed",
        correct: false,
      },
      {
        text: "Returns a copy of the string with beginning and ending whitespace characters removed.",
        correct: true,
      },
      { text: "Returns nothing only trim the space used", correct: false },
    ],
  },
  {
    question: "What does a Boolean do?",
    answers: [
      {
        text: "Are values that can be used in mathematical operations.",
        correct: false,
      },
      {
        text: "Are used as functions to get the values of variables, objects, conditions, and expressions.",
        correct: true,
      },
      {
        text: "Returns a copy of the string with beginning and ending whitespace characters removed.",
        correct: false,
      },
      {
        text: "Make any soup taste much better depending on what kind pork, chicken, beef",
        correct: false,
      },
    ],
  },
  {
    question:
      "Array are container-like values that can hold other values. The values inside an array are called elements. TRUE or False",
    answers: [
      { text: "True!", correct: true },
      { text: "FALSE!", correct: false },
      { text: "LIES!", correct: false },
      { text: "Not too sure", correct: false },
    ],
  },
  {
    question: "What is a variable?",
    answers: [
      {
        text: "Variables are strings and can be use to control vaules",
        correct: false,
      },
      {
        text: "Variables are named values and can store any type of JavaScript value.",
        correct: true,
      },
      {
        text: "Variables are a set of arrays in a JaveScript file",
        correct: false,
      },
      { text: "Variables are not use in JavaScript", correct: false },
    ],
  },
  {
    question: "Why do you use JavaScript functions?",
    answers: [
      {
        text: "Functions are great for efficiency - you can define it one time and then use it multiple times, as needed.",
        correct: true,
      },
      {
        text: "Functions can be useful but takes aot of work and only use it once",
        correct: false,
      },
      { text: "Functions are great, they can fill in CSS", correct: false },
      { text: "Fucnctions are bad and they should not be used!", correct: false },
    ],
  },
  {
    question: "What are Operators?",
    answers: [
      {
        text: "Operators are value is one that can either be TRUE or FALSE. If you need to know “yes” or “no” about something",
        correct: false,
      },
      {
        text: "Operators are container-like values that can hold other values",
        correct: false,
      },
      {
        text: "Operators are values made up of text and can contain letters, numbers, symbols, punctuation, and even emojis! ",
        correct: false,
      },
      {
        text: "Operators are the symbols between values that allow different operations like addition, subtraction, multiplication, and more.",
        correct: true,
      },
    ],
  },
];
