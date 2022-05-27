import styled from 'styled-components'
import { Card, Text } from '@crosswise/uikit'
import Row from 'components/Layout/Row'
import Column from 'components/Layout/Column'

export const StyledBreakDownCard = styled(Card)`
  background-image: url('/images/home/jupiter/planet-jupiter.png');
  background-repeat: no-repeat;
  background-position: bottom left 40px;
  margin: 0 0 32px 0;
  align-self: baseline;
  position: relative;
  box-shadow: 1px 4px 44px 1px rgba(0, 0, 0, 0.3);
  border: ${({ theme }) => (theme.isDark ? '1px solid rgba(224, 224, 255, 0.22)' : 'none')};
  border-radius: 23px;
  // min-height: 376px;
`

export const StyledText = styled.a`
  color: ${({ theme }) => theme.colors.textSubtle};
`

export const StyledRow = styled(Row)`
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 22px;
`

export const StyledColumn = styled(Column)`
  width: 33.3%;
`

export const Label = styled(Text)``
