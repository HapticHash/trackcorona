import React, { useState, useEffect }  from 'react'
import { Line } from "react-chartjs-2"

function LineGraph() {

    const [data, setData] = useState({})

    const buildChartData = (data, casesType='cases') => {
        const chartData = []
        let lastDataPoint
        data[casesType].forEach(data => {
            if (lastDataPoint) {
                const newDataPoint = {
                    x: data,
                    y: data[casesType][data] - lastDataPoint
                }
                chartData.push(newDataPoint)
            }
            lastDataPoint = data[casesType][data]
        })
        return chartData
    }

    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
    }, [])

    return (
        <div>
            <h1>Graph</h1>
            <Line/>
        </div>
    )
}

export default LineGraph
