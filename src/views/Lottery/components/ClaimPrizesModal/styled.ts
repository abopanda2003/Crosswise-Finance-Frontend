import styled from 'styled-components'
import { ModalContainer, ModalHeader } from '@crosswise/uikit'

export const StyledModal = styled(ModalContainer)`
  position: relative;
  overflow: visible;

  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 380px;
  }
`

export const StyledModalHeader = styled(ModalHeader)`
  background: ${({ theme }) => theme.colors.gradients.cardHeader};
  border-top-right-radius: 32px;
  border-top-left-radius: 32px;
`

export const BunnyDecoration = styled.div`
  position: absolute;
  top: -116px; // line up bunny at the top of the modal
  left: 0px;
  text-align: center;
  width: 100%;
`
