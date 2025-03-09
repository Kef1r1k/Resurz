document.addEventListener('DOMContentLoaded', () => {
  const shareButton = document.getElementById('share')
  const telegramButton = document.getElementById('tg')
  const vkButton = document.getElementById('vk')
  const whatsappButton = document.getElementById('whatsapp')

  const currentUrl = window.location.href

  shareButton.addEventListener('click', () => {
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        alert('Ссылка скопирована в буфер обмена!')
      })
      .catch((err) => {
        console.error('Ошибка при копировании ссылки: ', err)
      })
  })

  telegramButton.addEventListener('click', () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
      currentUrl
    )}`
    window.open(telegramUrl, '_blank')
  })

  vkButton.addEventListener('click', () => {
    const vkUrl = `https://vk.com/share.php?url=${encodeURIComponent(
      currentUrl
    )}`
    window.open(vkUrl, '_blank')
  })

  whatsappButton.addEventListener('click', () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(currentUrl)}`
    window.open(whatsappUrl, '_blank')
  })
})
