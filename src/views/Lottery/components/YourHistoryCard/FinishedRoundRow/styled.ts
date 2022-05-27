import styled from 'styled-components'
import { Box, SmallDotIcon } from '@crosswise/uikit'

export const Grid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr) auto;
  margin-bottom: 8px;
  cursor: pointer;
`

export const StyledSmallDotIcon = styled(SmallDotIcon)`
  path {
    fill: ${({ theme }) => theme.colors.textDisabled};
  }
`
