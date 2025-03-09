import './index.css'
import './javascript/header.js'
import './javascript/hide-header.js'
import './javascript/search-open.js'

const video = document.getElementById('bg-video')
const mediaphone = window.matchMedia(
  '(min-width: 320px) and (max-width: 730px)'
)

if (!mediaphone.matches) {
  window.addEventListener('scroll', () => {
    video.pause()
  })

  window.addEventListener('scrollend', () => {
    video.play()
  })
}
