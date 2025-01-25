const menu = document.querySelector('.O_Header')
let prevScrollpos = window.pageYOffset
let navbarHeight = menu.offsetHeight

window.onscroll = function () {
  let currentScrollPos = window.pageYOffset
  if (prevScrollpos > currentScrollPos) {
    menu.style.top = '24px'
  } else if (currentScrollPos < 100) {
    menu.style.top = '24px'
  } else {
    menu.style.top = '-' + navbarHeight + 'px'
  }
  prevScrollpos = currentScrollPos
}
