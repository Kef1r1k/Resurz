function filterCards(query, cardSelector, titleSelector = 'h5') {
  const normalizedQuery = query.trim().toLowerCase()
  const cards = document.querySelectorAll(cardSelector)

  cards.forEach((card) => {
    const titleElement = card.querySelector(titleSelector)
    const titleText = titleElement ? titleElement.textContent.toLowerCase() : ''

    if (normalizedQuery === '' || titleText.includes(normalizedQuery)) {
      card.style.display = 'flex'
    } else {
      card.style.display = 'none'
    }
  })
}

function initSearch(inputSelector, cardSelector, titleSelector = 'h5') {
  const inputs = document.querySelectorAll(inputSelector)

  inputs.forEach((input) => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        filterCards(e.target.value, cardSelector, titleSelector)
      }
    })

    input.addEventListener('input', (e) => {
      if (!e.target.value.trim()) {
        filterCards('', cardSelector, titleSelector)
      }
    })
  })
}

if (document.body.classList.contains('all_articles')) {
  initSearch('.M_SearchBar.articles input', '.C_Articles .M_ArticleCard', 'h5')
}

if (document.body.classList.contains('all_interviews')) {
  initSearch(
    '.M_SearchBar.articles input',
    '.C_Interviews .M_InterviewCard',
    'h4'
  )
}
