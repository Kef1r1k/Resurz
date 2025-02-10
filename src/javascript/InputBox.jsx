import React from 'react'

const InputBox = ({ type, value, onChange, onSubmit }) => {
  return (
    <div className="M_ChatInput">
      <input
        className="A_Input"
        type={type} // text или number
        value={value}
        onChange={onChange}
        placeholder="Введите ваш ответ..."
      />
      <button className="A_SendButton" onClick={onSubmit}></button>
    </div>
  )
}

export default InputBox
