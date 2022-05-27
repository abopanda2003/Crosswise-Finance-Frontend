import styled, { keyframes, css } from 'styled-components'
import { Flex, Text } from '@crosswise/uikit'
import Page from 'components/Layout/Page'
import FlexLayout from 'components/Layout/Flex'

export const CardLayout = styled(FlexLayout)`
  justify-content: center;
`

export const PoolHeader = styled.div`
  padding-top: 72px;
  padding-bottom: 32px;

  max-width: 1400px;
  margin: auto;
  @media only screen and (min-width: 370px) {
    padding-left: 24px;
    padding-right: 24px;
  }
`
export const HeaderTopBar = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    flex-direction: row;
  }
`

export const PoolHeaderLayout = styled.div`
  padding: 0 24px;
  max-width: 1400px;
  margin: auto;
  position: relative;
`
export const PoolHeadCard = styled.div<{ isDarkTheme: boolean }>`
  padding: 40px;
  border-radius: 12px;
  position: relative;
  ${(props) =>
    props.isDarkTheme &&
    css`
      -webkit-backdrop-filter: blur(40px);
      backdrop-filter: blur(40px);
      box-shadow: 8px 8px 24px 0 rgba(9, 13, 20, 0.4), -4px -4px 8px 0 rgba(224, 224, 255, 0.04),
        0 1px 1px 0 rgba(9, 13, 20, 0.4);
      border: solid 1px rgba(245, 247, 250, 0.06);
      background-image: linear-gradient(
        102deg,
        rgba(245, 247, 250, 0.12),
        rgba(245, 247, 250, 0.06) 52%,
        rgba(245, 247, 250, 0) 100%
      );
    `}

  ${(props) =>
    !props.isDarkTheme &&
    css`
      box-shadow: 8px 8px 24px 0 rgba(9, 13, 20, 0.06), -4px -4px 8px 0 rgba(255, 255, 255, 0.4),
        0 1px 1px 0 rgba(9, 13, 20, 0.06);
      background-image: linear-gradient(102deg, #fff, #fafbfc 52%, #f5f7fa 100%);
    `}
`
export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

export const LabelWrapper = styled.div`
  display: flex;
  align-items: baseline;
  > ${Text} {
    font-size: 16px;
    padding-right: 8px;
  }
`

export const ControlStretch = styled(Flex)`
  > div {
    flex: 1;
  }
`

export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }
`

export const Planet1 = styled.div`
  position: absolute;
  z-index: -1;
  top: 35px;
  left: -50px;
`

export const Planet2 = styled.div`
  position: absolute;
  z-index: -1;
  bottom: -150px;
  right: -80px;
`
export const CardWrapper = styled.div`
  display: flex;

  // ${({ theme }) => theme.mediaQueries.sm} {
  //   flex-direction: row;
  // }
`
export const InfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`

export const CardItem = styled.div`
  display: flex;
  alignitems: center;
  padding-left: 0px;
`
export const CardItemLock = styled.div`
  display: flex;
  alignitems: center;
  padding-left: 0px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 100px;
  }
`

export const StakingToggle = styled.div`
  display: flex;
  alignitems: baseline;
  padding: 10px 0px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0px;
  }
`

// new design components
export const Container = styled(Page)`
  // background-image: url('/images/home/planets/planet-9.png'), url('/images/home/planets/planet-10.png'),
  //   url('/images/home/planets/planet-11.png'), url('/images/home/satellite/satellite.png'),
  //   url('/images/home/fire/fire.png');
  // background-position: top 100px left, bottom 50px left, top 200px right, top right, bottom right 50px;

  // background-repeat: no-repeat;
  // background-size: 300px, 100px, 300px, 300px, 100px;
  // overflow: show;
`

export const HeaderContainer = styled.div`
  max-width: 1400px;
  padding-bottom: 32px;
  margin: auto;
`
export const TitleBar = styled.div`
  display: flex;
  flex-direction: column;
`

export const SummaryContainer = styled.div`
  margin-top: 25px;
  display: flex;
  gap: 60px;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (max-width: 620px) {
    flex-direction: column;
    gap: 20px;
  }
`

export const TabBox = styled.div`
  max-width: 320px;
`

export const StatsContainer = styled.div<{ isDarkTheme: boolean }>`
  display: flex;
  width: 100%;
  flex-direction: column;
  border: 1px solid rgba(224, 224, 255, 0.24);
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
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

export const StatsHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
`

export const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 500px;
  }
`

export const collapseAnimation = keyframes`
  from {
    max-height: 500px;
  }
  to {
    max-height: 0px;
  }
`

export const StatsBody = styled.div<{ expanded?: boolean }>`
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 300ms linear forwards;
          border-top: 1px solid rgba(224, 224, 255, 0.24);
        `
      : css`
          ${collapseAnimation} 300ms linear forwards
        `};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Section = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  gap: 40px;
  // justify-content: space-between;

  @media (max-width: 650px) {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
`

export const ValueBar = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 5px 0;
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
`

export const Image = styled.img``

export const EarnedContainer = styled.div<{ isDarkTheme: boolean }>`
  display: flex;
  flex: 2;
  padding: 10px;
  justify-content: center;
  algin-items: center;
  align-self: center;
  text-align: center;
  background: rgba(245, 255, 252, 0.1);
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

export const FiltersContainer = styled.div<{ isDarkTheme: boolean }>`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 20px;
  padding: 20px 20px;
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

export const FiltersHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

export const FiltersHeaderLeft = styled.div`
  display: flex;
  gap: 10px;
`

export const SearchInputContainer = styled.div`
  margin: 15px 0;
`

export const FiltersFooter = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
`

export const StatusFiltersContainer = styled.div`
  display: flex;
  gap: 10px;
`

export const FilterByContainer = styled.div``

export const ListContainer = styled.div`
  margin-top: 20px;
`

export const ListView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const CardView = styled.div`
  display: grid;
  grid-gap: 30px;
  // grid-template-columns: repeat(auto-fit, min(360px));

  grid-template-columns: auto auto auto;
  justify-content: stretch;

  @media (max-width: 1368px) {
    grid-template-columns: auto auto;
  }

  @media (max-width: 740px) {
    grid-template-columns: auto;
  }
`

export const FlexText = styled(Text)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`
