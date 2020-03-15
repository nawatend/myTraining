import React from 'react'
import Bars from './Bars'

export default function ExerciseMainInfo({ mainInfo }) {
    return (
        <div>
            <div className="exercise__main__info">
                {/* Time base */}
                <div className="exercise__main__info--time">
                    <div className="exercise__main__info--time--label">Time</div>
                    <div className="exercise__main__info--time--value">{mainInfo.time} Minutes</div>
                </div>
                <Bars label="Cardio" maxBar={5} coveredBar={mainInfo.cardio} />
                <Bars label="Muscle" maxBar={5} coveredBar={mainInfo.muscle} />
            </div>
        </div>
    )
}
