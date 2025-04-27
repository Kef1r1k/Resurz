/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 6401:
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

/***/ 847:
/***/ (() => {

document.addEventListener('DOMContentLoaded', function () {
  var shareButton = document.getElementById('share');
  var telegramButton = document.getElementById('tg');
  var vkButton = document.getElementById('vk');
  var whatsappButton = document.getElementById('whatsapp');
  var currentUrl = window.location.href;
  shareButton.addEventListener('click', function () {
    navigator.clipboard.writeText(currentUrl).then(function () {
      alert('Ссылка скопирована в буфер обмена!');
    })["catch"](function (err) {
      console.error('Ошибка при копировании ссылки: ', err);
    });
  });
  telegramButton.addEventListener('click', function () {
    var telegramUrl = "https://t.me/share/url?url=".concat(encodeURIComponent(currentUrl));
    window.open(telegramUrl, '_blank');
  });
  vkButton.addEventListener('click', function () {
    var vkUrl = "https://vk.com/share.php?url=".concat(encodeURIComponent(currentUrl));
    window.open(vkUrl, '_blank');
  });
  whatsappButton.addEventListener('click', function () {
    var whatsappUrl = "https://wa.me/?text=".concat(encodeURIComponent(currentUrl));
    window.open(whatsappUrl, '_blank');
  });
});

/***/ }),

/***/ 4574:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var questions = __webpack_require__(1972);

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

  document.body.classList.add('overflow-hidden');
  test.classList.add('active');
  var articleId = startButton.getAttribute('data-article-id');
  currentTest = ((_questions$find = questions.find(function (q) {
    return q.articleId === articleId;
  })) === null || _questions$find === void 0 ? void 0 : _questions$find.questions) || [];
  currentTest.length ? loadQuestion() : alert('Тест для этой статьи не найден.');
}

function popupClose() {
  document.body.classList.remove('overflow-hidden');
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

/***/ 1972:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"articleId":"article1","questions":[{"question":"Какие форматы файлов нужно подготовить для передачи логотипа заказчику?","answers":["Только PNG","Только PDF","Векторные (SVG, AI, EPS) и растровые (PNG, JPG)","Только черно-белую версию"],"correctAnswer":2,"explanation":"Векторные форматы нужны для масштабирования без потери качества, а растровые — для повседневного использования. Это обеспечивает универсальность логотипа."},{"question":"Что обязательно нужно проверить перед передачей логотипа, чтобы избежать проблем с Роспатентом?","answers":["Соответствие логотипа трендам","Уникальность логотипа и отсутствие официальной символики","Количество использованных цветов","Размер файлов"],"correctAnswer":1,"explanation":"Проверка уникальности и отсутствия официальной символики помогает избежать юридических проблем и отказов при регистрации товарного знака."},{"question":"Что должно быть включено в логобук?","answers":["Только цветовые палитры","Описание логотипа, цветовые палитры, минимальные размеры и примеры использования","Только примеры использования","Только описание логотипа"],"correctAnswer":1,"explanation":"Логобук помогает заказчику правильно использовать логотип в разных ситуациях, обеспечивая его корректное воспроизведение и применение."}]},{"articleId":"article2","questions":[{"question":"Что такое финансовая подушка для фрилансера?","answers":["Деньги на отпуск","Сумма, которая покроет расходы на 3-6 месяцев","Инвестиции в акции","Зарплата за месяц"],"correctAnswer":1,"explanation":"Финансовая подушка — это запас денег, который помогает фрилансеру пережить периоды без заказов или задержек оплаты."},{"question":"Сколько рекомендуется откладывать от каждого дохода?","answers":["5%","10-20%","50%","Не нужно откладывать"],"correctAnswer":1,"explanation":"Даже небольшие, но регулярные отчисления (10-20% от дохода) помогут постепенно сформировать подушку безопасности."},{"question":"Где лучше хранить финансовую подушку?","answers":["В наличных под подушкой","В криптовалюте","На основной карте","На накопительном счете"],"correctAnswer":3,"explanation":"Накопительный счет — это надежный и доступный способ хранения денег, который позволяет быстро получить доступ к средствам, если это понадобится."}]},{"articleId":"article3","questions":[{"question":"Как лучше всего отказать заказчику, если ты не можешь взяться за проект?","answers":["Игнорировать запрос","Вежливо, но твёрдо объяснить, что у тебя другие обязательства","Согласиться, но не выполнить работу","Начать проект, но сделать его плохо"],"correctAnswer":1,"explanation":"Вежливый, но твёрдый отказ помогает сохранить хорошие отношения с заказчиком и показывает, что ты ценишь своё время и труд."},{"question":"Что поможет избежать конфликтов с заказчиком?","answers":["Ничего не обсуждать заранее","Соглашаться на всё, что просит заказчик","Чётко прописать все условия работы в договоре","Не задавать уточняющих вопросов"],"correctAnswer":2,"explanation":"Чёткие условия помогают избежать недопонимания и споров, так как обе стороны знают, чего ожидать."},{"question":"Какой совет поможет защитить личные границы на фрилансе?","answers":["Быть на связи 24/7","Установить рабочие часы и сообщить о них заказчику","Никогда не говорить «нет»","Брать как можно больше проектов"],"correctAnswer":1,"explanation":"Установка рабочих часов помогает разделить работу и личную жизнь, что снижает риск выгорания и сохраняет баланс."}]},{"articleId":"article4","questions":[{"question":"Как правильно оценивать сроки выполнения проекта?","answers":["Брать минимальное время, которое кажется реальным","Умножать предполагаемый срок на 1,5","Говорить клиенту «сделаю быстро» и надеяться на лучшее"],"correctAnswer":1,"explanation":"Мозг склонен недооценивать время на работу. Запас в 1,5 раза компенсирует непредвиденные задержки."},{"question":"Что делать, если дедлайн уже под угрозой срыва?","answers":["Молчать и надеяться успеть в последний момент","Срочно взять ещё парочку проектов для мотивации","Честно предупредить клиента и предложить новый срок"],"correctAnswer":2,"explanation":"Клиенты ценят прозрачность. Лучше скорректировать сроки, чем сорвать их без предупреждения."},{"question":"Как эффективнее всего работать над сложной задачей?","answers":["Делать её в перерывах между сериалами и соцсетями","Выполнять в свои «часы пик» продуктивности","Откладывать до последнего, чтобы адреналин помог"],"correctAnswer":1,"explanation":"Сложные задачи требуют максимальной концентрации — их стоит делать в периоды высокой работоспособности."}]}]');

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
/* harmony import */ var _hint_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6401);
/* harmony import */ var _hint_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hint_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _social_buttons_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(847);
/* harmony import */ var _social_buttons_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_social_buttons_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _test_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4574);
/* harmony import */ var _test_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_test_js__WEBPACK_IMPORTED_MODULE_2__);



})();

/******/ })()
;