const sortButton = document.querySelector('.A_SortButton')
const sort = document.querySelector('.M_Sort')

function sortInit() {
  sortButton.addEventListener('click', (e) => {
    sort.classList.toggle('active')
  })
}

document.addEventListener('DOMContentLoaded', sortInit())
