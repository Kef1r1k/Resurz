import React, { useState } from 'react' // Добавлен useState

const Message = ({ question, onAnswer }) => {
  const [showHint, setShowHint] = useState(false) // Используем useState для управления подсказкой

  return (
    <div className="message bot">
      <p>{question.text}</p>
      {question.hint && (
        <div
          className="hint-icon"
          onMouseEnter={() => setShowHint(true)}
          onMouseLeave={() => setShowHint(false)}
        >
          ℹ️
          {showHint && <div className="hint-text">{question.hint}</div>}
        </div>
      )}
      {/* Кнопки с вариантами ответа (если тип вопроса — select) */}
      {question.type === 'select' && (
        <div className="options">
          {question.options.map((option, index) => (
            <button key={index} onClick={() => onAnswer(option)}>
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Message
