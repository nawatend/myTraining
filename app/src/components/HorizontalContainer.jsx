import React from 'react'
import WorkoutCard from './WorkoutCard'

export default function HorizontalContainer(props) {
    return (
        <div className="scrolling-wrapper">
            {props.children}
        </div>
    )
}
