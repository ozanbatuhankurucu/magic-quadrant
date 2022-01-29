import React from 'react'
import styled, { css } from 'styled-components'
import { DARK_GREY, LIGHT_BLUE, LIGHT_GREY, WHITE } from '../Services/constants'

const Chart = styled.div`
  position: relative;
  display: flex;
  width: ${(props: ChartProps) => props.width}px;
  height: ${(props: ChartProps) => props.height}px;
  border: 2px solid ${DARK_GREY};
  &:after {
    content: '';
    border: 2px solid ${LIGHT_GREY};
    display: flex;
    width: 98%;
    position: absolute;
    bottom: 50%;
  }
  &:before {
    content: '';
    border: 2px solid ${LIGHT_GREY};
    display: flex;
    width: 98%;
    position: absolute;
    bottom: 50%;
    transform: rotate(90deg);
  }
`

const sharedCharTextStyle = css`
  font-size: 16px;
  font-weight: 500;
  font-family: sans-serif;
  color: ${DARK_GREY};
`
const ChartLeftText = styled.span`
  ${sharedCharTextStyle}
  position: absolute;
  bottom: 70px;
  left: -90px;
  transform: rotate(-90deg);
`

const ChartRightText = styled.span`
  ${sharedCharTextStyle}
  position: absolute;
  bottom: -25px;
`

const ChartAreaLabelContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props: ChartAreaLabelContainerProps) =>
    `${props.width / 2}px ${props.width / 2}px`};
  grid-template-rows: ${(props: ChartAreaLabelContainerProps) =>
    `${props.width / 2}px ${props.width / 2}px`};
  position: absolute;
`

const Area = styled.div`
  display: flex;
  justify-content: ${(props: AreaProps) => (props.positionStart ? 'flex-start' : 'flex-end')};
  flex-direction: column;
  align-items: center;
`
const AreaLabel = styled.span`
  color: ${WHITE};
  background-color: ${LIGHT_BLUE};
  padding: 4px 8px;
  margin-top: ${(props: AreaProps) => (props.positionStart ? '5px' : '0')};
  margin-bottom: ${(props: AreaProps) => (props.positionStart ? '0' : '10px')};
  border-radius: 4px;
`

const ScatterChart: React.FC<ScatterChartProps> = ({ children, width, height }) => {
  return (
    <Chart height={height} width={width}>
      <ChartLeftText>Ability To Execute -&gt;</ChartLeftText>
      <ChartAreaLabelContainer width={width} height={height}>
        <Area positionStart>
          <AreaLabel positionStart>Challangers</AreaLabel>
        </Area>
        <Area positionStart>
          <AreaLabel positionStart>Leaders</AreaLabel>
        </Area>
        <Area>
          <AreaLabel positionStart={false}>Niche Players</AreaLabel>
        </Area>
        <Area>
          <AreaLabel positionStart={false}>Visionaries</AreaLabel>
        </Area>
      </ChartAreaLabelContainer>
      <ChartRightText>Completeness Of Vision -&gt;</ChartRightText>
    </Chart>
  )
}

interface ScatterChartProps {
  children?: React.ReactNode
  data?: any
  width: number
  height: number
}

interface ChartProps {
  width: number
  height: number
}
interface AreaProps {
  positionStart?: boolean
}
interface ChartAreaLabelContainerProps {
  width: number
  height: number
}

export default ScatterChart
