import React, { useRef } from 'react'
import { DARK_BLUE, BLACK } from '../Services/constants'
import styled from 'styled-components'

const PointerContainer = styled.span`
  position: absolute;
  bottom: ${(props: PointContainerProps) => props.y * 4 * 0.9}px;
  left: ${(props: PointContainerProps) => props.x * 4 * 0.95}px;
  z-index: 1;
`

const OuterDot = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid ${BLACK};
  // display: none;
`

const Dot = styled.div`
  cursor: pointer;
  width: 15px;
  height: 15px;
  background-color: ${(props: DotProps) => props.dotColor};
  border-radius: 50%;
`

const PointLabel = styled.span`
  font-size: 13px;
  font-family: sans-serif;
  color: ${DARK_BLUE};
`

const Point: React.FC<PointProps> = ({
  x,
  y,
  label,
  handleDragEnter,
  isChecked
}): React.ReactElement => {
  // useRef is a hook that lets you store a reference to a DOM element
  // by using useRef here, place of ref element on RAM is unchangeable after every rerender.
  let outerDotRef = useRef<HTMLDivElement | null>(null)

  return (
    <PointerContainer
      draggable={true}
      onDrag={(e: React.DragEvent<HTMLSpanElement>) => handleDragEnter(e)}
      x={x}
      y={y}>
      {/* <OuterDot ref={outerDotRef} id='outerDot' x={x} y={y} /> */}
      <Dot
        id='dot'
        dotColor={isChecked ? '#ece4db' : DARK_BLUE}
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
      />
      <div
        style={{
          border: '1px dashed red',
          position: 'absolute',
          width: x * 4,
          transform: 'rotate(deg)',
          right: 15,
          top: 5
        }}
      />
      <div
        style={{
          border: '1px dashed red',
          position: 'absolute',
          width: y * 4,
          transform: 'rotate(90deg)',
          transformOrigin: 'top left',
          left: 10,
          top: 5
        }}
      />
      <PointLabel>{label}</PointLabel>
    </PointerContainer>
  )
}
interface PointProps {
  x: number
  y: number
  label: string
  handleDragEnter: (e: React.DragEvent<HTMLSpanElement>) => void
  isChecked: boolean
}

interface PointContainerProps {
  x: number
  y: number
}

interface DotProps {
  dotColor: string
}
export default Point
