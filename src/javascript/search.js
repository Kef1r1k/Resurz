import { getArticles } from './search-data.js'

function getSearchQuery() {
  const params = new URLSearchParams(window.location.search)
  return params.get('q') || ''
}

function filterArticles(articles, query) {
  if (!query) return []

  const lowerQuery = query.toLowerCase()
  return articles.filter((article) => {
    return (
      (article.title && article.title.toLowerCase().includes(lowerQuery)) ||
      (article.tags &&
        article.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)))
    )
  })
}

function displayResults(articles) {
  const resultsContainer = document.querySelector('.C_Articles')
  const noResults = document.querySelector('.A_PageCover')

  noResults.style.display = 'none'
  resultsContainer.innerHTML = ''

  if (articles.length === 0) {
    resultsContainer.style.display = 'none'
    noResults.style.display = 'block'
    return
  }

  resultsContainer.style.display = 'flex'

  articles.forEach((article) => {
    const teaser = createTeaser(article)
    resultsContainer.appendChild(teaser)
  })
}

function createTeaser(article) {
  const teaser = document.createElement('a')
  teaser.className = 'M_ArticleCard'
  teaser.href = article.link

  const tagClass = article.style ? article.style.toLowerCase() : 'default'

  teaser.innerHTML = `
        <div class="A_PostCover small">
            <img src="${article.image}" alt="${article.title}" />
        </div>
        <h5>${article.title}</h5>
        <div class="C_Tags">
            ${article.tags
              .map((tag) => `<div class="A_Tag ${tagClass}">${tag}</div>`)
              .join('')}
        </div>
    `

  return teaser
}

async function performSearch() {
  const loader = document.querySelector('.A_LoaderSpinner')
  loader.style.display = 'block'

  const noResults = document.querySelector('.A_PageCover')
  noResults.style.display = 'none'
  const resultsContainer = document.querySelector('.C_Articles')
  resultsContainer.style.display = 'none'
  resultsContainer.innerHTML = ''

  try {
    const articles = await getArticles()
    const filteredArticles = filterArticles(articles, getSearchQuery())
    displayResults(filteredArticles)
  } catch (error) {
    console.error('Search error:', error)
    resultsContainer.innerHTML = `
        <p>Произошла ошибка при загрузке</p>
    `
    resultsContainer.style.display = 'block'
  } finally {
    loader.style.display = 'none'
  }
}

document.addEventListener('DOMContentLoaded', performSearch)
