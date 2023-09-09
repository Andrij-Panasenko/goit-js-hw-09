import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const minute = document.querySelector('[data-minutes]');
const second = document.querySelector('[data-seconds]');

startBtn.addEventListener('click', startCounterHandler);

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0].getTime();
    const currentDate = Date.now();
    
    if (selectedDate <= currentDate) {
      alert('Please choose a date in the future');
      inputDate._flatpickr.setDate(new Date());
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(inputDate, options);

function startCounterHandler() {
  const selectedData = new Date(inputDate.value).getTime();
  const currentData = Date.now();
  let deltaTime = selectedData - currentData;
  
  startBtn.disabled = true;
  
  const countDown = setInterval(() => {
    const timeValue = convertMs(deltaTime);
    updateClockFace(timeValue);
    deltaTime -= 1000;

    if (deltaTime <= 0) {
      clearInterval(countDown);
      startBtn.disabled = false;
    }
  }, 1000);
}

// відмальовує інтерфейс
function updateClockFace({ days, hours, minutes, seconds }) {
  day.textContent = `${days}`;
  hour.textContent = `${hours}`;
  minute.textContent = `${minutes}`;
  second.textContent = `${seconds}`;
}

//функція приведення числа до стрінги і додавання нуля якщо число однозначне
function pad(value) {
  return String(value).padStart(2, '0');
}

//сюди передаємо дельту часу
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  //використання ф-ції pad()
  const days = Math.floor(ms / day);
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
