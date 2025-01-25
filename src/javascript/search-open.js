const search = document.querySelector('.O_Header .M_SearchBar')

function searchInit() {
  search.addEventListener('click', (e) => {
    search.classList.toggle('active')
  })
}

document.addEventListener('DOMContentLoaded', searchInit())
