import React, { useState } from 'react'
import { generateContract } from './generate-contract.js'
import Message from './Message.jsx'
import Answer from './Answer.jsx'
import InputBox from './InputBox.jsx'
import ProgressBar from './ProgressBar.jsx'

const questions = [
  {
    id: 1,
    text: 'Привет! Я помогу тебе создать договор для работы с заказчиком. Какой у тебя запрос?',
    type: 'select',
    options: [
      'небольшой заказ',
      'заказ с этапами работы',
      'продолжительное сотрудничество'
    ],
    scenario: ['start'],
    hint: 'Я буду адаптировать договор под твои потребности — менять структуру и формулировки.\n\nЕсли проект большой, лучше выбери договор с этапами работ.\n\nЕсли задачи пока не все известны, лучше выбери формат долгосрочного сотрудничества — такой договор можно дополнять заказами по мере их появления.'
  },
  {
    id: 2,
    text: 'Отлично! Что разрабатываешь?',
    type: 'text',
    scenario: ['небольшой заказ', 'заказ с этапами работы'],
    key: 'проект'
  },
  {
    id: 3,
    text: 'Каким будет тип оплаты?',
    type: 'select',
    options: ['предоплата', 'полная оплата', 'пост-оплата'],
    scenario: [
      'небольшой заказ',
      'заказ с этапами работы',
      'продолжительное сотрудничество'
    ],
    hint: 'Предоплата — оплата части суммы до начала работы.\nПолная оплата — 100% оплата до старта проекта.\nПост-оплата — оплата после выполнения работы.',
    conditionKey: true
  },
  {
    id: 4,
    text: 'Каким будет процент предоплаты?',
    type: 'number',
    scenario: ['небольшой заказ', 'заказ с этапами работы'],
    key: 'процент',
    condition: {
      questionId: 3,
      value: 'предоплата'
    }
  },
  {
    id: 5,
    text: 'Через сколько рабочих дней после подписания договора ты начнешь работу?',
    type: 'number',
    scenario: ['небольшой заказ', 'заказ с этапами работы'],
    key: 'начало_работы'
  },
  {
    id: 6,
    text: 'Сколько вариантов проекта ты подготовишь заказчику?',
    type: 'number',
    scenario: ['небольшой заказ', 'заказ с этапами работы'],
    key: 'варианты'
  },
  {
    id: 7,
    text: 'Сколько рабочих дней тебе нужно для подготовки вариантов проекта?',
    type: 'number',
    scenario: ['небольшой заказ', 'заказ с этапами работы'],
    key: 'срок'
  },
  {
    id: 8,
    text: 'Заказчик выбрал один из вариантов, но попросил доработать. Через сколько рабочих дней пришлешь финальный проект?',
    type: 'number',
    scenario: ['небольшой заказ', 'заказ с этапами работы'],
    key: 'финал'
  },
  {
    id: 9,
    text: 'Сколько рабочих дней есть у заказчика, чтобы принять готовую работу либо направить мотивированный отказ?',
    type: 'number',
    scenario: ['заказ с этапами работы', 'продолжительное сотрудничество'],
    key: 'приемка'
  },
  {
    id: 10,
    text: 'Твой договор готов! Cкачай его, проверь все выделенное желтым и самостоятельно заполни синие пропуски, реквизиты сторон, техническое задание и смету. Я также могу помочь с расширенной настройкой договора, если тебе интересно.',
    type: 'select',
    options: ['скачать договор', 'перейти к доп. настройкам'],
    scenario: [
      'небольшой заказ',
      'заказ с этапами работы',
      'продолжительное сотрудничество'
    ]
  },
  {
    id: 11,
    text: 'Можно оформить задание без подписания доп. соглашения к договору, если стоимость работы меньше скольки рублей?',
    type: 'number',
    scenario: ['заказ с этапами работы', 'продолжительное сотрудничество'],
    extended: true,
    key: 'мин_стоимость'
  },
  {
    id: 12,
    text: 'Нужно условие о конфиденциальности?',
    type: 'select',
    options: ['да', 'нет'],
    scenario: [
      'небольшой заказ',
      'заказ с этапами работы',
      'продолжительное сотрудничество'
    ],
    extended: true,
    hint: 'Конфиденциальность — запрет на разглашение или передачу посторонним информации о проекте (например данные клиента, идеи, черновики).',
    key: 'конфиденциально'
  },
  {
    id: 13,
    text: 'Будет гарантийное обслуживание?',
    type: 'select',
    options: ['да', 'нет'],
    scenario: ['заказ с этапами работы'],
    extended: true,
    hint: 'Гарантийное обслуживание — бесплатное исправление твоих недочетов в финальной работе после сдачи-приемки, если клиент обнаружил их в оговоренный срок',
    key: 'гарантийное_обслуживание'
  },
  {
    id: 14,
    text: 'Выбери срок гарантийного обслуживания:',
    type: 'select',
    options: ['1 месяц', '3 месяца', '6 месяцев', '1 год'],
    scenario: ['заказ с этапами работы'],
    key: 'срок_обслуживания',
    condition: {
      questionId: 13,
      value: 'да'
    }
  },
  {
    id: 15,
    text: 'Передать все авторские права на результат работы?',
    type: 'select',
    options: ['да', 'нет'],
    scenario: [
      'небольшой заказ',
      'заказ с этапами работы',
      'продолжительное сотрудничество'
    ],
    extended: true,
    hint: 'Если есть что-то, чем ты не хочешь делиться с заказчиком, можно прописать это в договоре.\nПрава на отвергнутые идеи и варианты в любом случае ему не передаются.',
    key: 'неполная_передача'
  },
  {
    id: 16,
    text: 'Хочешь изменить максимальные пени?',
    type: 'select',
    options: ['да', 'нет'],
    scenario: [
      'небольшой заказ',
      'заказ с этапами работы',
      'продолжительное сотрудничество'
    ],
    extended: true,
    hint: 'Пени — штраф за нарушение сроков. Начисляется за каждый день задержки в 0,1% от суммы.',
    key: 'макс_пени'
  },
  {
    id: 17,
    text: 'Какой процент от стоимости работ будет максимальными пени?',
    type: 'number',
    scenario: [
      'небольшой заказ',
      'заказ с этапами работы',
      'продолжительное сотрудничество'
    ],
    key: 'пени',
    condition: {
      questionId: 16,
      value: 'да'
    }
  },
  {
    id: 18,
    text: 'Спасибо за ответы! Теперь твой договор полностью готов к скачиванию. Напоминаю – проверь все выделенное желтым и самостоятельно заполни синие пропуски, реквизиты сторон, техническое задание и смету.',
    type: 'select',
    options: ['скачать договор'],
    scenario: [
      'небольшой заказ',
      'заказ с этапами работы',
      'продолжительное сотрудничество'
    ],
    extended: true
  }
]

