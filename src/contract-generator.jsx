import React from 'react'
import { createRoot } from 'react-dom/client'
import Chat from './javascript/Chat.jsx'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('reactComponentRoot')
  const root = createRoot(container)
  root.render(<Chat />)
})
