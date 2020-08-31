const word = document.getElementById('word');
const wrongLetters = document.getElementById('wrong-letters');
const playAgain = document.getElementById('play-again');
const popUp = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetterS = [];

// Show hidden word
function displayWords() {
    word.innerHTML = `
        ${selectedWord
            .split('')
            .map(
                (letter) =>
                    `<span class="letter">
                ${correctLetters.includes(letter) ? letter : ''}
            </span>`
            )
            .join('')}
    `;

    const innerWord = word.innerText.replace(/\n/g, '');

    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations You won ! 😊';
        popUp.style.display = 'flex';
    }
}

// * Update wrong letters
function updateWrongLetters() {
    // Display wrong letter
    wrongLetters.innerHTML = `
        ${wrongLetterS.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetterS.map((letter) => `<span>${letter}</span>`)}
    `;

    figureParts.forEach((part, index) => {
        const errors = wrongLetterS.length;
        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    if (wrongLetterS.length === figureParts.length + 1) {
        finalMessage.innerText = 'You lost 😢❗';
        popUp.style.display = 'flex';
    }
}

// * show Notification
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// * keydown letter events
window.addEventListener('keydown', (e) => {
    // console.log(e.keyCode);
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWords();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetterS.includes(letter)) {
                wrongLetterS.push(letter);

                updateWrongLetters();
            } else {
                showNotification();
            }
        }
    }
});

// Play again

playAgain.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetterS.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWords();

    updateWrongLetters();

    popUp.style.display = 'none';
});

displayWords();
