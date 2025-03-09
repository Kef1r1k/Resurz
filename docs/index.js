/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 2857:
/***/ (() => {

var menuButton = document.querySelector('.A_BurgerButton');
var closeButton = document.querySelector('.A_CloseButton');
var menu = document.querySelector('.O_MobileMenu');
var bgblur = document.querySelector('.Q_BackgroundBlur');
var mediaphone = window.matchMedia('(min-width: 320px) and (max-width: 730px)');

function menuInit() {
  menuButton.addEventListener('click', menuOpen);
  closeButton.addEventListener('click', menuClose);
}

function menuOpen() {
  menu.classList.add('active'), bgblur.classList.add('active');
}

function menuClose() {
  menu.classList.remove('active'), bgblur.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', function () {
  if (mediaphone.matches) {
    console.log('HII');
    menuInit();
  }
});

/***/ }),

/***/ 7480:
/***/ (() => {

var menu = document.querySelector('.O_Header');
var prevScrollpos = window.pageYOffset;
var navbarHeight = menu.offsetHeight;

window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;

  if (prevScrollpos > currentScrollPos) {
    menu.style.top = '24px';
  } else if (currentScrollPos < 100) {
    menu.style.top = '24px';
  } else {
    menu.style.top = '-' + navbarHeight + 'px';
  }

  prevScrollpos = currentScrollPos;
};

/***/ }),

/***/ 8670:
/***/ (() => {

var search = document.querySelector('.O_Header .M_SearchBar');

function searchInit() {
  search.addEventListener('click', function (e) {
    search.classList.toggle('active');
  });
}

document.addEventListener('DOMContentLoaded', searchInit());

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/* harmony import */ var _javascript_header_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2857);
/* harmony import */ var _javascript_header_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_javascript_header_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _javascript_hide_header_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7480);
/* harmony import */ var _javascript_hide_header_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_javascript_hide_header_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _javascript_search_open_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8670);
/* harmony import */ var _javascript_search_open_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_javascript_search_open_js__WEBPACK_IMPORTED_MODULE_2__);




var video = document.getElementById('bg-video');
var mediaphone = window.matchMedia('(min-width: 320px) and (max-width: 730px)');

if (!mediaphone.matches) {
  window.addEventListener('scroll', function () {
    video.pause();
  });
  window.addEventListener('scrollend', function () {
    video.play();
  });
}
})();

/******/ })()
;