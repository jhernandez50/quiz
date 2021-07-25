var questions = [
    
    {
    question: "What is the default trunking method?",
    choice1: "ISL",
    choice2: "802.1q",
    choice3: "VLAN",
    choice4: "None",
    answer: 2
  },
  {
    question: "What is the default vaule for STP?",
    choice1: "1",
    choice2: "2",
    choice3: "3",
    choice4: "32768",
    answer: 4
  },
  {
    question: "What is the AD of OSPF?",
    choice1: "120",
    choice2: "110",
    choice3: "90",
    choice4: "80",
    answer: 2
  },
  {
    question: "What is the Cisco propietary protocol?",
    choice1: "OSPF",
    choice2: "EIGRP",
    choice3: "BGP",
    choice4: "RIP",
    answer: 1
  },
  {
    question: "Which is the binary number or 128?",
    choice1: "00110111",
    choice2: "10000000",
    choice3: "11000100",
    choice4: "11011100",
    answer: 2
  }
];  


var loader = document.getElementById('loader');
var game = document.getElementById('game');
var question = document.getElementById('question');
var choices = Array.from(document.getElementsByClassName('choices'));
var progressText = document.getElementById('progressText');
var score = 0;
var questionCounter = 0;
var scoreText = document.getElementById('score');
var currentQuestion = {};
var acceptingAnswers = false;
var availableQuesions = [];
const pointPerQuestion = 25;
const maxNumberQuestion = 4;


    function startGame(){
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};



function getNewQuestion(){
    if (availableQuesions.length === 0 || questionCounter >= maxNumberQuestion) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('final.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${maxNumberQuestion}`;


    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(pointPerQuestion);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};
startGame();