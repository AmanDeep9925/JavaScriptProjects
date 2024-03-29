const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const year = document.getElementById("year");
const loading = document.getElementById("loading");

const countDown = document.getElementById("countdown");

const currentYear = new Date().getFullYear();

const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

year.innerText = currentYear + 1;

// * update countdown time

let updateCountdown = () => {
  const currentTime = new Date();
  const diff = newYearTime - currentTime;

  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  const h = Math.floor(diff / 1000 / 60 / 60) % 24;
  const m = Math.floor(diff / 1000 / 60) % 60;
  const s = Math.floor(diff / 1000) % 60;

  days.innerHTML = d;
  hours.innerHTML = h < 10 ? "0" + h : h;
  minutes.innerHTML = m < 10 ? "0" + m : m;
  seconds.innerHTML = s < 10 ? "0" + s : s;
};

// * show spinner befor countdown

setTimeout(() => {
  loading.remove();
  countDown.style.display = "flex";
}, 1000);

// * run every second
setInterval(updateCountdown, 1000);
