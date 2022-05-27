import styled from 'styled-components'
import { Box } from '@crosswise/uikit'

export const Grid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr) auto;
`
