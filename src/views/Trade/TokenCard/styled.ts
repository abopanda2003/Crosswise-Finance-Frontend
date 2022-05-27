import styled from 'styled-components'
import { Flex, Text } from '@crosswise/uikit'

export const CardBody = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;
`

export const TabView = styled(Flex)``

export const TabViewItemWrapper = styled.div`
  width: 100%;
  margin: 0.5rem 0;
`

export const TabViewItem = styled.span<{ active?: boolean }>`
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0.04em;
  text-transform: capitalize;
  padding-bottom: 5px;
  color: ${({ active, theme }) => (active ? theme.colors.greenPalette.main : theme.colors.primaryGray)};
  ${({ active, theme }) => active && `border-bottom: 1px solid ${theme.colors.greenPalette.main};`}
  cursor: pointer;
`

export const TokenView = styled(Flex)`
  flex-wrap: wrap;
`

export const TokenItem = styled(Flex)`
  width: 33.3%;
  padding: 8px 10px 8px 0px;
`
