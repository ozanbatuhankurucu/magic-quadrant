import React, { useEffect, useRef } from 'react'
import { DARK_BLUE, BLACK } from '../Services/constants'
import styled from 'styled-components'

const OuterDot = styled.div`
  position: absolute;
  bottom: ${(props: PointContainerProps) => props.y * 4 - 20}px;
  left: ${(props: PointContainerProps) => props.x * 4 - 24}px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid ${BLACK};
  display: none;
`

const Dot = styled.div`
  position: absolute;
  bottom: ${(props: PointContainerProps) => props.y * 4}px;
  left: ${(props: PointContainerProps) => props.x * 4}px;
  cursor: pointer;
  width: 15px;
  height: 15px;
  background-color: ${DARK_BLUE};
  border-radius: 50%;
`

const PointLabel = styled.span`
  position: absolute;
  bottom: ${(props: PointContainerProps) => props.y * 4 - 15}px;
  left: ${(props: PointContainerProps) => props.x * 4 + 15}px;
  font-size: 13px;
  font-family: sans-serif;
  color: ${DARK_BLUE};
`

const Point: React.FC<PointProps> = ({ x, y, label }) => {
  // useRef is a hook that lets you store a reference to a DOM element
  // if we use useRef, place of ref element on RAM is unchangeable after every rerender.
  let outerDotRef = useRef<HTMLDivElement | null>(null)

  return (
    <>
      <OuterDot ref={outerDotRef} id='outerDot' x={x} y={y} />
      <Dot
        onMouseOver={() => {
          if (outerDotRef && outerDotRef.current) {
            outerDotRef.current.style.display = 'block'
          }
        }}
        onMouseLeave={() => {
          if (outerDotRef && outerDotRef.current) {
            outerDotRef.current.style.display = 'none'
          }
        }}
        x={x}
        y={y}
      />
      <PointLabel x={x} y={y}>
        {label}
      </PointLabel>
    </>
  )
}
interface PointProps {
  x: number
  y: number
  label: string
}

interface PointContainerProps {
  x: number
  y: number
}
export default Point
