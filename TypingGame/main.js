const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const endgame = document.getElementById('end-game');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// * List of words for game

const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving',
];

// Init word

let randomWord;

// Init Score
let score = 0;

// Init Time

let time = 10;

// genrates random word

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Add word to Dom

function addWordToDom() {
    randomWord = getRandomWord();
    word.innerText = randomWord;
}

// Update Score

function updateScore(){
    score+=10;
    scoreElement.innerHTML = score;
}


addWordToDom();

// Adding event to input element

text.addEventListener('input', (e) => {
    const insertedText = e.target.value;

    if(insertedText === randomWord){
        addWordToDom();

        updateScore();
        // clear the input
        e.target.value='';
    }
});
