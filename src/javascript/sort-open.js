function initSorting() {
  const isArticlesPage = document.body.classList.contains('all_articles')
  const isInterviewsPage = document.body.classList.contains('all_interviews')

  if (!isArticlesPage && !isInterviewsPage) return

  const sortButton = document.querySelector('.A_SortButton')
  const sort = document.querySelector('.M_Sort')
  const sortOptions = sort.querySelectorAll('.A_SortOption')
  const container = isArticlesPage
    ? document.querySelector('.C_Articles')
    : document.querySelector('.C_Interviews')
  const cardSelector = isArticlesPage ? '.M_ArticleCard' : '.M_InterviewCard'

  function applySorting(order) {
    const cards = Array.from(container.querySelectorAll(cardSelector))

    cards.sort((a, b) => {
      const dateA = new Date(a.dataset.date)
      const dateB = new Date(b.dataset.date)
      return order === 'newest' ? dateB - dateA : dateA - dateB
    })

    cards.forEach((card) => container.appendChild(card))
  }

  sortButton.addEventListener('click', (e) => {
    sort.classList.toggle('active')
  })

  sortOptions.forEach((option) => {
    option.addEventListener('click', function (e) {
      sortOptions.forEach((opt) => opt.classList.remove('active'))
      this.classList.add('active')
      sortButton.textContent = this.textContent

      if (this.textContent === 'Сначала новые') {
        applySorting('newest')
      } else if (this.textContent === 'Сначала старые') {
        applySorting('oldest')
      }

      sort.classList.remove('active')
    })
  })
}

document.addEventListener('DOMContentLoaded', initSorting)
