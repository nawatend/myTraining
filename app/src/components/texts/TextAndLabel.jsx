import React from 'react'

export default function TextAndLabel({ text = "text", label = "labe text" }) {
  return (
    <div className="textAndLabel">
      <div className="textAndLabel__label">{label}</div>
      <div className="textAndLabel__text">{text}</div>
    </div>
  )
}
