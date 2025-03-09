const questions = require('./questions.json')

const startButton = document.getElementById('startTest')
const test = document.querySelector('.O_TestPopUp')
const closeButton = test.querySelector('.A_CloseButton')
const testQuestion = document.getElementById('question')
const progress = document.getElementById('progress')
const answersContainer = document.querySelector('.C_Answers')
const explanationContainer = document.querySelector('.A_QuestionExplained')
const explanationText = document.getElementById('explanation')
const testButton = document.getElementById('test-button')

let currentQuestionIndex = 0
let selectedAnswer = null
let currentTest = []
let isAnswered = false

function testInit() {
  startButton.addEventListener('click', testOpen)
  closeButton.addEventListener('click', popupClose)
}

function testOpen() {
  document.body.classList.add('overflow-hidden')
  test.classList.add('active')
  const articleId = startButton.getAttribute('data-article-id')
  currentTest =
    questions.find((q) => q.articleId === articleId)?.questions || []
  currentTest.length ? loadQuestion() : alert('Тест для этой статьи не найден.')
}

function popupClose() {
  document.body.classList.remove('overflow-hidden')
  test.classList.remove('active')
}

function loadQuestion() {
  const { question, answers, explanation } = currentTest[currentQuestionIndex]
  testQuestion.textContent = question
  progress.textContent = `${currentQuestionIndex + 1}/${currentTest.length}`
  answersContainer.innerHTML = answers
    .map(
      (answer, index) => `
    <div class="A_AnswerBullet" data-answer-index="${index}">${answer}</div>
  `
    )
    .join('')
  explanationText.textContent = ''
  explanationContainer.classList.add('hidden')
  testButton.disabled = true
  testButton.textContent = 'Ответить'
  testButton.classList.remove('correct', 'wrong')
  isAnswered = false
}

answersContainer.addEventListener('click', (event) => {
  if (isAnswered) return
  const answerElement = event.target.closest('.A_AnswerBullet')
  if (answerElement) {
    answersContainer
      .querySelectorAll('.A_AnswerBullet')
      .forEach((el) => el.classList.remove('selected'))
    answerElement.classList.add('selected')
    selectedAnswer = +answerElement.getAttribute('data-answer-index')
    testButton.disabled = false
  }
})

testButton.addEventListener('click', () => {
  if (isAnswered) return
  const { correctAnswer, explanation } = currentTest[currentQuestionIndex]
  const isCorrect = selectedAnswer === correctAnswer

  answersContainer.querySelectorAll('.A_AnswerBullet').forEach((el, index) => {
    el.classList.toggle('correct', index === correctAnswer)
    el.classList.toggle('wrong', index === selectedAnswer && !isCorrect)
  })

  explanationText.textContent = explanation
  explanationContainer.classList.remove('hidden')
  isAnswered = true

  if (currentQuestionIndex < currentTest.length - 1) {
    testButton.textContent = 'Следующий вопрос'
    testButton.addEventListener(
      'click',
      () => {
        currentQuestionIndex++
        loadQuestion()
      },
      { once: true }
    )
  } else {
    testButton.textContent = 'Завершить тест'
    testButton.addEventListener('click', popupClose, { once: true })
  }
})

document.addEventListener('DOMContentLoaded', testInit)
