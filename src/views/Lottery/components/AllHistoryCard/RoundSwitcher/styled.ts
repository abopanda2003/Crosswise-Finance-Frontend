import styled from 'styled-components'
import { IconButton, Input } from '@crosswise/uikit'

export const StyledInput = styled(Input)`
  width: 60px;
  height: 100%;
  padding: 4px 16px;
`

export const StyledIconButton = styled(IconButton)`
  width: 32px;

  :disabled {
    background: none;

    svg {
      fill: ${({ theme }) => theme.colors.textDisabled};

      path {
        fill: ${({ theme }) => theme.colors.textDisabled};
      }
    }
  }
`
