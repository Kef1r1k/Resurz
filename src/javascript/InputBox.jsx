import React from 'react'

const InputBox = ({ type, value, onChange, onSubmit }) => {
  return (
    <div className="input-box">
      <input
        type={type} // text или number
        value={value}
        onChange={onChange}
        placeholder="Введите ваш ответ..."
      />
      <button onClick={onSubmit}>Отправить</button>
    </div>
  )
}

export default InputBox
