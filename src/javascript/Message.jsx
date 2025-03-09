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

  const handleHintClick = () => {
    setShowHint((prev) => !prev) // Переключаем состояние подсказки
  }

  const handleCloseHint = (event) => {
    event.stopPropagation() // Останавливаем всплытие события
    setShowHint(false) // Закрываем подсказку
  }

  return (
    <div className="O_BotMessage">
      <div className="W_Message">
        {isLastMessage && <div className="Q_Image"></div>}
        <div className="W_MessageBubble">
          <div className="A_Message bot">{text}</div>
          <div className="C_ActionButtons">
            {question?.hint && (
              <div className="M_Hint" onClick={handleHintClick}>
                <div className="A_HintButton"> </div>
                {showHint && (
                  <div className="W_HintBubble">
                    {/* Подсказка для десктопов */}
                    <div className="A_HintBubbleDesktop">{question.hint}</div>
                    {/* Подсказка для мобильных устройств */}
                    <div className="M_HintBubbleMobile">
                      <div className="W_HintTop">
                        <h4>Подсказка</h4>
                        <button
                          className="A_CloseButton"
                          onClick={handleCloseHint}
                        ></button>
                      </div>
                      <p>{question.hint}</p>
                    </div>
                  </div>
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
                selectedOption === option ? 'selected' : ''
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
