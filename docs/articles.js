/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 8040:
/***/ (() => {

document.addEventListener('DOMContentLoaded', function () {
  var selectedTags = [];
  var desktopFilterContainer = document.querySelector('.C_Tags.desktop');
  var mobileFilterContainer = document.querySelector('.C_Tags.mobile');
  var resetButtonDesktop = document.getElementById('resetFilterButton');
  var resetButtonMobile = document.getElementById('resetFilterButtonMobile');

  function toggleTag(tag) {
    var desktopTags = document.querySelectorAll('.C_Tags.desktop .A_Tag');
    var mobileTags = document.querySelectorAll('.C_Tags.mobile .A_Tag');
    desktopTags.forEach(function (t) {
      if (t.textContent === tag) {
        t.classList.toggle('selected');
      }
    });
    mobileTags.forEach(function (t) {
      if (t.textContent === tag) {
        t.classList.toggle('selected');
      }
    });

    if (selectedTags.includes(tag)) {
      selectedTags = selectedTags.filter(function (t) {
        return t !== tag;
      });
    } else {
      selectedTags.push(tag);
    }

    filterArticlesByTags(selectedTags);
  }

  function filterArticlesByTags(tags) {
    var articles = document.querySelectorAll('.M_ArticleCard');
    articles.forEach(function (article) {
      var articleTags = article.querySelectorAll('.A_Tag');
      var hasAllTags = tags.every(function (tag) {
        return Array.from(articleTags).some(function (t) {
          return t.textContent === tag;
        });
      });

      if (hasAllTags || tags.length === 0) {
        article.style.display = 'flex';
      } else {
        article.style.display = 'none';
      }

      articleTags.forEach(function (t) {
        if (tags.includes(t.textContent)) {
          t.classList.add('selected');
        } else {
          t.classList.remove('selected');
        }
      });
    });
  }

  function resetFilter() {
    var articles = document.querySelectorAll('.M_ArticleCard');
    var desktopTags = document.querySelectorAll('.C_Tags.desktop .A_Tag');
    var mobileTags = document.querySelectorAll('.C_Tags.mobile .A_Tag');
    var articleTags = document.querySelectorAll('.M_ArticleCard .A_Tag');
    articles.forEach(function (article) {
      article.style.display = 'flex';
    });
    desktopTags.forEach(function (t) {
      t.classList.remove('selected');
    });
    mobileTags.forEach(function (t) {
      t.classList.remove('selected');
    });
    articleTags.forEach(function (t) {
      t.classList.remove('selected');
    });
    selectedTags = [];
  }

  desktopFilterContainer.addEventListener('click', function (event) {
    var tagElement = event.target;

    if (tagElement.classList.contains('A_Tag')) {
      var tag = tagElement.getAttribute('data-tag');
      toggleTag(tag);
    }
  });
  mobileFilterContainer.addEventListener('click', function (event) {
    var tagElement = event.target;

    if (tagElement.classList.contains('A_Tag')) {
      var tag = tagElement.getAttribute('data-tag');
      toggleTag(tag);
    }
  });
  resetButtonDesktop.addEventListener('click', function () {
    resetFilter();
  });
  resetButtonMobile.addEventListener('click', function () {
    resetFilter();
  });
});

/***/ }),

/***/ 5027:
/***/ (() => {

var filtersButton = document.querySelector('.A_FiltersButton');
var filters = document.querySelector('.O_Filters');
var closeButton = filters.querySelector('.A_CloseButton');
var bgblur = document.querySelector('.Q_BackgroundBlur');
var mediaphone = window.matchMedia('(min-width: 320px) and (max-width: 730px)');

function filtersInit() {
  filtersButton.addEventListener('click', filtersOpen);
  closeButton.addEventListener('click', filtersClose);
}

function filtersOpen() {
  document.body.classList.add('overflow-hidden');
  filters.classList.add('active'), bgblur.classList.add('active');
}

function filtersClose() {
  document.body.classList.remove('overflow-hidden');
  filters.classList.remove('active'), bgblur.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', function () {
  if (mediaphone.matches) {
    filtersInit();
  }
});

/***/ }),

/***/ 6395:
/***/ (() => {

var sortButton = document.querySelector('.A_SortButton');
var sort = document.querySelector('.M_Sort');

function sortInit() {
  sortButton.addEventListener('click', function (e) {
    sort.classList.toggle('active');
  });
}

document.addEventListener('DOMContentLoaded', sortInit());

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
/* harmony import */ var _filters_open_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5027);
/* harmony import */ var _filters_open_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_filters_open_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _filter_articles_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8040);
/* harmony import */ var _filter_articles_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_filter_articles_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _sort_open_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6395);
/* harmony import */ var _sort_open_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_sort_open_js__WEBPACK_IMPORTED_MODULE_2__);



})();

/******/ })()
;