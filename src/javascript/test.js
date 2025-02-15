const startButton = document.getElementById('startTest')
const test = document.querySelector('.O_TestPopUp')
const closeButton = test.querySelector('.A_CloseButton')

function testInit() {
  console.log('start')
  startButton.addEventListener('click', testOpen)
  closeButton.addEventListener('click', popupClose)
}

function testOpen() {
  console.log('open')

  test.classList.add('active')
}

function popupClose() {
  test.classList.remove('active')
}

document.addEventListener('DOMContentLoaded', testInit())
