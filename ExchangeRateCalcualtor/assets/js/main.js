const currencyElementOne = document.getElementById('currency-one');
const currencyElementTwo = document.getElementById('currency-two');
const amountOne = document.getElementById('amount-one');
const amountTwo = document.getElementById('amount-two');
const rateElement = document.getElementById('rate');
const swap = document.getElementById('swap');

// * Exchange Rate API URL
const APU_URI = 'https://v6.exchangerate-api.com/v6/';
const API_KEY = '334fab9baea9b394081df023';

// * Fetch Exhange rate and will update the DOM
function calculate() {
    const currencyOne = currencyElementOne.value;
    const currencyTwo = currencyElementTwo.value;
    const URL = `${APU_URI}${API_KEY}/latest/${currencyOne}`;
    fetch(URL)
        .then((res) => res.json())
        .then((data) => {
            const rate = data.conversion_rates[currencyTwo];
            rateElement.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;

            amountTwo.value = (amountOne.value * rate).toFixed(2);
        });
}

// * Event Listeners

currencyElementOne.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
currencyElementTwo.addEventListener('change', calculate);
amountTwo.addEventListener('input', calculate);
swap.addEventListener('click',() => {
    const temp = currencyElementOne.value;
    currencyElementOne.value = currencyElementTwo.value;
    currencyElementTwo.value = temp;
    calculate();
})

calculate();
