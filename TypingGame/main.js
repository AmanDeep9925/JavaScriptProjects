const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const endgameElement = document.getElementById('end-game-container');
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

let time = 15;

// set difficult to value in storage
let difficulty =
    localStorage.getItem('difficulty') !== null
        ? localStorage.getItem('difficulty')
        : 'medium';

// set difficulty select value

difficultySelect.value =
    localStorage.getItem('difficulty') !== null
        ? localStorage.getItem('difficulty')
        : 'medium';

// focus on text start

text.focus();

// Start timer down

const timeInterval = setInterval(updateTime, 1000);

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

function updateScore() {
    score += 10;
    scoreElement.innerHTML = score;
}

// Update time
function updateTime() {
    time--;
    timeElement.innerHTML = time + 's';

    if (time == 0) {
        clearInterval(timeInterval);

        // end game

        gameOver();
    }
}

// GameOver show screen

function gameOver() {
    endgameElement.innerHTML = `
        <h1> Time ran out </h1>
        <p> Your final score is ${score}</p>
        <button onclick = "location.reload()">Play Again</button>
    `;
    endgameElement.style.display = 'flex';
}

addWordToDom();

// Adding event to input element

// Typing
text.addEventListener('input', (e) => {
    const insertedText = e.target.value;

    if (insertedText === randomWord) {
        addWordToDom();

        updateScore();
        // clear the input
        e.target.value = '';

        if (difficulty == 'hard') {
            time += 2;
        } else if ((difficulty = 'medium')) {
            time += 3;
        } else {
            time += 5;
        }

        updateTime();
    }
});

// Settings btn click

settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hide');
});

// Difficluty select

settingsForm.addEventListener('change', (e) => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});
