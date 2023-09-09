const promisesGeneratorForm = document.querySelector('.form');

promisesGeneratorForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();

  const firstDelay = Number(promisesGeneratorForm.delay.value);
  const delayStep = Number(promisesGeneratorForm.step.value);
  const amount = Number(promisesGeneratorForm.amount.value);

  for (let i = 1; i <= amount; i++) {
    const delay = firstDelay + delayStep * (i - 1);

    createPromise(i, delay)
      .then(message => console.log(message, 'color: green; font-size: 18px;'))
      .catch(message => console.log(message, 'color: red; font-size: 18px;'));
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve(`%c ✅ Fulfilled promise ${position} in ${delay} ms`);
      } else {
        reject(`%c ❌ Rejected promise ${position} in ${delay} ms`);
      }
    }, delay);
  });
};