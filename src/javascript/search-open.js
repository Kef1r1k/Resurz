function searchInit() {
  // Десктопное поле поиска
  const desktopSearchButton = document.querySelector(
    '.O_Header .A_SearchButton'
  )
  const desktopSearch = document.querySelector('.O_Header .M_SearchBar')
  const desktopSearchInput = desktopSearch.querySelector('input')

  // Мобильное поле поиска
  const mobileSearch = document.querySelector('.O_MobileMenu .M_SearchBar')
  const mobileSearchInput = mobileSearch.querySelector('input')

  const menu = document.querySelector('.O_Header')
  const mobileMenu = document.querySelector('.O_MobileMenu')

  function handleSearch(query) {
    if (query.trim()) {
      window.location.href = `search.html?q=${encodeURIComponent(query.trim())}`
    }
  }

  desktopSearchButton.addEventListener('click', () => {
    desktopSearch.classList.toggle('active')
  })

  desktopSearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSearch(desktopSearchInput.value)
    }
  })

  mobileSearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSearch(mobileSearchInput.value)
    }
  })

  document.addEventListener('click', (e) => {
    const isClickInsideMenu = menu.contains(e.target)
    const isClickInsideSearch = desktopSearch.contains(e.target)
    const isClickInsideMobileMenu = mobileMenu.contains(e.target)

    if (!isClickInsideMenu && !isClickInsideSearch) {
      desktopSearch.classList.remove('active')
    }
  })
}

document.addEventListener('DOMContentLoaded', searchInit())
