import React, { useCallback, useEffect, useMemo, useState, lazy } from 'react'
import { Input, Box, Flex, Text, Dropdown, DropdownItem, useTable, ColumnType, DataType } from '@crosswise/uikit'
import { formatNumber } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
import TokenInfo from './TokenInfo'
import { StyledCard } from '../shared'
import { CardBody, TabView, TabViewItemWrapper, TabViewItem, TokenView } from './styled'
import { TokenPriceDataType } from './types'

const data: TokenPriceDataType[] = [
  {
    token: 'CryptoPlanes',
    address: '0x25E9d05365c867E59C1904E7463Af9F312296f9E',
    changePercent: 250.5,
  },
  {
    token: 'BEAGLE INU',
    address: '0x27DF46ddd86D9b7afe3ED550941638172eB2e623',
    changePercent: 150.5,
  },
  {
    token: 'HayFever',
    address: '0x1796ae0b0fa4862485106a0de9b654eFE301D0b2',
    changePercent: 50.5,
  },
  {
    token: 'CryptoPlanes',
    address: '0x25E9d05365c867E59C1904E7463Af9F312296f9E',
    changePercent: 250.5,
  },
  {
    token: 'BEAGLE INU',
    address: '0x27DF46ddd86D9b7afe3ED550941638172eB2e623',
    changePercent: 150.5,
  },
  {
    token: 'HayFever',
    address: '0x1796ae0b0fa4862485106a0de9b654eFE301D0b2',
    changePercent: 50.5,
  },
  {
    token: 'CryptoPlanes',
    address: '0x25E9d05365c867E59C1904E7463Af9F312296f9E',
    changePercent: 250.5,
  },
  {
    token: 'BEAGLE INU',
    address: '0x27DF46ddd86D9b7afe3ED550941638172eB2e623',
    changePercent: 0,
  },
  {
    token: 'HayFever',
    address: '0x1796ae0b0fa4862485106a0de9b654eFE301D0b2',
    changePercent: -50.5,
  },
]

export default function TokenCard() {
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

  const [currentView, setCurrentView] = useState<string>(viewOpt[0].value)
  const [tokenData, setTokenData] = useState<TokenPriceDataType[]>(data)

  return (
    <StyledCard>
      <CardBody>
        <TabView>
          {viewOpt.map((item) => (
            <TabViewItemWrapper key={`tabview-item-${item.value}`}>
              <TabViewItem active={currentView === item.value} onClick={() => setCurrentView(item.value)}>
                {item.label}
              </TabViewItem>
            </TabViewItemWrapper>
          ))}
        </TabView>
        <TokenView>
          {tokenData.map((token, index) => (
            <TokenInfo
              key={`token-${token.token}`}
              token={token.token}
              address={token.address}
              rank={index + 1}
              percent={token.changePercent}
            />
          ))}
        </TokenView>
      </CardBody>
    </StyledCard>
  )
}
