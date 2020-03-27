import React from 'react'

export default function Paragraph({ text = "Para text" }) {
    return (
        <div className="paragraph">
            {text}
        </div>
    )
}
