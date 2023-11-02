const timerElement = document.querySelector('.js-timer');
let Interval;

displayTimer();

function displayTimer() {
  const timerObject = getValue();
  let i = timerObject.second;
  let j = timerObject.minute;
  let z = timerObject.hour;
  if (i < 10 && j < 10) {
    if (z > 0)
      timerElement.innerHTML = `${z}:0${j}:0${i}`;
    else
      timerElement.innerHTML = `0${j}:0${i}`;
  } else if (i < 10 && j >= 10) {
    if (z > 0)
      timerElement.innerHTML = `${z}:${j}:0${i}`;
    else
      timerElement.innerHTML = `${j}:0${i}`;
  } else if (i >= 10 && j < 10) {
    if (z > 0)
      timerElement.innerHTML = `${z}:0${j}:${i}`;
    else
      timerElement.innerHTML = `0${j}:${i}`;
  } else {
    if (z > 0)
      timerElement.innerHTML = `${z}:${j}:${i}`;
    else
      timerElement.innerHTML = `${j}:${i}`;
  }
}

function getValue() {
  const second = JSON.parse(localStorage.getItem('timer-second')) || 0;
  const minute = JSON.parse(localStorage.getItem('timer-minute')) || 0;
  const hour = JSON.parse(localStorage.getItem('timer-hour')) || 0;
  return { second, minute, hour };
}

function startCountUp() {
  const startStop = document.querySelector('.js-start-stop');
  const timerObject = getValue();
  // let { second, minute, hour } = timerObject;
  let i = timerObject.second;
  let j = timerObject.minute;
  let z = timerObject.hour;

  if (startStop.innerHTML === 'Start') {
    startStop.innerHTML = 'Stop';
    startStop.classList.add('stop-bg');
    Interval = setInterval(() => {
      if (i < 9 && j < 10) {
        if (z > 0)
          timerElement.innerHTML = `${z}:0${j}:0${++i}`;
        else
          timerElement.innerHTML = `0${j}:0${++i}`;
      } else if (i < 9 && j >= 10) {
        if (z > 0)
          timerElement.innerHTML = `${z}:${j}:0${++i}`;
        else
          timerElement.innerHTML = `${j}:0${++i}`;
      } else if (i >= 9 && i < 59 && j < 10) {
        if (z > 0)
          timerElement.innerHTML = `${z}:0${j}:${++i}`;
        else
          timerElement.innerHTML = `0${j}:${++i}`;
      } else if (i >= 9 && i < 59 && j >= 10) {
        if (z > 0)
          timerElement.innerHTML = `${z}:${j}:${++i}`;
        else 
          timerElement.innerHTML = `${j}:${++i}`;
      } else if (i === 59 && j < 9) {
        i = 0;
        if (z > 0)
          timerElement.innerHTML = `${z}:0${++j}:00`;
        else
          timerElement.innerHTML = `0${++j}:00`;
      } else if (i === 59 && j >= 9 && j < 59) {
        i = 0;
        if (z > 0)
          timerElement.innerHTML = `${z}:${++j}:00`;
        else
          timerElement.innerHTML = `${++j}:00`;
      } else {
        i = 0;
        j = 0;
        timerElement.innerHTML = `${++z}:00:00`;
      }
      saveToLocalStorage(i, j, z);
    }, 1000);
  } else {
    startStop.innerHTML = 'Start';
    startStop.classList.remove('stop-bg');
    clearInterval(Interval);
  }
}

function resetTimer() {
  timerElement.innerHTML = '00:00';
  localStorage.removeItem('timer-second');
  localStorage.removeItem('timer-minute');
  localStorage.removeItem('timer-hour');
}

function saveToLocalStorage(second, minute, hour) {
  localStorage.setItem('timer-second', JSON.stringify(second));
  localStorage.setItem('timer-minute', JSON.stringify(minute));
  localStorage.setItem('timer-hour', JSON.stringify(hour));
}

document.querySelector('.js-start-stop')
  .addEventListener('click', () => {
    startCountUp();
  });

document.querySelector('.js-reset')
  .addEventListener('click', () => {
    resetTimer();
  });