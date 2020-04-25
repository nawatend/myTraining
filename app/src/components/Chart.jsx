/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
//chart
import { Bar } from 'react-chartjs-2'
import getLabels from '../utils/labels'
export default function Chart({ labelType = "day", data = [], name = "Label", averageName = "average name", type = "reps", color = "#FF772E" }) {
    let getStepSize = (values) => {

        const max = Math.max(...values)
        const min = Math.min(...values)

        return parseInt(max / 2) + 20

    }


    const scope = {
        day: 7,
        week: 4,
        month: 12,
        year: 4
    }


    const [labels, setLabels] = useState(getLabels()[labelType])
    const [scopeDay, setScopeDay] = useState(data.day.length - 7)
    const [startScope, setStartScope] = useState(data.day.length)
    const [chartData, setChartData] = useState([])
    const [stepSize, setStepSize] = useState(getStepSize(data[labelType]))

   


    useEffect(() => {
        if (labelType === "day") {
            //console.log(data.day)
            setChartData(data.day.slice(scopeDay, startScope))
        }
    }, [data])


    useEffect(() => {
        setLabels(getLabels()[labelType])
    }, [labelType])

    let data2 = {
        labels: labels,
        datasets: [{
            label: averageName,
            backgroundColor: color,
            borderColor: color,
            data: chartData,
        }],
        options: {
            curvature: 1,
            title: {
                display: true,
                text: name,

            },
            legend: {
                display: true,
                position: 'bottom'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        stepSize: stepSize,
                    },
                }]
            },
        }

    }

    return (
        < Bar
            data={data2}
            options={data2.options}
            height={500}
            width={700}
        />
    )
}
