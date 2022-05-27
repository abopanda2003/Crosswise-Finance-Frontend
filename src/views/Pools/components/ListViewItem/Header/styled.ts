import styled, { keyframes, css } from 'styled-components'
import { Text } from '@crosswise/uikit'

export const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  padding: 20px;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`

export const TitleBox = styled.div`
  display: flex;
  gap: 10px;
`

export const ExpandableBtnContainer = styled.div`
  position: absolute;
  right: 20px;
`

export const PairImageContainer = styled.div`
  display: flex;
  flex: 1;
`

export const HeaderContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 3;
  gap: 20px;
  padding-right: 30px;

  @media (max-width: 650px) {
    flex-direction: column;
    gap: 30px;
  }

  @media (max-width: 1000px) {
    padding-right: 0px;
  }
`

export const ContentItemBox = styled.div`
  display: flex;

  @media (max-width: 650px) {
    justify-content: center;
    align-items: center;
  }
`

export const ContentItem = styled.div<{ alignItems?: string }>`
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

export const BtnContainer = styled.div`
  margin-left: 5px;
`

export const FlexText = styled(Text)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`
