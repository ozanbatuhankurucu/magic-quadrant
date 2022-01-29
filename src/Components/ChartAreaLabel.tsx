import React from 'react'
import { LIGHT_BLUE, WHITE } from '../Services/constants'
import styled from 'styled-components'

const Area = styled.div`
  display: flex;
  justify-content: ${(props: ChartAreaLabelProps) =>
    props.positionStart ? 'flex-start' : 'flex-end'};
  flex-direction: column;
  align-items: center;
`
const AreaLabel = styled.span`
  color: ${WHITE};
  background-color: ${LIGHT_BLUE};
  padding: 4px 8px;
  margin-top: ${(props: ChartAreaLabelProps) => (props.positionStart ? '5px' : '0')};
  margin-bottom: ${(props: ChartAreaLabelProps) => (props.positionStart ? '0' : '10px')};
  border-radius: 4px;
`

const ChartAreaLabel: React.FC<ChartAreaLabelProps> = ({ children, positionStart = false }) => {
  return (
    <Area positionStart={positionStart}>
      <AreaLabel positionStart={positionStart}>{children}</AreaLabel>
    </Area>
  )
}

interface ChartAreaLabelProps {
  children: React.ReactNode
  positionStart?: boolean
}

export default ChartAreaLabel
