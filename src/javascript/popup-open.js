const popup = document.querySelector('.M_PopUp')
const popupButton = document.querySelector('.A_Button.download')
const closeButton = popup.querySelector('.A_CloseButton')
const bgblur = document.querySelector('.Q_BackgroundBlur')

function popupInit() {
  popupButton.addEventListener('click', popupOpen)
  closeButton.addEventListener('click', popupClose)
}

function popupOpen() {
  popup.classList.add('active'), bgblur.classList.add('active')
}

function popupClose() {
  popup.classList.remove('active'), bgblur.classList.remove('active')
}

document.addEventListener('DOMContentLoaded', popupInit())
