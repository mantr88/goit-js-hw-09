let intervalId = null;

const refs = {
    body: document.querySelector('body'),
    start_btn: document.querySelector('button[data-start]'),
    stop_btn: document.querySelector('button[data-stop]'),
}

refs.start_btn.addEventListener('click', startchangeColorBody);
refs.stop_btn.addEventListener('click', stopchangeColorBody);



function startchangeColorBody(e) {
    intervalId = setInterval((e) => {
        refs.body.style.backgroundColor = getRandomHexColor()
    }, 1000);
    
    refs.start_btn.setAttribute('disabled', 'true');
    refs.stop_btn.removeAttribute('disabled');
};

function stopchangeColorBody(e) {
    clearInterval(intervalId);

    refs.start_btn.removeAttribute('disabled');
    refs.stop_btn.setAttribute('disabled', 'true');
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
