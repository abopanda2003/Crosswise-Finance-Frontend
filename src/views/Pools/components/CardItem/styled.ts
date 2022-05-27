import styled, { css } from 'styled-components'
import { Button } from '@crosswise/uikit'

export const Container = styled.div<{ isDarkTheme: boolean }>`
  display: flex;
  min-width: 330px;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 20px;
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

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 15px;
`

export const EarnedContainer = styled.div<{ isDarkTheme: boolean }>`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-self: center;
  text-align: center;
  background: rgba(245, 255, 252, 0.1);
  border-radius: 6px;
  margin-top: 15px;
  padding: 15px 0px;

  ${(props) =>
    props.isDarkTheme
      ? css`
          box-shadow: inset 0px 1px 9px rgba(0, 0, 0, 0.85);
        `
      : css`
          box-shadow: inset 0px 1px 9px rgba(0, 0, 0, 0.15);
        `}
`

export const EarnedBox = styled.div`
  display: flex;
  padding: 0 30px;
  justify-content: center;
  flex-direction: column;
`

export const Divider = styled.div`
  width: 1px;
  background-color: #c4c4c4;
  opacity: 0.1;
`

export const Overview = styled.div`
  display: flex;
  justify-content: space-between;
`

export const OverviewItemBox = styled.div`
  display: flex;
`

export const BtnContainer = styled.div`
  margin-left: 5px;
`

export const OverviewItem = styled.div<{ alignItems?: string }>`
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  ${(props) =>
    props.alignItems &&
    css`
      align-items: ${props.alignItems};
    `}
`

export const FullWBtn = styled(Button)`
  width: 100%;
`

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  gap: 15px;
`
