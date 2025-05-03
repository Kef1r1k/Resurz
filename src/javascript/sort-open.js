function initSorting() {
  const isArticlesPage = document.body.classList.contains('all_articles')
  const isInterviewsPage = document.body.classList.contains('all_interviews')

  if (!isArticlesPage && !isInterviewsPage) return

  const desktopSortButton = document.querySelector('.A_SortButton')
  const desktopSort = document.querySelector('.M_Sort')
  const desktopSortOptions = desktopSort?.querySelectorAll('.A_SortOption')
  const mobileSortOptions = document.querySelectorAll(
    '.O_Filters .A_SortOption'
  )

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

  // Обработчики для десктопной версии
  if (desktopSortButton && desktopSort) {
    desktopSortButton.addEventListener('click', (e) => {
      desktopSort.classList.toggle('active')
    })

    desktopSortOptions?.forEach((option) => {
      option.addEventListener('click', function (e) {
        desktopSortOptions.forEach((opt) => opt.classList.remove('active'))
        this.classList.add('active')
        desktopSortButton.textContent = this.textContent

        if (this.textContent === 'Сначала новые') {
          applySorting('newest')
        } else if (this.textContent === 'Сначала старые') {
          applySorting('oldest')
        }

        desktopSort.classList.remove('active')
      })
    })
  }

  // Обработчики для мобильной версии
  mobileSortOptions?.forEach((option) => {
    option.addEventListener('click', function (e) {
      mobileSortOptions.forEach((opt) => opt.classList.remove('active'))
      this.classList.add('active')
      if (desktopSortButton) {
        desktopSortButton.textContent = this.textContent
      }
      if (desktopSortOptions) {
        desktopSortOptions.forEach((opt) => opt.classList.remove('active'))
        const correspondingOption = Array.from(desktopSortOptions).find(
          (opt) => opt.textContent === this.textContent
        )
        if (correspondingOption) {
          correspondingOption.classList.add('active')
        }
      }

      if (this.textContent === 'Сначала новые') {
        applySorting('newest')
      } else if (this.textContent === 'Сначала старые') {
        applySorting('oldest')
      }
    })
  })
}

document.addEventListener('DOMContentLoaded', initSorting)
