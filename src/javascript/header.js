const menuButton = document.querySelector('.A_BurgerButton')
const closeButton = document.querySelector('.A_CloseButton')
const menu = document.querySelector('.O_MobileMenu')
const bgblur = document.querySelector('.Q_BackgroundBlur')

const mediaphone = window.matchMedia(
  '(min-width: 320px) and (max-width: 730px)'
)

function menuInit() {
  menuButton.addEventListener('click', menuOpen)
  closeButton.addEventListener('click', menuClose)
}

function menuOpen() {
  menu.classList.add('active'), bgblur.classList.add('active')
}

function menuClose() {
  menu.classList.remove('active'), bgblur.classList.remove('active')
}

document.addEventListener('DOMContentLoaded', () => {
  if (mediaphone.matches) {
    menuInit()
  }
})
