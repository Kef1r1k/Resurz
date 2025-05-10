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
  var articleImages = document.querySelectorAll('.A_PostCover.full');
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

      for (var _i2 = 0; _i2 < articleImages.length; _i2++) {
        var articleImage = articleImages[_i2];
        articleImage.classList.add('hidden');
      }
    } else {
      for (var _i3 = 0; _i3 < articleTexts.length; _i3++) {
        var _articleText = articleTexts[_i3];

        _articleText.classList.remove('hidden');
      }

      for (var _i4 = 0; _i4 < articleQuotes.length; _i4++) {
        var _articleQuote = articleQuotes[_i4];

        _articleQuote.classList.remove('hidden');
      }

      for (var _i5 = 0; _i5 < articleImages.length; _i5++) {
        var _articleImage = articleImages[_i5];

        _articleImage.classList.remove('hidden');
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
module.exports = JSON.parse('[{"articleId":"article1","questions":[{"question":"Какие форматы файлов нужно подготовить для передачи логотипа заказчику?","answers":["Только PNG","Только PDF","Векторные (SVG, AI, EPS) и растровые (PNG, JPG)","Только черно-белую версию"],"correctAnswer":2,"explanation":"Векторные форматы нужны для масштабирования без потери качества, а растровые — для повседневного использования. Это обеспечивает универсальность логотипа."},{"question":"Что обязательно нужно проверить перед передачей логотипа, чтобы избежать проблем с Роспатентом?","answers":["Соответствие логотипа трендам","Уникальность логотипа и отсутствие официальной символики","Количество использованных цветов","Размер файлов"],"correctAnswer":1,"explanation":"Проверка уникальности и отсутствия официальной символики помогает избежать юридических проблем и отказов при регистрации товарного знака."},{"question":"Что должно быть включено в логобук?","answers":["Только цветовые палитры","Описание логотипа, цветовые палитры, минимальные размеры и примеры использования","Только примеры использования","Только описание логотипа"],"correctAnswer":1,"explanation":"Логобук помогает заказчику правильно использовать логотип в разных ситуациях, обеспечивая его корректное воспроизведение и применение."}]},{"articleId":"article2","questions":[{"question":"Что такое финансовая подушка для фрилансера?","answers":["Деньги на отпуск","Сумма, которая покроет расходы на 3-6 месяцев","Инвестиции в акции","Зарплата за месяц"],"correctAnswer":1,"explanation":"Финансовая подушка — это запас денег, который помогает фрилансеру пережить периоды без заказов или задержек оплаты."},{"question":"Сколько рекомендуется откладывать от каждого дохода?","answers":["5%","10-20%","50%","Не нужно откладывать"],"correctAnswer":1,"explanation":"Даже небольшие, но регулярные отчисления (10-20% от дохода) помогут постепенно сформировать подушку безопасности."},{"question":"Где лучше хранить финансовую подушку?","answers":["В наличных под подушкой","В криптовалюте","На основной карте","На накопительном счете"],"correctAnswer":3,"explanation":"Накопительный счет — это надежный и доступный способ хранения денег, который позволяет быстро получить доступ к средствам, если это понадобится."}]},{"articleId":"article3","questions":[{"question":"Как лучше всего отказать заказчику, если ты не можешь взяться за проект?","answers":["Игнорировать запрос","Вежливо, но твёрдо объяснить, что у тебя другие обязательства","Согласиться, но не выполнить работу","Начать проект, но сделать его плохо"],"correctAnswer":1,"explanation":"Вежливый, но твёрдый отказ помогает сохранить хорошие отношения с заказчиком и показывает, что ты ценишь своё время и труд."},{"question":"Что поможет избежать конфликтов с заказчиком?","answers":["Ничего не обсуждать заранее","Соглашаться на всё, что просит заказчик","Чётко прописать все условия работы в договоре","Не задавать уточняющих вопросов"],"correctAnswer":2,"explanation":"Чёткие условия помогают избежать недопонимания и споров, так как обе стороны знают, чего ожидать."},{"question":"Какой совет поможет защитить личные границы на фрилансе?","answers":["Быть на связи 24/7","Установить рабочие часы и сообщить о них заказчику","Никогда не говорить «нет»","Брать как можно больше проектов"],"correctAnswer":1,"explanation":"Установка рабочих часов помогает разделить работу и личную жизнь, что снижает риск выгорания и сохраняет баланс."}]},{"articleId":"article4","questions":[{"question":"Как правильно оценивать сроки выполнения проекта?","answers":["Брать минимальное время, которое кажется реальным","Умножать предполагаемый срок на 1,5","Говорить клиенту «сделаю быстро» и надеяться на лучшее"],"correctAnswer":1,"explanation":"Мозг склонен недооценивать время на работу. Запас в 1,5 раза компенсирует непредвиденные задержки."},{"question":"Что делать, если дедлайн уже под угрозой срыва?","answers":["Молчать и надеяться успеть в последний момент","Срочно взять ещё парочку проектов для мотивации","Честно предупредить клиента и предложить новый срок"],"correctAnswer":2,"explanation":"Клиенты ценят прозрачность. Лучше скорректировать сроки, чем сорвать их без предупреждения."},{"question":"Как эффективнее всего работать над сложной задачей?","answers":["Делать её в перерывах между сериалами и соцсетями","Выполнять в свои «часы пик» продуктивности","Откладывать до последнего, чтобы адреналин помог"],"correctAnswer":1,"explanation":"Сложные задачи требуют максимальной концентрации — их стоит делать в периоды высокой работоспособности."}]},{"articleId":"article5","questions":[{"question":"«Сделайте что-то креативное, но я не знаю, как это должно выглядеть». Что делать?","answers":["Сразу начать работу, чтобы сэкономить время","Сказать: «Это ваша задача — объяснить»","Предложить подобрать референсы и задать уточняющие вопросы","Сделать 10 вариантов на выбор"],"correctAnswer":2,"explanation":"Клиенту нужно помочь сформулировать желания — так ты избежишь бесконечных правок."},{"question":"Клиент просит 5-ю правку, хотя в договоре было 3. Как реагировать?","answers":["Молча сделать, чтобы не спорить","Написать: «Вы нарушаете договорённости!»","Игнорировать запрос","Напомнить о платных доработках и предложить выбрать самое важное"],"correctAnswer":3,"explanation":"Чёткие границы защитят твоё время, а клиент поймёт, что правки — не бесконечны."},{"question":"Клиент предлагает работать бесплатно «за ценный опыт». Твой ответ?","answers":["Согласиться — вдруг это выгодно","Вежливо объяснить свои расценки, но оставить возможность сотрудничества в будущем","Сразу заблокировать","Грубо отказать"],"correctAnswer":1,"explanation":"Так ты сохранишь репутацию и, возможно, получишь платный заказ позже."}]},{"articleId":"article6","questions":[{"question":"Как ИИ помогает дизайнеру в работе с текстами?","answers":["Полностью заменяет копирайтера","Быстро генерирует варианты текстов для доработки","Автоматически публикует посты в соцсетях","Переводит тексты без ошибок"],"correctAnswer":1,"explanation":"ИИ экономит время, предлагая заготовки текстов (например, заголовки или описания), но финальную доработку всё равно делает автор."},{"question":"Зачем дизайнеру использовать ИИ для генерации изображений?","answers":["Чтобы полностью отказаться от стоков и фотосессий","Для быстрого создания концептов и прототипов","Чтобы не учиться работать в графических редакторах","Для автоматической доработки финальных макетов"],"correctAnswer":1,"explanation":"ИИ-генерация ускоряет поиск идей, но финальные работы обычно требуют доработки вручную или замены на профессиональные материалы."},{"question":"В чём главное преимущество ИИ для фрилансера?","answers":["Полная замена человеческого труда","Возможность не учиться новому","Экономия времени на рутине для фокуса на творчестве","Гарантия идеального результата без доработок"],"correctAnswer":2,"explanation":"ИИ берёт на себя шаблонные задачи (генерация идей, обработка файлов), освобождая время для креативной работы."}]},{"articleId":"article7","questions":[{"question":"Что НЕ является качественным отдыхом?","answers":["Прогулка без телефона","Чтение бумажной книги","Бесконечный скроллинг соцсетей","Легкая тренировка или растяжка"],"correctAnswer":2,"explanation":"Пассивное потребление контента не восстанавливает силы, а лишь усиливает усталость и тревожность."},{"question":"Какой ритуал поможет мозгу понять, что рабочий день закончился?","answers":["Продолжить работать до позднего вечера","Проверить почту перед сном","Быстро пролистать ленту новостей","Закрыть рабочие вкладки и включить расслабляющую музыку"],"correctAnswer":3,"explanation":"Четкий ритуал завершения работы помогает переключиться и даёт мозгу сигнал, что пора отдыхать."},{"question":"Что лучше всего помогает перезагрузиться после работы?","answers":["Просмотр TikTok","Рисование или лепка","Долгий сон","Ответы на рабочие сообщения"],"correctAnswer":1,"explanation":"Занятия, задействующие руки и воображение, помогают отвлечься от работы и снять напряжение."}]},{"articleId":"article8","questions":[{"question":"Что такое синдром самозванца?","answers":["Уверенность в своём профессионализме","Внутреннее убеждение, что успех незаслужен, а навыки недостаточны","Желание казаться лучше, чем ты есть","Боязнь публичных выступлений"],"correctAnswer":1,"explanation":"Синдром самозванца — это психологическое явление, при котором человек не верит в свои достижения, считая их случайностью."},{"question":"Что помогает бороться с синдромом самозванца?","answers":["Постоянное сравнение себя с более успешными коллегами","Фиксация своих достижений и положительных отзывов","Игнорирование ошибок и недостатков","Ожидание момента, когда «станешь настоящим профессионалом»"],"correctAnswer":1,"explanation":"Записывая успехи, проще увидеть реальный прогресс и снизить тревожность."},{"question":"Почему дизайнеры особенно подвержены синдрому самозванца?","answers":["Потому что их работа слишком проста","Из-за чётких и объективных критериев оценки качества","Из-за субъективности оценок и отсутствия единых стандартов","Потому что клиенты всегда довольны результатом"],"correctAnswer":2,"explanation":"В творческих профессиях нет однозначных критериев «правильного» результата, что усиливает неуверенность."}]}]');

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