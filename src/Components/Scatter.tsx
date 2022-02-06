import React from 'react'
import Point from './Point'
import { PointType } from '../Services/commonTypes'

const Scatter: React.FC<ScatterProps> = ({ points, setPoints, chartRef }): React.ReactElement => {
  const handleDragEnter = (e: React.DragEvent<HTMLSpanElement>, pointId: string): void => {
    e.preventDefault()
    e.stopPropagation()
    const current = chartRef.current
    if (current) {
      const bottom: number = Math.floor(
        100 - ((e.pageY - Number(current.getBoundingClientRect().top)) * 100) / 400
      )
      const left: number = Math.floor(
        ((e.pageX - Number(current.getBoundingClientRect().left)) * 100) / 400
      )
      changePointValue(left, bottom, pointId)
    }
  }

  const changePointValue = (left: number, bottom: number, pointId: string): void => {
    if (left > 100 || left < 0 || bottom > 100 || bottom < 0) return
    setPoints((prevPoints: PointType[]): PointType[] => {
      return prevPoints.map((point: PointType) =>
        point.id === pointId ? { ...point, x: left, y: bottom } : point
      )
    })
  }
  return (
    <>
      {points.map((point: PointType) => {
        const { x, y, label, id } = point
        return (
          <Point
            key={id}
            label={label}
            x={x}
            y={y}
            handleDragEnter={(e) => handleDragEnter(e, id)}
          />
        )
      })}
    </>
  )
}

interface ScatterProps {
  chartRef: React.RefObject<HTMLDivElement>
  points: PointType[]
  setPoints: React.Dispatch<React.SetStateAction<PointType[]>>
}

export default Scatter
