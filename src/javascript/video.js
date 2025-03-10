const video = document.getElementById('bg-video')

window.addEventListener('scroll', () => {
  video.pause()
})

window.addEventListener('scrollend', () => {
  video.play()
})
