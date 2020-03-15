import React from 'react'

export default function Bars({ maxBar = 7, coveredBar = 5, label = "Label" }) {

    let bars = []

    for (let i = 0; i < maxBar; i++) {
        if (i >= 0 && i < coveredBar) {
            bars.push(<div key={i} className="bar bar__covered"></div>)
        } else {
            bars.push(<div key={i} className="bar"></div>)
        }
    }
    return (
        <div className="bars">
            <div className="bars__label">
                {label}
            </div>
            <div className="bars__bars">
                {bars}
            </div>
        </div>
    )
}
