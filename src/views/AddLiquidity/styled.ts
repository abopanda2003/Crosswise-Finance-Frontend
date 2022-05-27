import styled from 'styled-components'
import { Card } from '@crosswise/uikit'

export const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;

    > div {
      padding: 0;
    }
  }
`

export const StyledCard = styled(Card)`
  background: none;
  width: 100%;
  height: 100%;
  z-index: 1;
`
