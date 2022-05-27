import styled from 'styled-components'
import { Card } from '@crosswise/uikit'

export const StyledText = styled.a`
  color: ${({ theme }) => theme.colors.textSubtle};
  border-radius: 4px;
  padding: 3px 8px 5px;
`

export const StyledAccountAreaCard = styled(Card)`
  display: flex;
  align-items: center;
  margin: 0 0 32px 0;
  // align-self: baseline;
  position: relative;
  box-shadow: 1px 4px 44px 1px rgba(0, 0, 0, 0.3);
  border: ${({ theme }) => (theme.isDark ? '1px solid rgba(224, 224, 255, 0.22)' : 'none')};
  border-radius: 23px;
`
