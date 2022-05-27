import styled from 'styled-components'

export const TicketImage = styled.img`
  height: 60px;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 100px;
  }
`

export const TornTicketImage = styled.img`
  height: 54px;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 84px;
  }
`
