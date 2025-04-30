const hints = document.getElementsByClassName('M_ArticleContents')

function hintInit() {
  for (let i = 0; i < hints.length; i++) {
    const hint = hints[i]
    hintOpen(hint)
  }
}

function hintOpen(hint) {
  const hintButton = hint.querySelector('.A_ToggleButton')
  const hintText = document.querySelector('.A_TextContents.hint')
  const articleTexts = document.querySelectorAll('.A_TextContents.full')
  const articleQuotes = document.querySelectorAll('.M_ArticleQuote')
  const articleImages = document.querySelectorAll('.A_PostCover.full')

  hintButton.addEventListener('click', (e) => {
    hintButton.classList.toggle('active')

    if (hintButton.classList.contains('active')) {
      hintText.classList.remove('hidden')
      for (let i = 0; i < articleTexts.length; i++) {
        const articleText = articleTexts[i]
        articleText.classList.add('hidden')
      }
      for (let i = 0; i < articleQuotes.length; i++) {
        const articleQuote = articleQuotes[i]
        articleQuote.classList.add('hidden')
      }
      for (let i = 0; i < articleImages.length; i++) {
        const articleImage = articleImages[i]
        articleImage.classList.add('hidden')
      }
    } else {
      for (let i = 0; i < articleTexts.length; i++) {
        const articleText = articleTexts[i]
        articleText.classList.remove('hidden')
      }
      for (let i = 0; i < articleQuotes.length; i++) {
        const articleQuote = articleQuotes[i]
        articleQuote.classList.remove('hidden')
      }
      for (let i = 0; i < articleImages.length; i++) {
        const articleImage = articleImages[i]
        articleImage.classList.remove('hidden')
      }
      hintText.classList.add('hidden')
    }
  })
}

document.addEventListener('DOMContentLoaded', hintInit())
