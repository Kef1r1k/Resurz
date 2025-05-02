const searchButton = document.querySelector('.O_Header .A_SearchButton')
const search = document.querySelector('.O_Header .M_SearchBar')
const searchInput = search.querySelector('input')
const menu = document.querySelector('.O_Header')

function searchInit() {
  searchButton.addEventListener('click', () => {
    search.classList.toggle('active')
  })

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && searchInput.value.trim()) {
      window.location.href = `search.html?q=${encodeURIComponent(
        searchInput.value.trim()
      )}`
    }
  })

  document.addEventListener('click', (e) => {
    const isClickInsideMenu = menu.contains(e.target)
    const isClickInsideSearch = search.contains(e.target)

    if (!isClickInsideMenu && !isClickInsideSearch) {
      search.classList.remove('active')
    }
  })
}

document.addEventListener('DOMContentLoaded', searchInit())
