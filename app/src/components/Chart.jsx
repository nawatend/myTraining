import React, { useEffect, useState } from 'react'
//chart
import { Bar } from 'react-chartjs-2'
import Labels from '../utils/labels'
export default function Chart({ labelType = "day", data = [] }) {
    let getStepSize = (values) => {

        const max = Math.max(...values)
        const min = Math.min(...values)

        return parseInt(max / 2) + 10

    }



    const [labels, setLabels] = useState(Labels[labelType])
    const [chartData, setChartData] = useState(data)
    const [stepSize, setStepSize] = useState(getStepSize(data))

    useEffect(() => {
        setLabels(Labels[labelType])
    }, [labelType])

    let data2 = {
        labels: labels,
        datasets: [{
            label: `Average kg`,
            backgroundColor: '#FF772E',
            borderColor: '#FF772E',
            data: chartData,
        }],
        options: {
            curvature: 1,
            title: {
                display: true,
                text: 'Squat',

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
