import React, { useState } from 'react'

const Message = ({
  text,
  question,
  onAnswer,
  isLastMessage,
  isFirstMessage,
  onBack,
  selectedOption
}) => {
  const [showHint, setShowHint] = useState(false)

  return (
    <div className="O_BotMessage">
      <div className="W_Message">
        {isLastMessage && <div className="Q_Image"></div>}
        <div className="W_MessageBubble">
          <div className="A_Message bot">{text}</div>
          <div className="C_ActionButtons">
            {question?.hint && (
              <div
                className="M_Hint"
                onMouseEnter={() => setShowHint(true)}
                onMouseLeave={() => setShowHint(false)}
              >
                <div className="A_HintButton"> </div>
                {showHint && (
                  <div className="A_HintBubble">{question.hint}</div>
                )}
              </div>
            )}

            {isLastMessage && !isFirstMessage && (
              <button className="A_ChatBackButton" onClick={onBack}></button>
            )}
          </div>
        </div>
      </div>

      {/* Кнопки с вариантами ответа (если тип вопроса — select) */}
      {question?.type === 'select' && (
        <div className="C_MessageButtons">
          {question.options.map((option, index) => (
            <button
              className={`A_MessageButton ${
                selectedOption === option ? 'active' : ''
              } ${isLastMessage ? '' : 'disabled'}`} // Добавляем класс disabled для неактивных кнопок
              key={index}
              onClick={isLastMessage ? () => onAnswer(option) : undefined} // Блокируем клик для неактивных кнопок
              disabled={!isLastMessage} // Отключаем кнопки, если это не последний вопрос
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Message
