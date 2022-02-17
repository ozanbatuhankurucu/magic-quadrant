import React from 'react'
import styled, { css } from 'styled-components'
import { LIGHT_GREY, DARK_GREY, WHITE, LIGHT_BLUE } from '../Services/constants'
import { PointType } from '../Services/commonTypes'

const Table = styled.table`
  margin-left: 16px;
  text-align: center;
`

const CommonCssButton = css`
  background-color: ${LIGHT_GREY};
  padding: 6px 8px;
  border: 0;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: ${DARK_GREY};
  }
`

const AddButton = styled.button`
  ${CommonCssButton}
  float: left;
`

const DeleteButton = styled.button`
  ${CommonCssButton}
  width: 100%;
`

const TableHeaderRow = styled.tr`
  background-color: ${LIGHT_BLUE};
  color: ${WHITE};
`

const Input = styled.input`
  border: 2px solid ${LIGHT_GREY};
  border-radius: 5px;
  padding: 4px 8px;
  width: 100%;
`

const TableData = styled.td`
  border-radius: 3px;
  padding: ${(props: TableDataProps) => (props.withPadding ? '2px 12px' : '0')};
`

const ChartTable: React.FC<ChartTableProps> = ({
  points,
  handlePointChange,
  addNewPoint,
  deletePoint,
  checkPoint
}) => {
  return (
    <Table>
      <tbody>
        <tr>
          <TableData>
            <AddButton className='AdditionButton' onClick={addNewPoint}>
              Add
            </AddButton>
          </TableData>
        </tr>
        <TableHeaderRow>
          <TableData withPadding>Checked</TableData>
          <TableData withPadding>Label</TableData>
          <TableData withPadding>Vision</TableData>
          <TableData withPadding>Ability</TableData>
          <TableData withPadding>Delete</TableData>
        </TableHeaderRow>
      </tbody>
      <tbody>
        {points.map((point: PointType) => {
          const { id, label, x: vision, y: ability, isChecked } = point

          return (
            <tr key={id}>
              <TableData>
                <Input
                  type='checkbox'
                  name='vehicle1'
                  checked={isChecked}
                  onChange={() => checkPoint(id, !isChecked)}
                />
              </TableData>
              <TableData>
                <Input
                  type='text'
                  name='label'
                  value={label}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handlePointChange(event, id)
                  }
                />
              </TableData>
              <TableData>
                <Input
                  type='number'
                  name='x'
                  max={100}
                  min={0}
                  value={vision.toString()}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handlePointChange(event, id)
                  }
                />
              </TableData>
              <TableData>
                <Input
                  type='number'
                  name='y'
                  max={100}
                  min={0}
                  value={ability.toString()}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handlePointChange(event, id)
                  }
                />
              </TableData>
              <TableData>
                <DeleteButton onClick={() => deletePoint(id)}>Delete</DeleteButton>
              </TableData>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

interface ChartTableProps {
  points: PointType[]
  handlePointChange: (event: React.ChangeEvent<HTMLInputElement>, pointId: string) => void
  addNewPoint: () => void
  deletePoint: (pointId: string) => void
  checkPoint: (pointId: string, isChecked: boolean) => void
}

interface TableDataProps {
  withPadding?: boolean
}

export default ChartTable
