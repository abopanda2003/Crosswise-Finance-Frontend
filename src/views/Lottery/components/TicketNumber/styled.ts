import { Flex } from '@crosswise/uikit'
import styled from 'styled-components'
import _uniqueId from 'lodash/uniqueId'

export const StyledNumberWrapper = styled(Flex)`
  position: relative;
  padding: 4px 16px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radii.default};
  background: ${({ theme }) => theme.colors.background};
  justify-content: space-between;
`

export const RewardHighlighter = styled.div<{ numberMatches: number }>`
  z-index: 1;
  width: ${({ numberMatches }) => `${numberMatches < 6 ? numberMatches * 17.66 : 100}%`};
  height: 34px;
  border-radius: ${({ theme }) => theme.radii.default};
  top: 0;
  left: 0;
  position: absolute;
  border: 2px ${({ theme }) => theme.colors.primary} solid;
`
