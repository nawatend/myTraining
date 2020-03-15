import React from 'react'

export default function Title({ text = "Title" }) {
    return (
        <div className="title">
            {text}
        </div>
    )
}
