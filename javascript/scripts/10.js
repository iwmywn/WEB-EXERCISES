// 10c
const test = document.querySelector('.js-btn');
const result = test.classList.contains('js-btn')
console.log(result);

// 10d
function btnClick(selector) {
  const optionElement = document.querySelector(selector);
  if (optionElement.classList.contains('is-toggled')) {
    optionElement.classList.remove('is-toggled');
  } else {
    turnOffPreviousBtn();
    optionElement.classList.add('is-toggled');
  }
}

function turnOffPreviousBtn() {
  const previousBtn = document.querySelector('.is-toggled');
  if (previousBtn) {
    previousBtn.classList.remove('is-toggled');
  }
}