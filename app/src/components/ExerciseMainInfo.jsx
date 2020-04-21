import React from 'react'
import Bars from './Bars'

export default function ExerciseMainInfo({ mainInfo }) {
    return (
        <div>
            <div className="exercise__main__info">

                {(mainInfo.exerciseBase.type !== "time") ? (
                    <div className="type__reps">

                        <div>
                            <div className="type__reps__title">Instructions</div>
                            <li className="subHeader">{`${mainInfo.reps - 2} - ${mainInfo.reps} reps`}</li>
                            <li className="subHeader">{`${mainInfo.kg - 4} - ${mainInfo.kg} kg`}</li>
                            <li className="subHeader">{`${mainInfo.sets - 1} - ${mainInfo.sets}  sets`}</li>
                        </div>
                        <hr/>
                        <Bars label="Cardio" maxBar={5} coveredBar={mainInfo.exerciseBase.cardioLevel} />
                        <Bars label="Muscle" maxBar={5} coveredBar={mainInfo.exerciseBase.muscleLevel} />
                    </div>
                )
                    : (
                        <div className="type__time">
                            <div className="exercise__main__info--time">
                                <div className="exercise__main__info--time--label">Time</div>
                                <div className="exercise__main__info--time--value">{mainInfo.time} Minutes</div>
                            </div>
                            <Bars label="Cardio" maxBar={5} coveredBar={mainInfo.cardioLevel} />
                            <Bars label="Muscle" maxBar={5} coveredBar={mainInfo.muscleLevel} />
                        </div>

                    )}

            </div>
        </div>
    )
}
