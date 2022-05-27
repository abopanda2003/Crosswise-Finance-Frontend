import styled from 'styled-components'
import { Box, Flex, Card, NoProfileAvatarIcon } from '@crosswise/uikit'

export const Desktop = styled(Flex)`
  align-items: center;
  display: none;
  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
  }
`

export const Mobile = styled(Flex)`
  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`

export const Sticker = styled(Flex)`
  height: 92px;
  width: 92px;
  background-color: ${({ theme }) => theme.colors.invertedContrast};
  border: 3px solid ${({ theme }) => theme.colors.invertedContrast};
  border-radius: ${({ theme }) => theme.radii.circle};
  box-shadow: ${({ theme }) => theme.card.boxShadow};
`

export const StyledNoProfileAvatarIcon = styled(NoProfileAvatarIcon)`
  height: 100%;
  width: 100%;
`
