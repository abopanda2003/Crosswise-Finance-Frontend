import styled from 'styled-components'
import { Pool } from 'state/types'
import BaseCell from '../BaseCell'

interface EarningsCellProps {
  pool: Pool
  account: string
  userDataLoaded: boolean
}

export const StyledCell = styled(BaseCell)`
  flex: 4.5;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex: 1 0 120px;
  }
`

export const HelpIconWrapper = styled.div`
  align-self: center;
`
