import styled from 'styled-components'
import { Modal } from '@crosswise/uikit'

export const StyledModal = styled(Modal)`
  min-width: 280px;
  max-width: 320px;
  max-height: 552px;

  & div:nth-child(2) {
    padding: 0;
  }
`

export const ScrollableContainer = styled.div`
  height: 310px;
  overflow-y: scroll;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.cardBorder}`};
  padding: 24px;
`
