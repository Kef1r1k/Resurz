/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 8229:
/***/ (() => {

function filterCards(query, cardSelector) {
  var titleSelector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'h5';
  var normalizedQuery = query.trim().toLowerCase();
  var cards = document.querySelectorAll(cardSelector);
  cards.forEach(function (card) {
    var titleElement = card.querySelector(titleSelector);
    var titleText = titleElement ? titleElement.textContent.toLowerCase() : '';

    if (normalizedQuery === '' || titleText.includes(normalizedQuery)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

function initSearch(inputSelector, cardSelector) {
  var titleSelector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'h5';
  var inputs = document.querySelectorAll(inputSelector);
  inputs.forEach(function (input) {
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        filterCards(e.target.value, cardSelector, titleSelector);
      }
    });
    input.addEventListener('input', function (e) {
      if (!e.target.value.trim()) {
        filterCards('', cardSelector, titleSelector);
      }
    });
  });
}

if (document.body.classList.contains('all_articles')) {
  initSearch('.M_SearchBar.articles input', '.C_Articles .M_ArticleCard', 'h5');
}

if (document.body.classList.contains('all_interviews')) {
  initSearch('.M_SearchBar.articles input', '.C_Interviews .M_InterviewCard', 'h4');
}

/***/ }),

/***/ 8040:
/***/ (() => {

document.addEventListener('DOMContentLoaded', function () {
  function initTagFilter(_ref) {
    var tagContainerDesktop = _ref.tagContainerDesktop,
        tagContainerMobile = _ref.tagContainerMobile,
        cardSelector = _ref.cardSelector,
        tagInCardSelector = _ref.tagInCardSelector;
    var selectedTags = [];
    var desktopFilterContainer = document.querySelector(tagContainerDesktop);
    var mobileFilterContainer = document.querySelector(tagContainerMobile);
    var resetButtonDesktop = document.getElementById('resetFilterButton');
    var resetButtonMobile = document.getElementById('resetFilterButtonMobile');

    function toggleTag(tag) {
      var desktopTags = document.querySelectorAll("".concat(tagContainerDesktop, " .A_Tag"));
      var mobileTags = document.querySelectorAll("".concat(tagContainerMobile, " .A_Tag"));
      [desktopTags, mobileTags].forEach(function (tagsList) {
        tagsList.forEach(function (t) {
          if (t.textContent.trim() === tag.trim()) {
            t.classList.toggle('selected');
          }
        });
      });

      if (selectedTags.includes(tag)) {
        selectedTags = selectedTags.filter(function (t) {
          return t !== tag;
        });
      } else {
        selectedTags.push(tag);
      }

      filterByTags(selectedTags);
    }

    function filterByTags(tags) {
      var cards = document.querySelectorAll(cardSelector);
      cards.forEach(function (card) {
        var cardTags = card.querySelectorAll(tagInCardSelector);
        var cardTagsText = Array.from(cardTags).map(function (t) {
          return t.textContent.trim();
        });
        var hasAllTags = tags.every(function (tag) {
          return cardTagsText.includes(tag);
        });

        if (hasAllTags || tags.length === 0) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }

        cardTags.forEach(function (t) {
          if (tags.includes(t.textContent.trim())) {
            t.classList.add('selected');
          } else {
            t.classList.remove('selected');
          }
        });
      });
    }

    function resetFilter() {
      var cards = document.querySelectorAll(cardSelector);
      var desktopTags = document.querySelectorAll("".concat(tagContainerDesktop, " .A_Tag"));
      var mobileTags = document.querySelectorAll("".concat(tagContainerMobile, " .A_Tag"));
      var allCardTags = document.querySelectorAll("".concat(cardSelector, " ").concat(tagInCardSelector));
      cards.forEach(function (card) {
        card.style.display = 'flex';
      });
      [desktopTags, mobileTags, allCardTags].forEach(function (list) {
        list.forEach(function (t) {
          return t.classList.remove('selected');
        });
      });
      selectedTags = [];
    }

    if (desktopFilterContainer && mobileFilterContainer) {
      desktopFilterContainer.addEventListener('click', function (e) {
        var tagEl = e.target.closest('.A_Tag');

        if (tagEl) {
          var tag = tagEl.getAttribute('data-tag');
          toggleTag(tag);
        }
      });
      mobileFilterContainer.addEventListener('click', function (e) {
        var tagEl = e.target.closest('.A_Tag');

        if (tagEl) {
          var tag = tagEl.getAttribute('data-tag');
          toggleTag(tag);
        }
      });
    }

    if (resetButtonDesktop) {
      resetButtonDesktop.addEventListener('click', resetFilter);
    }

    if (resetButtonMobile) {
      resetButtonMobile.addEventListener('click', resetFilter);
    }
  } // ==== Инициализация под конкретные страницы ====


  if (document.body.classList.contains('all_articles')) {
    initTagFilter({
      tagContainerDesktop: '.C_Tags.desktop',
      tagContainerMobile: '.C_Tags.mobile',
      cardSelector: '.M_ArticleCard',
      tagInCardSelector: '.A_Tag'
    });
  }

  if (document.body.classList.contains('all_interviews')) {
    initTagFilter({
      tagContainerDesktop: '.C_Tags.desktop',
      tagContainerMobile: '.C_Tags.mobile',
      cardSelector: '.M_InterviewCard',
      tagInCardSelector: '.A_Tag'
    });
  }
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

function initSorting() {
  var isArticlesPage = document.body.classList.contains('all_articles');
  var isInterviewsPage = document.body.classList.contains('all_interviews');
  if (!isArticlesPage && !isInterviewsPage) return;
  var desktopSortButton = document.querySelector('.A_SortButton');
  var desktopSort = document.querySelector('.M_Sort');
  var desktopSortOptions = desktopSort === null || desktopSort === void 0 ? void 0 : desktopSort.querySelectorAll('.A_SortOption');
  var mobileSortOptions = document.querySelectorAll('.O_Filters .A_SortOption');
  var container = isArticlesPage ? document.querySelector('.C_Articles') : document.querySelector('.C_Interviews');
  var cardSelector = isArticlesPage ? '.M_ArticleCard' : '.M_InterviewCard';

  function applySorting(order) {
    var cards = Array.from(container.querySelectorAll(cardSelector));
    cards.sort(function (a, b) {
      var dateA = new Date(a.dataset.date);
      var dateB = new Date(b.dataset.date);
      return order === 'newest' ? dateB - dateA : dateA - dateB;
    });
    cards.forEach(function (card) {
      return container.appendChild(card);
    });
  } // Обработчики для десктопной версии


  if (desktopSortButton && desktopSort) {
    desktopSortButton.addEventListener('click', function (e) {
      desktopSort.classList.toggle('active');
    });
    desktopSortOptions === null || desktopSortOptions === void 0 ? void 0 : desktopSortOptions.forEach(function (option) {
      option.addEventListener('click', function (e) {
        desktopSortOptions.forEach(function (opt) {
          return opt.classList.remove('active');
        });
        this.classList.add('active');
        desktopSortButton.textContent = this.textContent;

        if (this.textContent === 'Сначала новые') {
          applySorting('newest');
        } else if (this.textContent === 'Сначала старые') {
          applySorting('oldest');
        }

        desktopSort.classList.remove('active');
      });
    });
  } // Обработчики для мобильной версии


  mobileSortOptions === null || mobileSortOptions === void 0 ? void 0 : mobileSortOptions.forEach(function (option) {
    option.addEventListener('click', function (e) {
      var _this = this;

      mobileSortOptions.forEach(function (opt) {
        return opt.classList.remove('active');
      });
      this.classList.add('active');

      if (desktopSortButton) {
        desktopSortButton.textContent = this.textContent;
      }

      if (desktopSortOptions) {
        desktopSortOptions.forEach(function (opt) {
          return opt.classList.remove('active');
        });
        var correspondingOption = Array.from(desktopSortOptions).find(function (opt) {
          return opt.textContent === _this.textContent;
        });

        if (correspondingOption) {
          correspondingOption.classList.add('active');
        }
      }

      if (this.textContent === 'Сначала новые') {
        applySorting('newest');
      } else if (this.textContent === 'Сначала старые') {
        applySorting('oldest');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', initSorting);

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
/* harmony import */ var _article_search_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8229);
/* harmony import */ var _article_search_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_article_search_js__WEBPACK_IMPORTED_MODULE_3__);




})();

/******/ })()
;