import React from 'react'

export default function SubTitle({ text = "Sub Title" }) {
    return (
        <div className="sub__title">
            {text}
        </div>
    )
}
