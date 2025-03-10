/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
var video = document.getElementById('bg-video');
var mediaphone = window.matchMedia('(min-width: 320px) and (max-width: 730px)');

if (mediaphone.matches) {
  video.classList.add('none');
} else {
  window.addEventListener('scroll', function () {
    video.pause();
  });
  window.addEventListener('scrollend', function () {
    video.play();
  });
}
/******/ })()
;