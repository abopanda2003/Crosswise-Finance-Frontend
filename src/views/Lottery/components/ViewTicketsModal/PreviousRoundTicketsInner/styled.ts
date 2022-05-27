import { Box, Flex } from '@crosswise/uikit'
import styled from 'styled-components'

export const TopBox = styled(Flex)`
  flex-direction: column;
  margin: -24px;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.dropdown};
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
`

export const ScrollBox = styled(Box)`
  margin-right: -20px;
  padding-right: 24px;
  max-height: 300px;
  overflow-y: scroll;
  margin-top: 24px;
`
