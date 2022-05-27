import styled from 'styled-components'
import { Link } from '@crosswise/uikit'
import Balance from 'components/Balance'

export const StyledLink = styled(Link)`
  width: 100%;
`

export const StyledBalance = styled(Balance)`
  background: ${({ theme }) => theme.colors.gradients.blue};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
