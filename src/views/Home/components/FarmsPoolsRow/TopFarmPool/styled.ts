import styled from 'styled-components'
import { Flex } from '@crosswise/uikit'

export const StyledWrapper = styled(Flex)<{ index: number }>`
  position: relative;
`

export const AbsoluteWrapper = styled(Flex)<{ visible: boolean; index: number; topOffset: string }>`
  position: absolute;
  top: ${({ topOffset }) => topOffset};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  margin-top: ${({ visible }) => (visible ? 0 : `50%`)};
  transition: opacity, margin-top, 0.4s ease-out;
  flex-direction: column;

  ${({ index, theme }) =>
    index > 0
      ? `
         ${theme.mediaQueries.sm} {
           height: 80px;
           top: 0;
           padding-left: 16px;
           border-left: 1px ${theme.colors.inputSecondary} solid;
         }
       `
      : `padding-right: 16px;`}
`
