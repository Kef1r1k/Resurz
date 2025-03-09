import './index.css'
import './javascript/header.js'
import './javascript/hide-header.js'
import './javascript/search-open.js'

const video = document.getElementById('bg-video')

window.addEventListener('scroll', () => {
  video.pause()
})

window.addEventListener('scrollend', () => {
  video.play()
})
