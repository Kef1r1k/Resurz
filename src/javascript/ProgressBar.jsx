import React from 'react'

const ProgressBar = ({ progress }) => {
  return (
    <div className="A_ProgressBar">
      <div className="Q_ProgressLine" style={{ width: `${progress}%` }}></div>
    </div>
  )
}

export default ProgressBar
