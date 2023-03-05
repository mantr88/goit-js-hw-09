// імпорт елементу Notify з бібліотеки Notiflix
import { Notify } from 'notiflix';
// Додатковий імпорт стилів
import "notiflix/dist/notiflix-3.2.6.min.css"

// отрумуємо посилання на елемент DOM форми
const form = document.querySelector('.form');

// оголошуємо змінні для запису значень введених в input
let ut = null;
let stepInput = null;
let amountInput = null;

// функція, що створює та повертає проміс
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// обробник при відправці форми
const submitHandler = e => {
  e.preventDefault();
  
  // деструктуризуємо дані з інпутів
  const {
    elements: { delay, step, amount },
  } = e.currentTarget;

  // записуємо отримані дані до відповідних змінних
  delayInput = Number(delay.value);
  stepInput = Number(step.value);
  amountInput = Number(amount.value);
// цикл для  виклику функції createPromise стільки разів, скільки ввели в поле amount
  for (let i = 1; i <= amountInput; i+= 1) {
    createPromise(i, delayInput)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delayInput += stepInput;
  }
// очищення форми після submit
  e.currentTarget.reset();
};

// встановленя слухача для події submit
form.addEventListener('submit', submitHandler);