import React, { useRef } from 'react'
import { useTable, Button, ChevronUpIcon, ColumnType } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import Row, { RowProps } from '../Row'
import { Container, TableWrapper, StyledTable, TableBody, ScrollButtonContainer, TableContainer } from './styled'

export interface ITableProps {
  data: RowProps[]
  columns: ColumnType<RowProps>[]
  userDataReady: boolean
  sortColumn?: string
}

const FarmTable: React.FC<ITableProps> = (props) => {
  const tableWrapperEl = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()
  const { data, columns, userDataReady } = props

  const { rows } = useTable(columns, data, { sortable: true, sortColumn: 'farm' })

  const scrollToTop = (): void => {
    tableWrapperEl.current.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <Container>
      <TableContainer>
        <TableWrapper ref={tableWrapperEl}>
          <StyledTable>
            <TableBody>
              {rows.map((row, index) => {
                return (
                  <Row
                    {...row.original}
                    index={index}
                    farmOption={data[index]?.farmOption}
                    userDataReady={userDataReady}
                    key={`table-row-${row.id}`}
                  />
                )
              })}
            </TableBody>
          </StyledTable>
        </TableWrapper>
        <ScrollButtonContainer>
          <Button variant="text" onClick={scrollToTop}>
            {t('To Top')}
            <ChevronUpIcon color="primary" />
          </Button>
        </ScrollButtonContainer>
      </TableContainer>
    </Container>
  )
}

export default FarmTable
