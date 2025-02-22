import React, { useState } from 'react' // Добавлен useState

const Message = ({
  text,
  question,
  onAnswer,
  isLastMessage,
  isFirstMessage,
  onBack
}) => {
  const [showHint, setShowHint] = useState(false)
  // Если text не определен, не рендерим сообщение

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
              className="A_MessageButton"
              key={index}
              onClick={() => onAnswer(option)}
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
