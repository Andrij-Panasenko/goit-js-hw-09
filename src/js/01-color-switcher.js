function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
}

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

btnStart.addEventListener('click', onStartClick);
btnStop.addEventListener('click', onStopClick);

let intervalId = null;
btnStop.disabled = true;

function onStartClick() { 
  btnStart.disabled = true;
  btnStop.disabled = false;

  intervalId = setInterval(() => { 
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000)
};



function onStopClick() {
  clearInterval(intervalId);
  intervalId = null;
  btnStop.disabled = true;
  btnStart.disabled = false;
 };