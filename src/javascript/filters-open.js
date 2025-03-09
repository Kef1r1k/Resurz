const filtersButton = document.querySelector('.A_FiltersButton')
const filters = document.querySelector('.O_Filters')
const closeButton = filters.querySelector('.A_CloseButton')
const bgblur = document.querySelector('.Q_BackgroundBlur')

const mediaphone = window.matchMedia(
  '(min-width: 320px) and (max-width: 730px)'
)

function filtersInit() {
  filtersButton.addEventListener('click', filtersOpen)
  closeButton.addEventListener('click', filtersClose)
}

function filtersOpen() {
  document.body.classList.add('overflow-hidden')
  filters.classList.add('active'), bgblur.classList.add('active')
}

function filtersClose() {
  document.body.classList.remove('overflow-hidden')
  filters.classList.remove('active'), bgblur.classList.remove('active')
}

document.addEventListener('DOMContentLoaded', () => {
  if (mediaphone.matches) {
    filtersInit()
  }
})
