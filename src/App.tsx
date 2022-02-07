import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import Layout from './Components/Layout'
import ScatterChart from './Components/ScatterChart'
import Scatter from './Components/Scatter'
import { PointType } from './Services/commonTypes'
import ChartTable from './Components/ChartTable'

const ScatterRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`

function App() {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const [points, setPoints] = useState<PointType[]>(handlePointsFromLocalStorage)

  function handlePointsFromLocalStorage(): PointType[] {
    const pointsFromLocalStorage = JSON.parse(localStorage.getItem('points') || '[]')
    return pointsFromLocalStorage
  }

  const handlePointChange = (event: React.ChangeEvent<HTMLInputElement>, pointId: string): void => {
    const { name, value } = event.target
    const newPoints = points.map((point: PointType) => {
      if (point.id === pointId) {
        if (name === 'x' || name === 'y') {
          if (+value <= 100 && +value >= 0) {
            // casting value to number
            return {
              ...point,
              [name]: +value
            }
          }
        } else {
          return {
            ...point,
            [name]: value
          }
        }
      }
      return point
    })

    localStorage.setItem('points', JSON.stringify(newPoints))
    setPoints(newPoints)
  }

  const addNewPoint = (): void => {
    const newPoint = { x: 50, y: 50, label: 'New', id: Math.random().toString() }
    localStorage.setItem('points', JSON.stringify([...points, newPoint]))
    setPoints((prevPoints: PointType[]): PointType[] => [...prevPoints, newPoint])
  }

  const deletePoint = (pointId: string): void => {
    const newPoints = points.filter((point: PointType) => point.id !== pointId)
    localStorage.setItem('points', JSON.stringify(newPoints))
    setPoints(newPoints)
  }

  useEffect(() => {
    localStorage.setItem('points', JSON.stringify(points))
  }, [points])

  return (
    <Layout>
      <ScatterRow>
        <ScatterChart width={400} height={400} chartRef={chartRef}>
          <Scatter points={points} setPoints={setPoints} chartRef={chartRef} />
        </ScatterChart>
        <ChartTable
          points={points}
          handlePointChange={handlePointChange}
          addNewPoint={addNewPoint}
          deletePoint={deletePoint}
        />
      </ScatterRow>
    </Layout>
  )
}

export default App
