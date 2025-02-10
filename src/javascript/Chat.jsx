import React, { useState, useEffect } from 'react'
import Message from './Message.jsx'
import Answer from './Answer.jsx'
import InputBox from './InputBox.jsx' // Компонент для ввода текста/чисел

const questions = [
  {
    id: 1,
    text: 'Привет! Я помогу тебе создать договор для работы с заказчиком. Какой у тебя запрос?',
    type: 'select',
    options: ['небольшой заказ', 'заказ с этапами работы'],
    scenario: ['start']
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
    scenario: ['небольшой заказ'],
    hint: 'Укажите реалистичный срок выполнения работы. Это поможет избежать недоразумений с заказчиком.'
  },
  {
    id: 5,
    text: 'Сколько вариантов ты обязуешься предоставить заказчику для выбора? Напиши цифрой',
    type: 'number',
    scenario: ['небольшой заказ', 'заказ с этапами работы']
    // Подсказка отсутствует
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
    // Подсказка отсутствует
  },
  {
    id: 8,
    text: 'Хорошо! Давай настроим дополнительные условия для небольшого заказа. Какой срок действия договора?',
    type: 'text',
    scenario: ['расширенные настройки 1']
  },
  {
    id: 9,
    text: 'Будут ли предусмотрены штрафы за нарушение сроков?',
    type: 'select',
    options: ['да', 'нет'],
    scenario: ['расширенные настройки 1']
  },
  {
    id: 10,
    text: 'Спасибо за ответы! Теперь твой договор полностью готов к скачиванию.',
    type: 'info',
    scenario: ['расширенные настройки 1']
  },
  {
    id: 11,
    text: 'Хорошо! Давай настроим дополнительные условия для заказа с этапами работы. Какой срок действия договора?',
    type: 'text',
    scenario: ['расширенные настройки 2']
  },
  {
    id: 12,
    text: 'Будут ли предусмотрены штрафы за нарушение сроков?',
    type: 'select',
    options: ['да', 'нет'],
    scenario: ['расширенные настройки 2']
  },
  {
    id: 13,
    text: 'Спасибо за ответы! Теперь твой договор полностью готов к скачиванию.',
    type: 'info',
    scenario: ['расширенные настройки 2']
  }
]

const Chat = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [messages, setMessages] = useState([
    { text: questions[0].text, isUser: false, questionId: questions[0].id } // Первое сообщение от бота
  ]) // Сообщения (вопросы и ответы)
  const [userInput, setUserInput] = useState('') // Текущий ввод пользователя
  const [userAnswers, setUserAnswers] = useState([]) // Ответы пользователя
  const [currentScenario, setCurrentScenario] = useState('start') // Текущий сценарий
  const [isChatFinished, setIsChatFinished] = useState(false) // Флаг завершения чата

  // Обработка ответа пользователя
  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex]

    // Добавляем ответ пользователя в список ответов
    setUserAnswers([
      ...userAnswers,
      {
        questionId: currentQuestion.id, // ID текущего вопроса
        answer: answer // Ответ пользователя
      }
    ])

    // Добавляем ответ пользователя в список сообщений
    setMessages([...messages, { text: answer, isUser: true }])

    // Определяем следующий сценарий
    let nextScenario = currentScenario
    if (answer === 'небольшой заказ') {
      nextScenario = 'небольшой заказ'
    } else if (answer === 'заказ с этапами работы') {
      nextScenario = 'заказ с этапами работы'
    } else if (answer === 'перейти к расширенным настройкам') {
      if (currentScenario === 'небольшой заказ') {
        nextScenario = 'расширенные настройки 1'
      } else if (currentScenario === 'заказ с этапами работы') {
        nextScenario = 'расширенные настройки 2'
      }
    }

    // Находим следующий вопрос, который соответствует текущему сценарию
    const nextQuestion = questions.find(
      (q, index) =>
        index > currentQuestionIndex && q.scenario.includes(nextScenario)
    )

    if (nextQuestion) {
      setCurrentQuestionIndex(questions.indexOf(nextQuestion))
      setCurrentScenario(nextScenario)

      // Добавляем следующий вопрос от бота в список сообщений
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: nextQuestion.text, isUser: false, questionId: nextQuestion.id }
      ])
    } else {
      // Если вопросы закончились, завершаем чат
      setIsChatFinished(true)
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Спасибо за ответы! Твой договор готов.', isUser: false }
      ])
    }

    // Очищаем поле ввода (если это был ввод текста/числа)
    setUserInput('')
  }

  // Обработка возврата к предыдущему вопросу
  const handleBack = () => {
    if (messages.length > 1) {
      // Удаляем последний ответ пользователя и последний вопрос от бота
      const newMessages = messages.slice(0, -2) // Удаляем два последних сообщения
      setMessages(newMessages)

      // Обновляем индекс текущего вопроса
      const previousQuestionId = newMessages[newMessages.length - 1]?.questionId
      if (previousQuestionId) {
        const previousQuestionIndex = questions.findIndex(
          (q) => q.id === previousQuestionId
        )
        setCurrentQuestionIndex(previousQuestionIndex)
      }

      // Удаляем последний ответ пользователя из списка ответов
      setUserAnswers(userAnswers.slice(0, -1))
    }
  }

  return (
    <div className="O_Chat">
      {/* Отображаем все сообщения */}
      <div className="W_Messages">
        {messages.map((message, index) => {
          const question = questions.find((q) => q.id === message.questionId)
          const isLastMessage = index === messages.length - 1
          const isFirstMessage = index === 0

          return message.isUser ? (
            <Answer key={index} text={message.text} /> // Ответ пользователя
          ) : (
            <Message
              key={index}
              text={message.text}
              question={question} // Сообщение от бота
              onAnswer={handleAnswer}
              isLastMessage={isLastMessage}
              isFirstMessage={isFirstMessage}
              onBack={handleBack}
            />
          )
        })}
      </div>

      {/* Отображаем текущий вопрос (если это не select) */}
      {!isChatFinished &&
        questions[currentQuestionIndex]?.type !== 'select' && (
          <InputBox
            type={questions[currentQuestionIndex]?.type} // Тип ввода (text/number)
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onSubmit={() => handleAnswer(userInput)}
          />
        )}
    </div>
  )
}

export default Chat
