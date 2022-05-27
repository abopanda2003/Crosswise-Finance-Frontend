import styled from 'styled-components'
import { IconButton } from '@crosswise/uikit'

export const Container = styled.div`
  margin-right: 0px;
  // margin-left: -8px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 16px;
    margin-right: 16px;
  }
`

export const StyledIconButton = styled(IconButton)`
  margin: 0 8px 0 0;
  padding: 10px 24px;
`
