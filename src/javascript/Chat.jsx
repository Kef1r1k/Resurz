import React, { useState } from 'react'
import { generateContract } from './generate-contract.js'
import Message from './Message.jsx'
import Answer from './Answer.jsx'
import InputBox from './InputBox.jsx'
import ProgressBar from './ProgressBar.jsx'

const questions = [
  {
    id: 1,
    text: 'Привет! Я помогу тебе создать договор для работы с заказчиком. Какой у тебя запрос?',
    type: 'select',
    options: ['небольшой заказ', 'заказ с этапами работы'],
    scenario: 'start'
  },
  {
    id: 2,
    text: 'Отлично! Что разрабатываем?',
    type: 'text',
    scenario: ['небольшой заказ', 'заказ с этапами работы'],
    hint: 'Укажите, что именно вы разрабатываете, например, логотип, сайт или мобильное приложение.'
  },
  {
    id: 3,
    text: 'Какая будет предоплата?',
    type: 'select',
    options: ['100%', '50%', 'фиксированная сумма', 'без предоплаты'],
    scenario: ['небольшой заказ', 'заказ с этапами работы'],
    hint: 'Выберите размер предоплаты. Это поможет зафиксировать финансовые условия на этапе заключения договора.'
  },
  {
    id: 4,
    text: 'Сколько рабочих дней тебе понадобится для выполнения работы? Напиши цифрой',
    type: 'number',
    scenario: 'небольшой заказ',
    hint: 'Укажите реалистичный срок выполнения работы. Это поможет избежать недоразумений с заказчиком.'
  },
  {
    id: 5,
    text: 'Сколько вариантов ты обязуешься предоставить заказчику для выбора? Напиши цифрой',
    type: 'number',
    scenario: ['небольшой заказ', 'заказ с этапами работы']
  },
  {
    id: 6,
    text: 'В течение скольких рабочих дней ты отправишь заказчику варианты? Напиши цифрой',
    type: 'number',
    scenario: ['небольшой заказ', 'заказ с этапами работы'],
    hint: 'Укажите срок, в течение которого вы предоставите заказчику варианты для выбора.'
  },
  {
    id: 7,
    text: 'Твой персональный договор готов! Осталось только скачать его в формате .doc и самостоятельно заполнить реквизиты сторон, техническое задание и смету. Я также могу помочь с расширенной настройкой договора, если тебе интересно.',
    type: 'select',
    options: ['скачать договор', 'перейти к расширенным настройкам'],
    scenario: ['небольшой заказ', 'заказ с этапами работы']
  },
  {
    id: 8,
    text: 'Хорошо! Давай настроим дополнительные условия. Какой срок действия договора?',
    type: 'text',
    scenario: ['небольшой заказ', 'заказ с этапами работы'],
    extended: true // Вопрос для расширенных настроек
  },
  {
    id: 9,
    text: 'Будут ли предусмотрены штрафы за нарушение сроков?',
    type: 'select',
    options: ['да', 'нет'],
    scenario: ['небольшой заказ', 'заказ с этапами работы'],
    extended: true // Вопрос для расширенных настроек
  },
  {
    id: 10,
    text: 'Спасибо за ответы! Теперь твой договор полностью готов к скачиванию.',
    type: 'select',
    options: ['скачать договор'],
    scenario: ['небольшой заказ', 'заказ с этапами работы'],
    extended: true // Вопрос для расширенных настроек
  }
]

