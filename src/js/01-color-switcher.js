let intervalId = null;

const refs = {
    body: document.querySelector('body'),
    start_btn: document.querySelector('button[data-start]'),
    stop_btn: document.querySelector('button[data-stop]'),
}

// console.log(refs.body);
// // console.log(refs.start_btn);
// // console.log(refs.stop_btn);
refs.start_btn.addEventListener('click', startchangeColorBody);
refs.stop_btn.addEventListener('click', stopchangeColorBody);


function startchangeColorBody(e) {
    console.log('event');
    intervalId = setInterval((e) => {
        refs.body.style.backgroundColor = getRandomHexColor()
    }, 1000);
    
    refs.start_btn.setAttribute('disabled', 'true');
};

function stopchangeColorBody(e) {
    clearInterval(intervalId);

    refs.start_btn.setAttribute('disabled', 'false');

};



function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
