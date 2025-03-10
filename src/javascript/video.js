const video = document.getElementById('bg-video')
const mediaphone = window.matchMedia(
  '(min-width: 320px) and (max-width: 730px)'
)

if (mediaphone.matches) {
  video.classList.add('none')
} else {
  window.addEventListener('scroll', () => {
    video.pause()
  })

  window.addEventListener('scrollend', () => {
    video.play()
  })
}
