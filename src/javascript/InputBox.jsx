import React from 'react'

const InputBox = ({ type, value, onChange, onSubmit, disabled }) => {
  // Обработчик нажатия клавиши
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !disabled) {
      onSubmit() // Вызываем onSubmit, если нажат Enter
    }
  }

  return (
    <div className="M_ChatInput">
      <input
        className="A_Input"
        type={type} // text или number
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown} // Добавляем обработчик нажатия клавиши
        placeholder={disabled ? 'Выбери ответ' : 'Введи здесь свой ответ...'}
        disabled={disabled}
      />
      <button
        className="A_SendButton"
        onClick={onSubmit}
        disabled={disabled}
      ></button>
    </div>
  )
}

export default InputBox
