import React from 'react'
import styled, { css } from 'styled-components'
import { DARK_GREY, LIGHT_GREY } from '../../Services/constants'
import { ScatterChartProps, ChartProps } from './ScatterChart.types'

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
`

const ChartRightText = styled.span`
  ${sharedCharTextStyle}
`

const ScatterChart: React.FC<ScatterChartProps> = ({ children, width, height }) => {
  return (
    <Chart height={height} width={width}>
      <ChartLeftText>Ability To Execute --&gt;</ChartLeftText>
      <ChartRightText>Completeness Of Vision --&gt;</ChartRightText>
    </Chart>
  )
}

export default ScatterChart
