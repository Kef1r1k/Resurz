document.addEventListener('DOMContentLoaded', () => {
  let selectedTags = []

  const desktopFilterContainer = document.querySelector('.C_Tags.desktop')
  const mobileFilterContainer = document.querySelector('.C_Tags.mobile')
  const resetButtonDesktop = document.getElementById('resetFilterButton')
  const resetButtonMobile = document.getElementById('resetFilterButtonMobile')

  function toggleTag(tag) {
    const desktopTags = document.querySelectorAll('.C_Tags.desktop .A_Tag')
    const mobileTags = document.querySelectorAll('.C_Tags.mobile .A_Tag')

    desktopTags.forEach((t) => {
      if (t.textContent === tag) {
        t.classList.toggle('selected')
      }
    })

    mobileTags.forEach((t) => {
      if (t.textContent === tag) {
        t.classList.toggle('selected')
      }
    })

    if (selectedTags.includes(tag)) {
      selectedTags = selectedTags.filter((t) => t !== tag)
    } else {
      selectedTags.push(tag)
    }

    filterArticlesByTags(selectedTags)
  }

  function filterArticlesByTags(tags) {
    const articles = document.querySelectorAll('.M_ArticleCard')

    articles.forEach((article) => {
      const articleTags = article.querySelectorAll('.A_Tag')

      let hasAllTags = tags.every((tag) =>
        Array.from(articleTags).some((t) => t.textContent === tag)
      )

      if (hasAllTags || tags.length === 0) {
        article.style.display = 'flex'
      } else {
        article.style.display = 'none'
      }

      articleTags.forEach((t) => {
        if (tags.includes(t.textContent)) {
          t.classList.add('selected')
        } else {
          t.classList.remove('selected')
        }
      })
    })
  }

  function resetFilter() {
    const articles = document.querySelectorAll('.M_ArticleCard')
    const desktopTags = document.querySelectorAll('.C_Tags.desktop .A_Tag')
    const mobileTags = document.querySelectorAll('.C_Tags.mobile .A_Tag')
    const articleTags = document.querySelectorAll('.M_ArticleCard .A_Tag')

    articles.forEach((article) => {
      article.style.display = 'flex'
    })

    desktopTags.forEach((t) => {
      t.classList.remove('selected')
    })

    mobileTags.forEach((t) => {
      t.classList.remove('selected')
    })

    articleTags.forEach((t) => {
      t.classList.remove('selected')
    })

    selectedTags = []
  }

  desktopFilterContainer.addEventListener('click', (event) => {
    const tagElement = event.target
    if (tagElement.classList.contains('A_Tag')) {
      const tag = tagElement.getAttribute('data-tag')
      toggleTag(tag)
    }
  })

  mobileFilterContainer.addEventListener('click', (event) => {
    const tagElement = event.target
    if (tagElement.classList.contains('A_Tag')) {
      const tag = tagElement.getAttribute('data-tag')
      toggleTag(tag)
    }
  })

  resetButtonDesktop.addEventListener('click', () => {
    resetFilter()
  })

  resetButtonMobile.addEventListener('click', () => {
    resetFilter()
  })
})
