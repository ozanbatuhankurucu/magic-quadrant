import React from 'react'
import styled, { css } from 'styled-components'
import { DARK_GREY, LIGHT_GREY } from '../Services/constants'
import ChartAreaLabel from './ChartAreaLabel'
import Point from './Point'

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

const ScatterChart: React.FC<ScatterChartProps> = ({ children, width, height }) => {
  return (
    <Chart height={height} width={width}>
      <ChartLeftText>Ability To Execute -&gt;</ChartLeftText>
      <ChartAreaLabelContainer width={width} height={height}>
        <ChartAreaLabel positionStart>Challangers </ChartAreaLabel>
        <ChartAreaLabel positionStart>Leaders</ChartAreaLabel>
        <ChartAreaLabel>Niche Players</ChartAreaLabel>
        <ChartAreaLabel> Visionaries</ChartAreaLabel>
      </ChartAreaLabelContainer>
      <Point label='IBM' x={30} y={30} />
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

interface ChartAreaLabelContainerProps {
  width: number
  height: number
}

export default ScatterChart
