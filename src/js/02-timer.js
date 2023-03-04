// імпорт бібліотеки flatpickr
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// імпорт елементу Notify з бібліотеки Notiflix
import { Notify } from 'notiflix';
// Додатковий імпорт стилів
import "notiflix/dist/notiflix-3.2.6.min.css"

let startDate = 0;

const refs = {
    input: document.querySelector('#datetime-picker'),
    start_btn: document.querySelector('button[data-start]'),
    daysSpan: document.querySelector('span[data-days]'),
    hoursSpan: document.querySelector('span[data-hours]'),
    minutesSpan: document.querySelector('span[data-minutes]'),
    secondsSpan: document.querySelector('span[data-seconds]'),
};

// робимо кнопку Start не активною
refs.start_btn.setAttribute('disabled', 'true');

// налаштування та ініціалізація бібліотеки flatpickr

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        if (selectedDates[0] < new Date()) {
            Notify.failure("Please choose a date in the future");
            return
        }
        startDate = selectedDates[0];
        refs.start_btn.removeAttribute('disabled');
        Notify.success("Let's start?")

    },
};

flatpickr("#datetime-picker", options);



// функціонал таймера
const timer = {
    // запускає таймер
    start() {
        const startTime = startDate;

        intervalID = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = startTime - currentTime;
            const { days, hours, minutes, seconds } = convertMs(deltaTime);

            updateFaceTimer({ days, hours, minutes, seconds });

            // перевірка для зупинки таймера
            if (
            refs.daysSpan.textContent === '0' &&
            refs.hoursSpan.textContent === '00' &&
            refs.minutesSpan.textContent === '00' &&
            refs.secondsSpan.textContent === '00'
          ) {
            clearInterval(intervalID);
          }
        }, 1000)
    },

    
};

//Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков
const addLeadingZero = value => String(value).padStart(2, '0');

// оновлює інтерфейс таймеру
function updateFaceTimer({ days, hours, minutes, seconds }) {
    refs.daysSpan.textContent = days;
    refs.hoursSpan.textContent = `${hours}`;
    refs.minutesSpan.textContent = `${minutes}`;
    refs.secondsSpan.textContent = `${seconds}`;
};



function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

refs.start_btn.addEventListener('click', timer.start);