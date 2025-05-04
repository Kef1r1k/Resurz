document.addEventListener('DOMContentLoaded', () => {
  function initTagFilter({
    tagContainerDesktop,
    tagContainerMobile,
    cardSelector,
    tagInCardSelector
  }) {
    let selectedTags = []

    const desktopFilterContainer = document.querySelector(tagContainerDesktop)
    const mobileFilterContainer = document.querySelector(tagContainerMobile)
    const resetButtonDesktop = document.getElementById('resetFilterButton')
    const resetButtonMobile = document.getElementById('resetFilterButtonMobile')

    function toggleTag(tag) {
      const desktopTags = document.querySelectorAll(
        `${tagContainerDesktop} .A_Tag`
      )
      const mobileTags = document.querySelectorAll(
        `${tagContainerMobile} .A_Tag`
      )

      ;[desktopTags, mobileTags].forEach((tagsList) => {
        tagsList.forEach((t) => {
          if (t.textContent.trim() === tag.trim()) {
            t.classList.toggle('selected')
          }
        })
      })

      if (selectedTags.includes(tag)) {
        selectedTags = selectedTags.filter((t) => t !== tag)
      } else {
        selectedTags.push(tag)
      }

      filterByTags(selectedTags)
    }

    function filterByTags(tags) {
      const cards = document.querySelectorAll(cardSelector)

      cards.forEach((card) => {
        const cardTags = card.querySelectorAll(tagInCardSelector)
        const cardTagsText = Array.from(cardTags).map((t) =>
          t.textContent.trim()
        )

        const hasAllTags = tags.every((tag) => cardTagsText.includes(tag))

        if (hasAllTags || tags.length === 0) {
          card.style.display = 'flex'
        } else {
          card.style.display = 'none'
        }

        cardTags.forEach((t) => {
          if (tags.includes(t.textContent.trim())) {
            t.classList.add('selected')
          } else {
            t.classList.remove('selected')
          }
        })
      })
    }

    function resetFilter() {
      const cards = document.querySelectorAll(cardSelector)
      const desktopTags = document.querySelectorAll(
        `${tagContainerDesktop} .A_Tag`
      )
      const mobileTags = document.querySelectorAll(
        `${tagContainerMobile} .A_Tag`
      )
      const allCardTags = document.querySelectorAll(
        `${cardSelector} ${tagInCardSelector}`
      )

      cards.forEach((card) => {
        card.style.display = 'flex'
      })
      ;[desktopTags, mobileTags, allCardTags].forEach((list) => {
        list.forEach((t) => t.classList.remove('selected'))
      })

      selectedTags = []
    }

    if (desktopFilterContainer && mobileFilterContainer) {
      desktopFilterContainer.addEventListener('click', (e) => {
        const tagEl = e.target.closest('.A_Tag')
        if (tagEl) {
          const tag = tagEl.getAttribute('data-tag')
          toggleTag(tag)
        }
      })

      mobileFilterContainer.addEventListener('click', (e) => {
        const tagEl = e.target.closest('.A_Tag')
        if (tagEl) {
          const tag = tagEl.getAttribute('data-tag')
          toggleTag(tag)
        }
      })
    }

    if (resetButtonDesktop) {
      resetButtonDesktop.addEventListener('click', resetFilter)
    }

    if (resetButtonMobile) {
      resetButtonMobile.addEventListener('click', resetFilter)
    }
  }

  // ==== Инициализация под конкретные страницы ====

  if (document.body.classList.contains('all_articles')) {
    initTagFilter({
      tagContainerDesktop: '.C_Tags.desktop',
      tagContainerMobile: '.C_Tags.mobile',
      cardSelector: '.M_ArticleCard',
      tagInCardSelector: '.A_Tag'
    })
  }

  if (document.body.classList.contains('all_interviews')) {
    initTagFilter({
      tagContainerDesktop: '.C_Tags.desktop',
      tagContainerMobile: '.C_Tags.mobile',
      cardSelector: '.M_InterviewCard',
      tagInCardSelector: '.A_Tag'
    })
  }
})
