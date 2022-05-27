import styled from 'styled-components'
import { Card, Text } from '@crosswise/uikit'

export const StyledLiquidityCard = styled(Card)`
  background-image: url('/images/home/jupiter/planet-jupiter.png');
  background-repeat: no-repeat;
  background-position: bottom left 40px;
  // min-height: 376px;
  margin: 0 0 32px 0;
  align-self: baseline;
  position: relative;
  box-shadow: 1px 4px 44px 1px rgba(0, 0, 0, 0.3);
  border: ${({ theme }) => (theme.isDark ? '1px solid rgba(224, 224, 255, 0.22)' : 'none')};
  border-radius: 23px;
`

export const StyledText = styled.a`
  color: ${({ theme }) => theme.colors.textSubtle};
`

export const Block = styled.div`
  margin-bottom: 16px;
  display: flex;
`

export const Label = styled(Text)``
