// Accessing the DOM Elements

const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionareBtn = document.getElementById('show-millionare');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

//  Fetching the user and add money

async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first}${user.name.last}`,
        money: Math.floor(Math.random() * 1000000),
    };
    addData(newUser);
}

function doubleMoney() {
    data = data.map((user) => {
        return { ...user, money: user.money * 2 };
    });

    updateDOM();
}

function sortByRichest() {
    data.sort((a, b) => b.money - a.money);
    updateDOM();
}

function showMillionares() {
    data = data.filter((user) => {
        return user.money > 1000000;
    });
    updateDOM();
}

function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);

    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3>Total Wealth : <strong>${formatMoney(
        wealth
    )}</strong></h3>`;
    main.appendChild(wealthElement);
}

function addData(obj) {
    data.push(obj);

    updateDOM();
}

function updateDOM(providedData = data) {
    // * clear main DIV
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

    providedData.forEach((item) => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong>${formatMoney(
            item.money
        )}`;

        main.appendChild(element);
    });
}

// * format number as money

function formatMoney(number) {
    return '$ ' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// EventListener
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionareBtn.addEventListener('click', showMillionares);
calculateWealthBtn.addEventListener('click', calculateWealth);
