import styled from 'styled-components'
import { Card, Text } from '@crosswise/uikit'

export const StyledLotteryCard = styled(Card)`
  background-image: url('/images/home/planets/solid-2.png'), url('/images/home/planets/solid.png');
  background-repeat: no-repeat;
  background-position: top 16px right 16px, top 16px right 151px;
  margin: 0 0 32px 0;
  align-self: baseline;
  position: relative;
  box-shadow: 1px 4px 44px 1px rgba(0, 0, 0, 0.3);
  border: ${({ theme }) => (theme.isDark ? '1px solid rgba(224, 224, 255, 0.22)' : 'none')};
  border-radius: 23px;
  position: relative;
`
export const StyledComingSoonCard = styled.div`
  position: absolute;
  top: -48px;
  right: -48px;
`
export const StyledText = styled.a`
  color: ${({ theme }) => theme.colors.textSubtle};
`

export const Block = styled.div`
  margin-bottom: 32px;
`

export const Label = styled(Text)``

export const Actions = styled.div`
  display: flex;
  margin-top: 24px;
  justify-content: flex-end;
`
