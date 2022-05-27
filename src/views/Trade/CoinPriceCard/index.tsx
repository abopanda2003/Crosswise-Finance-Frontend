import React, { useCallback, useEffect, useMemo, useState, lazy } from 'react'
import { Input, Box, Flex, Text, Dropdown, DropdownItem, useTable, ColumnType, DataType } from '@crosswise/uikit'
import { formatNumber } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
import TokenInfo from './TokenInfo'
import { StyledCard } from '../shared'
import { CardHeader, CardBody, StyledTD, StyledTH } from './styled'
import { CoinPriceDataType } from './types'

const Table = <T extends DataType>({ columns, data }: { columns: ColumnType<T>[]; data: T[] }) => {
  const { headers, rows } = useTable(columns, data, {
    sortable: true,
  })

  return (
    <table width="100%">
      <thead>
        <tr>
          {headers.map((header) => (
            <StyledTH key={`header-${header.name}`} data-testid={`column-${header.name}`}>
              {header.render()}

              {header.sorted && header.sorted.on ? <span data-testid={`sorted-${header.name}`} /> : null}
            </StyledTH>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr data-testid={`row-${row.id}`} key={row.id}>
            {row.cells.map((cell) => (
              <StyledTD>{cell.render()}</StyledTD>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const data: CoinPriceDataType[] = [
  {
    rank: 1,
    token: 'BNB',
    volume: 13300000,
    price: 4000,
    changeInDay: 3.48,
    changeInWeek: 3.48,
  },
  {
    rank: 2,
    token: 'Arbitrum',
    volume: 13300000,
    price: 4000,
    changeInDay: 3.48,
    changeInWeek: 3.48,
  },
  {
    rank: 3,
    token: 'Ethereum',
    volume: 13300000,
    price: 4000,
    changeInDay: 3.48,
    changeInWeek: 3.48,
  },
  {
    rank: 4,
    token: 'Optimism',
    volume: 13300000,
    price: 4000,
    changeInDay: 3.48,
    changeInWeek: 3.48,
  },
  {
    rank: 5,
    token: 'Polygon',
    volume: 13300000,
    price: 4000,
    changeInDay: 3.48,
    changeInWeek: 3.48,
  },
]

export default function CoinPriceCard() {
  const { t } = useTranslation()
  const viewOpt = [
    {
      label: t('Top Gainers'),
      value: 'gainer',
    },
    {
      label: t('Top Losers'),
      value: 'loser',
    },
    {
      label: t('Featured'),
      value: 'featured',
    },
  ]

  const [searchValue, setSearchValue] = useState('')
  const [currentView, setCurrentView] = useState<DropdownItem>(viewOpt[0])

  const columns: ColumnType<CoinPriceDataType>[] = [
    {
      name: 'rank',
      label: t('Rank'),
      sort: (a, b) => a.original.rank - b.original.rank,
      headerRender: ({ label }) => <Box style={{ textAlign: 'left' }}>{label}</Box>,
    },
    {
      name: 'token',
      label: t('Token'),
      headerRender: ({ label }) => <Box style={{ textAlign: 'left' }}>{label}</Box>,
      render: ({ value, row }) => <TokenInfo token={row.token} />,
    },
    {
      name: 'volume',
      label: t('Volume (24H)'),
      render: ({ value }) => (
        <Text fontSize="15px" fontWeight="600" letterSpacing="0.04em" textAlign="center">
          ${formatNumber(value, 0)}
        </Text>
      ),
    },
    {
      name: 'price',
      label: t('Price'),
      render: ({ value }) => (
        <Text fontSize="15px" fontWeight="600" letterSpacing="0.04em" textAlign="center">
          ${formatNumber(value, 0)}
        </Text>
      ),
    },
    {
      name: 'changeInDay',
      label: t('24 Hours'),
      render: ({ value }) => (
        <Text fontSize="15px" fontWeight="600" letterSpacing="0.04em" textAlign="center">
          {value}%
        </Text>
      ),
    },
    {
      name: 'changeInWeek',
      label: t('7 days'),
      headerRender: ({ label }) => <Box style={{ textAlign: 'right' }}>{label}</Box>,
      render: ({ value }) => (
        <Text fontSize="15px" fontWeight="600" letterSpacing="0.04em" textAlign="end">
          {value}%
        </Text>
      ),
    },
  ]

  const filteredData = useMemo(
    () => data.filter((item) => item.token.toLowerCase().includes(searchValue.toLowerCase())),
    [searchValue],
  )

  return (
    <StyledCard>
      <CardHeader>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="16px" fontWeight="700">
            {currentView.label}
          </Text>
          <Box width="100%" maxWidth="680px" mx="20px">
            <Input
              type="search"
              scale="lg"
              placeholder="Search"
              mx="auto"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Box>
          <Dropdown list={viewOpt} current={currentView} placement="bottom" onClickItem={setCurrentView} />
        </Flex>
      </CardHeader>
      <CardBody>
        <Table columns={columns} data={filteredData} />
      </CardBody>
    </StyledCard>
  )
}
