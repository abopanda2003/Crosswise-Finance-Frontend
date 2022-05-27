import styled from 'styled-components'
import { Card } from '@crosswise/uikit'

export const StyledCard = styled(Card)`
  width: 100%;
  flex: 1;
  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 240px;
  }
`
