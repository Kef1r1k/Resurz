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

  const scrollbottom = () => {
    setTimeout(() => {
      const container = document.querySelector('.W_MessagesContainer')
      if (container) container.scrollTo({ top: container.scrollHeight })
    }, 10)
  }

  const handleHintClick = () => {
    setShowHint((prev) => !prev) // Переключаем состояние подсказки
    if (!showHint) {
      scrollbottom() // Скроллим вниз при открытии подсказки
    }
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
                <div className="A_HintButton"></div>
                {showHint && (
                  <div className="W_HintBubble">
                    {/* Подсказка для десктопов */}
                    <div
                      className="A_HintBubbleDesktop"
                      dangerouslySetInnerHTML={{
                        __html: question.hint.replace(/\n/g, '<br>')
                      }}
                    />

                    {/* Подсказка для мобильных устройств */}
                    <div className="M_HintBubbleMobile">
                      <div className="W_HintTop">
                        <h4>Подсказка</h4>
                        <button
                          className="A_CloseButton"
                          onClick={handleCloseHint}
                        ></button>
                      </div>
                      <p
                        className="M_HintBubbleMobileText"
                        dangerouslySetInnerHTML={{
                          __html: question.hint.replace(/\n/g, '<br>')
                        }}
                      />
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
          {question.options.map((option, index) => {
            // Проверяем, является ли вариант "скачать договор"
            const isDownloadButton = option === 'скачать договор'

            return (
              <React.Fragment key={index}>
                {isDownloadButton ? (
                  // Используем кнопку вместо ссылки
                  <button
                    type="button"
                    className="A_MessageButton"
                    onClick={() => onAnswer(option)}
                  >
                    {option}
                  </button>
                ) : (
                  <button
                    className={`A_MessageButton ${
                      selectedOption === option ? 'selected' : ''
                    } ${isLastMessage ? '' : 'disabled'}`}
                    key={index}
                    onClick={isLastMessage ? () => onAnswer(option) : undefined}
                    disabled={!isLastMessage}
                  >
                    {option}
                  </button>
                )}
              </React.Fragment>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Message
