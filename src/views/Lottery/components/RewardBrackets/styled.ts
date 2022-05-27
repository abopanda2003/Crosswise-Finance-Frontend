import { Flex } from '@crosswise/uikit'
import styled from 'styled-components'

export const Wrapper = styled(Flex)`
  width: 100%;
  flex-direction: column;
`

export const RewardsInner = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  row-gap: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(4, 1fr);
  }
`
