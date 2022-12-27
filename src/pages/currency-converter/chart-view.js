import React from 'react'
import { Card } from "antd";
import { LineChart, Line, ResponsiveContainer, Tooltip,YAxis } from 'recharts';

export default function ChartView({ changeHistory, to }) {
  return (
    <Card>
        <ResponsiveContainer width="100%" height={300}>
              <LineChart width={300} height={100} data={Object.keys(changeHistory.rates).map(i => ({ date: i, ...changeHistory.rates[i] }))}>
                  <YAxis domain={[changeHistory.statistics.Lowest, changeHistory.statistics.Highest]}/>
                <Tooltip  />
                  <Line type="monotone" dataKey={to} stroke="#009688" strokeWidth={2} activeDot={900}/>
            </LineChart>
        </ResponsiveContainer>
    </Card>
  )
}
