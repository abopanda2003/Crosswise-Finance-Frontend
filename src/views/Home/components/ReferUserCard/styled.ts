import styled from 'styled-components'
import { Card, Text } from '@crosswise/uikit'

export const StyledReferUserCard = styled(Card)`
  background-image: url('/images/home/jupiter/planet-jupiter.png');
  background-repeat: no-repeat;
  background-position: bottom left 40px;
  // min-height: 376px;
  margin: 0 0 32px 0;
  // align-self: baseline;
  position: relative;
  box-shadow: 1px 4px 44px 1px rgba(0, 0, 0, 0.3);
  border: ${({ theme }) => (theme.isDark ? '1px solid rgba(224, 224, 255, 0.22)' : 'none')};
  border-radius: 23px;
  padding-top: 25px;
`

export const Label = styled(Text)``

export const Actions = styled.div`
  display: flex;
  margin-top: 72px;
  justify-content: flex-start;
`