export const Chat = () => {
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

  const calculateProgress = () => {
    if (isChatFinished) return 100
    const scenarioQuestions = questions.filter(
      (q) =>
        (q.scenario.includes(currentScenario) || q.scenario === 'start') &&
        (!q.extended || isExtendedMode)
    )
    const totalQuestions = scenarioQuestions.length
    const answeredQuestions = userAnswers.filter((answer) =>
      scenarioQuestions.some((q) => q.id === answer.questionId)
    ).length
    return (answeredQuestions / totalQuestions) * 100
  }

  const scrollToBottom = () => {
    setTimeout(() => {
      const container = document.querySelector('.W_MessagesContainer')
      if (container)
        container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
    }, 10)
  }

  const handleAnswer = async (answer) => {
    const currentQuestion = questions[currentQuestionIndex]

    const newAnswer = { questionId: currentQuestion.id, answer }

    setUserAnswers([...userAnswers, newAnswer])

    const tempAnswers = [...userAnswers, newAnswer]

    setUserAnswers([...userAnswers, { questionId: currentQuestion.id, answer }])
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestion.id]: answer
    })
    setMessages([...messages, { text: answer, isUser: true }])
    scrollToBottom()

    if (answer === 'скачать договор') {
      setTimeout(() => {
        generateContract(userAnswers, isExtendedMode)
      }, 0)
      return
    }

    if (answer === 'перейти к расширенным настройкам') {
      setIsExtendedMode(true)
      const nextQuestion = questions.find(
        (q) => q.scenario.includes(currentScenario) && q.extended === true
      )
      if (nextQuestion) {
        setCurrentQuestionIndex(questions.indexOf(nextQuestion))
        setMessages((prev) => [
          ...prev,
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
    if (
      [
        'небольшой заказ',
        'заказ с этапами работы',
        'продолжительное сотрудничество'
      ].includes(answer)
    ) {
      nextScenario = answer
    }

    const nextQuestion = questions.find((q, index) => {
      if (index <= currentQuestionIndex) return false

      if (q.condition) {
        const parentAnswer = tempAnswers.find(
          (a) => a.questionId === q.condition.questionId
        )

        if (!parentAnswer || parentAnswer.answer !== q.condition.value) {
          return false
        }
      }

      return (
        q.scenario.includes(nextScenario) && (!q.extended || isExtendedMode)
      )
    })

    if (nextQuestion) {
      setCurrentQuestionIndex(questions.indexOf(nextQuestion))
      setCurrentScenario(nextScenario)
      setMessages((prev) => [
        ...prev,
        { text: nextQuestion.text, isUser: false, questionId: nextQuestion.id }
      ])

      const isLast = !questions.some(
        (q, index) =>
          index > questions.indexOf(nextQuestion) &&
          q.scenario.includes(nextScenario) &&
          (!q.extended || isExtendedMode)
      )

      if (isLast) {
        setIsChatFinished(true)
      }
    }

    setUserInput('')
  }

  const handleStartChat = () => {
    setShowWelcome(false)
    setMessages([
      { text: questions[0].text, isUser: false, questionId: questions[0].id }
    ])
  }

  const handlePopupOpen = () => {
    setIsPopupOpen(true)
    document.body.classList.add('overflow-hidden')
  }

  const handlePopupClose = () => {
    setIsPopupOpen(false)
    document.body.classList.remove('overflow-hidden')
  }

  const handleDownloadContract = async () => {
    await generateContract(userAnswers, isExtendedMode)
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
          const updated = { ...prev }
          delete updated[previousQuestionId]
          return updated
        })

        setUserAnswers((prevAnswers) =>
          prevAnswers.filter((a) => a.questionId !== previousQuestionId)
        )
      }
    }
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
              onClick={handlePopupClose}
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
            <a
              href="./share/contracts/dogovor_sotrudnichestvo.docx"
              className="A_Button secondary"
              download
            >
              Продолжительное сотрудничество
            </a>
          </div>
        </div>
      )}

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
          disabled={['select'].includes(questions[currentQuestionIndex]?.type)}
        />
      </div>
    </div>
  )
}

export default Chat
