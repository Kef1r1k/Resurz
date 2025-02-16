/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 401:
/***/ (() => {

var hints = document.getElementsByClassName('M_ArticleContents');

function hintInit() {
  for (var i = 0; i < hints.length; i++) {
    var hint = hints[i];
    hintOpen(hint);
  }
}

function hintOpen(hint) {
  var hintButton = hint.querySelector('.A_ToggleButton');
  var hintText = document.querySelector('.A_TextContents.hint');
  var articleTexts = document.querySelectorAll('.A_TextContents.full');
  var articleQuotes = document.querySelectorAll('.M_ArticleQuote');
  hintButton.addEventListener('click', function (e) {
    hintButton.classList.toggle('active');

    if (hintButton.classList.contains('active')) {
      hintText.classList.remove('hidden');

      for (var i = 0; i < articleTexts.length; i++) {
        var articleText = articleTexts[i];
        articleText.classList.add('hidden');
      }

      for (var _i = 0; _i < articleQuotes.length; _i++) {
        var articleQuote = articleQuotes[_i];
        articleQuote.classList.add('hidden');
      }
    } else {
      for (var _i2 = 0; _i2 < articleTexts.length; _i2++) {
        var _articleText = articleTexts[_i2];

        _articleText.classList.remove('hidden');
      }

      for (var _i3 = 0; _i3 < articleQuotes.length; _i3++) {
        var _articleQuote = articleQuotes[_i3];

        _articleQuote.classList.remove('hidden');
      }

      hintText.classList.add('hidden');
    }
  });
}

document.addEventListener('DOMContentLoaded', hintInit());

/***/ }),

/***/ 574:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var questions = __webpack_require__(972);

var startButton = document.getElementById('startTest');
var test = document.querySelector('.O_TestPopUp');
var closeButton = test.querySelector('.A_CloseButton');
var testQuestion = document.getElementById('question');
var progress = document.getElementById('progress');
var answersContainer = document.querySelector('.C_Answers');
var explanationContainer = document.querySelector('.A_QuestionExplained');
var explanationText = document.getElementById('explanation');
var testButton = document.getElementById('test-button');
var currentQuestionIndex = 0;
var selectedAnswer = null;
var currentTest = [];
var isAnswered = false;

function testInit() {
  startButton.addEventListener('click', testOpen);
  closeButton.addEventListener('click', popupClose);
}

function testOpen() {
  var _questions$find;

  test.classList.add('active');
  var articleId = startButton.getAttribute('data-article-id');
  currentTest = ((_questions$find = questions.find(function (q) {
    return q.articleId === articleId;
  })) === null || _questions$find === void 0 ? void 0 : _questions$find.questions) || [];
  currentTest.length ? loadQuestion() : alert('Тест для этой статьи не найден.');
}

function popupClose() {
  test.classList.remove('active');
}

function loadQuestion() {
  var _currentTest$currentQ = currentTest[currentQuestionIndex],
      question = _currentTest$currentQ.question,
      answers = _currentTest$currentQ.answers,
      explanation = _currentTest$currentQ.explanation;
  testQuestion.textContent = question;
  progress.textContent = "".concat(currentQuestionIndex + 1, "/").concat(currentTest.length);
  answersContainer.innerHTML = answers.map(function (answer, index) {
    return "\n    <div class=\"A_AnswerBullet\" data-answer-index=\"".concat(index, "\">").concat(answer, "</div>\n  ");
  }).join('');
  explanationText.textContent = '';
  explanationContainer.classList.add('hidden');
  testButton.disabled = true;
  testButton.textContent = 'Ответить';
  testButton.classList.remove('correct', 'wrong');
  isAnswered = false;
}

answersContainer.addEventListener('click', function (event) {
  if (isAnswered) return;
  var answerElement = event.target.closest('.A_AnswerBullet');

  if (answerElement) {
    answersContainer.querySelectorAll('.A_AnswerBullet').forEach(function (el) {
      return el.classList.remove('selected');
    });
    answerElement.classList.add('selected');
    selectedAnswer = +answerElement.getAttribute('data-answer-index');
    testButton.disabled = false;
  }
});
testButton.addEventListener('click', function () {
  if (isAnswered) return;
  var _currentTest$currentQ2 = currentTest[currentQuestionIndex],
      correctAnswer = _currentTest$currentQ2.correctAnswer,
      explanation = _currentTest$currentQ2.explanation;
  var isCorrect = selectedAnswer === correctAnswer;
  answersContainer.querySelectorAll('.A_AnswerBullet').forEach(function (el, index) {
    el.classList.toggle('correct', index === correctAnswer);
    el.classList.toggle('wrong', index === selectedAnswer && !isCorrect);
  });
  explanationText.textContent = explanation;
  explanationContainer.classList.remove('hidden');
  isAnswered = true;

  if (currentQuestionIndex < currentTest.length - 1) {
    testButton.textContent = 'Следующий вопрос';
    testButton.addEventListener('click', function () {
      currentQuestionIndex++;
      loadQuestion();
    }, {
      once: true
    });
  } else {
    testButton.textContent = 'Завершить тест';
    testButton.addEventListener('click', popupClose, {
      once: true
    });
  }
});
document.addEventListener('DOMContentLoaded', testInit);

/***/ }),

/***/ 972:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"articleId":"article1","questions":[{"question":"Здесь будет написан первый вопрос","answers":["Первый вариант ответа","Второй вариант ответа","Третий вариант ответа"],"correctAnswer":0,"explanation":"Правильный ответ — первый, потому что..."},{"question":"Здесь будет написан второй вопрос","answers":["Первый вариант ответа","Второй вариант ответа","Третий вариант ответа"],"correctAnswer":2,"explanation":"Правильный ответ — третий, потому что..."}]},{"articleId":"article2","questions":[{"question":"Здесь будет написан первый вопрос","answers":["Первый вариант ответа","Второй вариант ответа","Третий вариант ответа"],"correctAnswer":0,"explanation":"Правильный ответ — первый, потому что..."}]}]');

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
/* harmony import */ var _hint_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(401);
/* harmony import */ var _hint_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hint_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _test_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(574);
/* harmony import */ var _test_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_test_js__WEBPACK_IMPORTED_MODULE_1__);


})();

/******/ })()
;