const Chat = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [messages, setMessages] = useState([])
  const [userInput, setUserInput] = useState('')
  const [userAnswers, setUserAnswers] = useState([])
  const [currentScenario, setCurrentScenario] = useState('start')
  const [isChatFinished, setIsChatFinished] = useState(false)
  const [isExtendedMode, setIsExtendedMode] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState({})
  const [showWelcome, setShowWelcome] = useState(true)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const handlePopupOpen = () => {
    setIsPopupOpen(true)
    document.body.classList.add('overflow-hidden') // Блокируем скролл страницы
  }

  // Функция для закрытия попапа
  const handlePopupClose = () => {
    setIsPopupOpen(false)
    document.body.classList.remove('overflow-hidden') // Разблокируем скролл страницы
  }

  const calculateProgress = () => {
    if (isChatFinished) {
      return 100
    }

    const scenarioQuestions = questions.filter(
      (q) =>
        (q.scenario.includes(currentScenario) ||
          q.scenario.includes('start')) &&
        (!q.extended || isExtendedMode)
    )
    const totalQuestions = scenarioQuestions.length
    const answeredQuestions = userAnswers.filter((answer) =>
      scenarioQuestions.some((q) => q.id === answer.questionId)
    ).length
    const progress = (answeredQuestions / totalQuestions) * 100

    return progress
  }

  const scrollToBottom = () => {
    setTimeout(() => {
      const messagesContainer = document.querySelector('.W_MessagesContainer')
      if (messagesContainer) {
        messagesContainer.scrollTo({
          top: messagesContainer.scrollHeight,
          behavior: 'smooth'
        })
      }
    }, 0)
  }

  const handleAnswer = async (answer) => {
    const currentQuestion = questions[currentQuestionIndex]

    setUserAnswers([
      ...userAnswers,
      {
        questionId: currentQuestion.id,
        answer: answer
      }
    ])

    setSelectedOptions((prev) => ({
      ...prev,
      [currentQuestion.id]: answer
    }))

    setMessages([...messages, { text: answer, isUser: true }])

    scrollToBottom()

    if (answer === 'скачать договор') {
      await handleDownloadContract()
      return
    }

    if (answer === 'перейти к расширенным настройкам') {
      setIsExtendedMode(true)
      const nextQuestion = questions.find(
        (q) => q.scenario.includes(currentScenario) && q.extended === true
      )

      if (nextQuestion) {
        setCurrentQuestionIndex(questions.indexOf(nextQuestion))
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: nextQuestion.text,
            isUser: false,
            questionId: nextQuestion.id
          }
        ])
      }
      return
    }

    let nextScenario = currentScenario
    if (answer === 'небольшой заказ') {
      nextScenario = 'небольшой заказ'
    } else if (answer === 'заказ с этапами работы') {
      nextScenario = 'заказ с этапами работы'
    }

    const nextQuestion = questions.find(
      (q, index) =>
        index > currentQuestionIndex &&
        q.scenario.includes(nextScenario) &&
        (!q.extended || isExtendedMode)
    )

    if (nextQuestion) {
      setCurrentQuestionIndex(questions.indexOf(nextQuestion))
      setCurrentScenario(nextScenario)

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: nextQuestion.text, isUser: false, questionId: nextQuestion.id }
      ])

      const isLastQuestionInScenario = !questions.some(
        (q, index) =>
          index > questions.indexOf(nextQuestion) &&
          q.scenario.includes(nextScenario) &&
          (!q.extended || isExtendedMode)
      )

      if (isLastQuestionInScenario) {
        setIsChatFinished(true)
      }
    } else {
      console.log('Ответы пользователя:', userAnswers)
    }

    setUserInput('')
  }

  const handleBack = () => {
    if (messages.length > 1) {
      const newMessages = messages.slice(0, -2)
      setMessages(newMessages)

      const previousQuestionId = newMessages[newMessages.length - 1]?.questionId
      if (previousQuestionId) {
        const previousQuestionIndex = questions.findIndex(
          (q) => q.id === previousQuestionId
        )
        setCurrentQuestionIndex(previousQuestionIndex)

        setSelectedOptions((prev) => {
          const updatedOptions = { ...prev }
          delete updatedOptions[previousQuestionId]
          return updatedOptions
        })
      }

      setUserAnswers(userAnswers.slice(0, -1))
    }
  }

  const handleDownloadContract = async () => {
    await generateContract(userAnswers)
  }

  const handleStartChat = () => {
    setShowWelcome(false)
    setMessages([
      { text: questions[0].text, isUser: false, questionId: questions[0].id }
    ])
  }

  return (
    <div className="O_Chat">
      {showWelcome && (
        <div className="W_WelcomeCreative">
          <div className="A_StyledH2">
            <h2>давай заполним</h2>
            <h2>договор</h2>
          </div>
          <div className="M_WelcomeMessage">
            <div className="Q_Image"></div>
            <div className="W_WelcomeMessage">
              <p>Привет! Я помогу тебе заполнить договор в формате переписки</p>
              <div className="C_Buttons">
                <button className="A_Button primary" onClick={handleStartChat}>
                  Погнали
                </button>
                <button
                  className="A_Button secondary download"
                  onClick={handlePopupOpen}
                >
                  Скачать шаблон
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isPopupOpen && (
        <div className="M_PopUp active">
          <div className="W_PopUpHead">
            <h4>Скачать пустой шаблон договора</h4>
            <button
              className="A_CloseButton"
              onClick={handlePopupClose} // Закрываем попап
            ></button>
          </div>
          <div className="C_Buttons">
            <a
              href="./share/contracts/dogovor_fiz_ur.doc"
              className="A_Button secondary"
              download
            >
              Небольшой заказ
            </a>
            <a
              href="./share/contracts/dogovor_steps.doc"
              className="A_Button secondary"
              download
            >
              Заказ с этапами работ
            </a>
          </div>
        </div>
      )}

      {/* Затемнение фона */}
      {isPopupOpen && <div className="Q_BackgroundBlur active"></div>}

      <div className="W_MessagesContainer">
        <div className="W_Messages">
          {messages.map((message, index) => {
            const question = questions.find((q) => q.id === message.questionId)
            const isLastMessage = index === messages.length - 1
            const isFirstMessage = index === 0

            return message.isUser ? (
              <Answer key={index} text={message.text} />
            ) : (
              <Message
                key={index}
                text={message.text}
                question={question}
                onAnswer={handleAnswer}
                isLastMessage={isLastMessage}
                isFirstMessage={isFirstMessage}
                onBack={handleBack}
                selectedOption={selectedOptions[question?.id]}
              />
            )
          })}
        </div>
      </div>

      <div className="W_ChatInput">
        <ProgressBar progress={calculateProgress()} />
        <InputBox
          type={questions[currentQuestionIndex]?.type}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onSubmit={() => handleAnswer(userInput)}
          disabled={
            questions[currentQuestionIndex]?.type !== 'text' &&
            questions[currentQuestionIndex]?.type !== 'number'
          }
        />
      </div>
    </div>
  )
}

export default Chat
