import { useState, useRef } from 'react'
import Layout from './Components/Layout'
import ScatterChart from './Components/ScatterChart'
import Scatter from './Components/Scatter'
import { PointType } from './Services/commonTypes'

function App() {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const [points, setPoints] = useState<PointType[]>([
    { x: 1, y: 23, label: 'Amazon', id: '1' },
    { x: 50, y: 50, label: 'Google', id: '2' }
  ])
  return (
    <Layout>
      <ScatterChart width={400} height={400} chartRef={chartRef}>
        <Scatter points={points} setPoints={setPoints} chartRef={chartRef} />
      </ScatterChart>
    </Layout>
  )
}

export default App
