import styled from 'styled-components'
import { Flex, Heading } from '@crosswise/uikit'

export const StyledTimerFlex = styled(Flex)<{ showTooltip?: boolean }>`
  ${({ theme, showTooltip }) => (showTooltip ? ` border-bottom: 1px dashed ${theme.colors.textSubtle};` : ``)}
  div:last-of-type {
    margin-right: 0;
  }
`

export const StyledTimerText = styled(Heading)`
  background: ${({ theme }) => theme.colors.gradients.blue};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
