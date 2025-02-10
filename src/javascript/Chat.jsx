import React, { useState, useEffect } from 'react'
import Message from './Message.jsx'
import InputBox from './InputBox.jsx' // Компонент для ввода текста/чисел

const questions = [
  {
    id: 1,
    text: 'Привет! Я помогу тебе создать договор для работы с заказчиком. Какой у тебя запрос?',
    type: 'select',
    options: ['небольшой заказ', 'заказ с этапами работы'],
    scenario: ['start'], // Этот вопрос всегда в начале
    hint: 'В зависимости от твоих потребностей я буду изменять структуру договора и использовать разные формулировки. Если создаваемый продукт объемный, советую выбрать договор с описанными этапами работ. Если продукт дорабатывается, и полный фронт работ пока не ясен, то рекомендую выбрать продолжительное сотрудничество — такой договор можно будет дополнять по мере поступления задач. Можешь посмотреть наш  видео туториал.'
  },
  {
    id: 2,
    text: 'Отлично! Что разрабатываем?',
    type: 'text',
    scenario: ['небольшой заказ', 'заказ с этапами работы'] // Вопрос для обоих сценариев
  },
  {
    id: 3,
    text: 'Какая будет предоплата?',
    type: 'select',
    options: ['100%', '50%', 'фиксированная сумма', 'без предоплаты'],
    scenario: ['небольшой заказ', 'заказ с этапами работы'] // Вопрос для обоих сценариев
  },
  {
    id: 4,
    text: 'Сколько рабочих дней тебе понадобится для выполнения работы? Напиши цифрой',
    type: 'number',
    scenario: ['небольшой заказ'] // Вопрос только для "небольшой заказ"
  },
  {
    id: 5,
    text: 'Сколько вариантов ты обязуешься предоставить заказчику для выбора? Напиши цифрой',
    type: 'number',
    scenario: ['небольшой заказ', 'заказ с этапами работы'] // Вопрос для обоих сценариев
  },
  {
    id: 6,
    text: 'В течение скольких рабочих дней ты отправишь заказчику варианты? Напиши цифрой',
    type: 'number',
    scenario: ['небольшой заказ', 'заказ с этапами работы'] // Вопрос для обоих сценариев
  },
  {
    id: 7,
    text: 'Твой персональный договор готов! Осталось только скачать его в формате .doc и самостоятельно заполнить реквизиты сторон, техническое задание и смету. Я также могу помочь с расширенной настройкой договора, если тебе интересно.',
    type: 'select',
    options: ['скачать договор', 'перейти к расширенным настройкам'],
    scenario: ['небольшой заказ', 'заказ с этапами работы'] // Вопрос для обоих сценариев
  },
  {
    id: 8,
    text: 'За сколько рабочих дней ты обязуешься внести правки в выбранный заказчиком вариант дизайн-концепции? Напиши цифрой',
    type: 'number',
    scenario: ['небольшой заказ', 'заказ с этапами работы'], // Вопрос для обоих сценариев
    extended: true // Вопрос для расширенных настроек
  },
  {
    id: 9,
    text: 'Каким способом заказчику будут переданы финальные материалы?',
    type: 'select',
    options: [
      'файлами по эл. почте или в мессенджере',
      'ссылкой на облачное хранилище',
      'на физическом носителе'
    ],
    scenario: ['небольшой заказ', 'заказ с этапами работы'], // Вопрос для обоих сценариев
    extended: true
  },
  {
    id: 10,
    text: 'Есть ли в заказе то, на что ты бы не хотел передавать заказчику авторские права?',
    type: 'select',
    options: ['да', 'нет'],
    scenario: ['небольшой заказ', 'заказ с этапами работы'], // Вопрос для обоих сценариев
    extended: true
  },
  {
    id: 11,
    text: 'В заказе есть конфиденциальная информация, которую нельзя разглашать?',
    type: 'select',
    options: ['да', 'нет'],
    scenario: ['небольшой заказ', 'заказ с этапами работы'], // Вопрос для обоих сценариев
    extended: true
  },
  {
    id: 12,
    text: 'В заказе предусмотрено гарантийное обслуживание разработанного продукта?',
    type: 'select',
    options: ['да', 'нет'],
    scenario: ['небольшой заказ', 'заказ с этапами работы'], // Вопрос для обоих сценариев
    extended: true
  },
  {
    id: 13,
    text: 'Как будет оплачиваться проект?',
    type: 'select',
    options: [
      'по этапно',
      'в начале и в конце работ',
      'полностью в начале',
      'полностью в конце'
    ],
    scenario: ['заказ с этапами работы'] // Вопрос только для "заказ с этапами работы"
  },
  {
    id: 14,
    text: 'Стороны могут не подписывать доп. соглашения для оформления задания, когда его стоимость меньше скольки? Напиши число',
    type: 'number',
    scenario: ['заказ с этапами работы'], // Вопрос только для "заказ с этапами работы"
    extended: true
  },
  {
    id: 15,
    text: 'Сколько дней есть у заказчика для принятия этапа работ? Напиши цифрой',
    type: 'number',
    scenario: ['заказ с этапами работы'], // Вопрос только для "заказ с этапами работы"
    extended: true
  }
]

const Chat = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [messages, setMessages] = useState([]) // Сообщения (вопросы и ответы)
  const [userInput, setUserInput] = useState('') // Текущий ввод пользователя
  const [userAnswers, setUserAnswers] = useState([]) // Ответы пользователя

  // Добавляем первое сообщение от бота при монтировании компонента
  useEffect(() => {
    const firstQuestion = questions[0]
    setMessages([{ text: firstQuestion.text, isUser: false }])
  }, [])

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

    // Переходим к следующему вопросу
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)

      // Добавляем следующий вопрос от бота в список сообщений
      const nextQuestion = questions[currentQuestionIndex + 1]
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: nextQuestion.text, isUser: false }
      ])
    }

    // Очищаем поле ввода (если это был ввод текста/числа)
    setUserInput('')
  }

  return (
    <div className="chat">
      {/* Отображаем все сообщения */}
      <div className="messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.isUser ? 'user' : 'bot'}`}
          >
            {message.text}
          </div>
        ))}
      </div>

      {/* Отображаем текущий вопрос (если это не select) */}
      {questions[currentQuestionIndex]?.type !== 'select' && (
        <InputBox
          type={questions[currentQuestionIndex]?.type} // Тип ввода (text/number)
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onSubmit={() => handleAnswer(userInput)}
        />
      )}

      {/* Отображаем текущий вопрос (если это select) */}
      {questions[currentQuestionIndex]?.type === 'select' && (
        <Message
          question={questions[currentQuestionIndex]}
          onAnswer={handleAnswer} // Передаем функцию handleAnswer для обработки выбора
        />
      )}
    </div>
  )
}

export default Chat
