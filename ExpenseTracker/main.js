// * DOM ELEMENTS

const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
);

// const dummyTransaction = [
//     { id: 1, text: 'flower', amount: -200 },
//     { id: 2, text: 'Salary', amount: 20000 },
//     { id: 3, text: 'Book', amount: -400 },
//     { id: 4, text: 'Camera', amount: +40000 },
// ];

let transactions =
    localStorage.getItem('transactions') != null
        ? localStorageTransactions
        : [];
// * Add Transaction

function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add text and amount');
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value,
        };

        transactions.push(transaction);

        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();
        text.value = '';
        amount.value = '';
    }
}

// Generates random ID

function generateID() {
    return Math.floor(Math.random() * 1000000);
}

// * Add transaction to DOM

function addTransactionDOM(transaction) {
    // * get the sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    // Add class based on value

    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
        transaction.amount
    )}</span> <button class="delete-btn" onclick="removeTransaction(${
        transaction.id
    })">X</button>
    `;

    list.appendChild(item);
}

// * Deleting the transaction by ID

function removeTransaction(id) {
    transactions = transactions.filter((transaction) => transaction.id !== id);
    updateLocalStorage();
    init();
}

// * Updating the balance income and expense

function updateValues() {
    const amounts = transactions.map((transaction) => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const income = amounts
        .filter((item) => item > 0)
        .reduce((acc, item) => acc + item, 0)
        .toFixed(2);
    const expense = (
        amounts
            .filter((item) => item < 0)
            .reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2);
    balance.innerText = `₹${total}`;
    moneyMinus.innerText = `₹${expense}`;
    moneyPlus.innerText = `₹${income}`;
}

// Update loaclstorage

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

// EventListener

form.addEventListener('submit', addTransaction);
