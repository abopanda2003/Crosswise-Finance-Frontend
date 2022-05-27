import styled, { keyframes, css } from 'styled-components'
import { Text } from '@crosswise/uikit'
import { TextBox } from 'components/Texts'

export const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 1000px;
  }
`

export const collapseAnimation = keyframes`
  from {
    max-height: 1000px;
  }
  to {
    max-height: 0px;
  }
`
export const Container = styled.div<{ isDarkTheme: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 20px;
  border: 1px solid rgba(224, 224, 255, 0.24);
  box-shadow: 1px 4px 44px rgba(0, 0, 0, 0.3);
  ${(props) =>
    props.isDarkTheme &&
    css`
      background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.12) 0%,
          rgba(255, 255, 255, 0.06) 45.83%,
          rgba(255, 255, 255, 0) 100%
        ),
        #25272c;
    `}
  ${(props) =>
    !props.isDarkTheme &&
    css`
      background: white;
    `}
`

export const ContentContainer = styled.div<{ expanded?: boolean }>`
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 300ms linear forwards
        `
      : css`
          ${collapseAnimation} 300ms linear forwards
        `};
  overflow: hidden;

  display: ${({ expanded }) => (expanded ? css`flex` : css`none`)};
  flex-direction: column;
  border-top: ${({ expanded }) =>
    expanded
      ? css`
        1px solid rgba(224, 224, 255, 0.24)
      `
      : css`
        none
      `};
`

export const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  padding: 10px 20px;
  padding-bottom: 30px;

  @media (max-width: 650px) {
    flex-direction: column;
  }
`

export const LinksSection = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  @media (max-width: 650px) {
    justify-content: center;
  }
`

export const EarnedContainer = styled.div<{ isDarkTheme: boolean }>`
  display: flex;
  flex: 2;
  padding: 10px;
  justify-content: center;
  algin-items: center;
  align-self: center;
  text-align: center;
  background: rgba(245, 255, 252, 0.1);
  box-shadow: inset 0px 1px 9px rgba(0, 0, 0, 0.85);
  border-radius: 6px;

  ${(props) =>
    props.isDarkTheme
      ? css`
          box-shadow: inset 0px 1px 9px rgba(0, 0, 0, 0.85);
        `
      : css`
          box-shadow: inset 0px 1px 9px rgba(0, 0, 0, 0.15);
        `}

  @media (max-width: 380px) {
    flex-direction: column;
    gap: 20px;
  }
`

export const EarnedBox = styled.div`
  display: flex;
  flex: 1;
  padding: 10px 30px;
  justify-content: center;
  flex-direction: column;
`

export const Divider = styled.div`
  width: 1px;
  background-color: #c4c4c4;
  opacity: 0.1;

  @media (max-width: 380px) {
    width: 100%;
    height: 1px;
  }
`

export const WithdrawBtnSection = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 650px) {
    justify-content: center;
  }
`

export const BlankLink = styled.a``

export const ResponsiveTextBox = styled(TextBox)`
  @media (max-width: 650px) {
    justify-content: center;
  }
`

export const OverViewContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
  padding: 10px 20px;
`

export const BlankFlex = styled.div`
  display: flex;
  flex: 1;

  @media (max-width: 800px) {
    display: none;
  }
`

export const MainOverViewContainer = styled.div`
  display: flex;
  flex: 3;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: 650px) {
    flex-direction: column;
    gap: 20px;
  }
`

export const OverViewItem = styled.div<{ alignItems?: string }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  ${(props) =>
    props.alignItems &&
    css`
      align-items: ${props.alignItems};
    `}

  @media (max-width: 650px) {
    justify-content: center;
    align-items: center;
  }
`

export const FlexText = styled(Text)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`
