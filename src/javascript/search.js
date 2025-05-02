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

  if (articles.length === 0) {
    resultsContainer.style.display = 'none'
    noResults.style.display = 'block'
    return
  }

  noResults.style.display = 'none'
  resultsContainer.innerHTML = ''

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
  const articles = await getArticles()
  const filteredArticles = filterArticles(articles, getSearchQuery())
  displayResults(filteredArticles, getSearchQuery())
}

document.addEventListener('DOMContentLoaded', performSearch)
