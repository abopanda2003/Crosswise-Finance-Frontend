import styled, { keyframes } from 'styled-components'
// import useTheme from 'hooks/useTheme'
import Page from 'components/Layout/Page'
import { BaseLayout, Text, Heading, DropDownBottomIcon } from '@crosswise/uikit'
import { IconCopy } from 'components/SvgIcons'

export const StyledPage = styled(Page)`
  /* background-image: url('/images/home/planets/planet-pluto.png'), url('/images/home/planets/planet-7.png');
  background-repeat: no-repeat;
  background-position: bottom center, top 120px right;
  background-size: 360px, 200px; */
  overflow: show;
`

export const CardsRow = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;
  margin-top: 32px;
  width: 100%;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

export const Label = styled(Text)`
  /* opacity: 0.6; */
  color: ${({ theme }) => (theme.isDark ? '#FFF' : '#000')};
  font-size: 20px;
  @media (max-width: 600px) {
    font-size: 16px;
    text-align: center;
  }
`

export const StyledCenter = styled.div`
  display: flex;
  justify-content: center;
`

export const ResponsiveHeading = styled(Heading)`
  font-size: 48px;
  color: ${({ theme }) => (theme.isDark ? '#fff' : '#060514')};

  @media (max-width: 600px) {
    font-size: 36px;
    text-align: center;
  }
`

export const ReferralCardWrapper = styled.div`
  width: 100%;
  margin-top: 60px;
  color: ${({ theme }) => (theme.isDark ? '#fff' : '#060514')};
  position: relative;
`

export const ReferralCard = styled.div`
  padding: 14px 68px 36px 32px;
  background: ${({ theme }) =>
    theme.isDark
      ? `linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.12) 0%,
      rgba(255, 255, 255, 0.06) 45.83%,
      rgba(255, 255, 255, 0) 100%
    ),
    #25272c`
      : `#f9fafb`};
  border: 1px solid rgba(232, 241, 250, 0.12);
  box-sizing: border-box;
  box-shadow: 1px 4px 44px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  /* opacity: 0.9; */
`

export const ReferralCardMainInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`

export const ReferralCardIconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 21px;
  font-weight: 700;
`

export const ReferralCardIcon = styled.div`
  background: url('/images/icons/ReferralIcon.png');
  background-size: cover;
  width: 23px;
  height: 27px;
  margin-right: 10px;
`

export const ReferralLinkContainer = styled.div`
  /* display: grid;
  grid-template-columns: max-content auto;
  column-gap: 10px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  position: relative;
`

export const ReferralLinkTitle = styled.div`
  color: ${({ theme }) => (theme.isDark ? '#BFC8DA' : '#818ea3')};
  font-weight: 600;
  font-size: 17px;
  line-height: 16px;
  letter-spacing: 0.04em;
  text-transform: capitalize;
  margin-right: 24px;
  width: 130px;
`

export const ReferralUrlContainer = styled.div`
  background: rgba(245, 255, 252, 0.1);
  box-shadow: inset 0px 1px 9px rgba(0, 0, 0, 0.45);
  border-radius: 6px;
  padding: 18px 16px;
  text-transform: uppercase;
  vertical-align: middle;
  width: calc(100% - 130px);
`

export const StyledIconCopy = styled(IconCopy)`
  position: absolute;
  right: 24px;
  cursor: pointer;
`

export const DropDownIcon = styled(DropDownBottomIcon)`
  position: absolute;
  right: 22px;
  top: 22px;
  cursor: pointer;
`

const expandAnimation = keyframes`
  from {
    max-height: 0px;
    margin-top: 0px;
  }
  to {
    max-height: 500px;
    margin-top: 39px;
  }
`

const collapseAnimation = keyframes`
  from {
    max-height: 500px;
    margin-top: 39px;
  }
  to {
    max-height: 0px;
    margin-top: 0px;
  }
`

export const ReferralDetailInfo = styled.div<{ expanded: boolean }>`
  animation: ${({ expanded }) => (expanded ? expandAnimation : collapseAnimation)} 300ms linear forwards;
  display: grid;
  grid-template-columns: 1fr 50% 1fr;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
`

export const ReferralStatsContainer = styled.div`
  display: flex;
  padding: 10px;
  align-self: center;
  text-align: center;
  background: rgba(245, 255, 252, 0.1);
  box-shadow: ${({ theme }) =>
    theme.isDark ? 'inset 0px 1px 9px rgba(0, 0, 0, 0.85)' : 'inset 0px 1px 9px rgba(0, 0, 0, 0.15)'};
  border-radius: 6px;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 20px;
  }
`

export const ReferralStatsItem = styled.div`
  display: flex;
  padding: 7px 30px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`

export const Divider = styled.div`
  width: 1px;
  background-color: #c4c4c4;
  opacity: 0.1;

  @media (max-width: 600px) {
    width: 100%;
    height: 1px;
  }
`

export const ReferralClaimButton = styled.div`
  width: max-content;
  color: #fff;
  background: ${({ theme }) =>
    theme.isDark
      ? 'linear-gradient(92.63deg, #3f81ef -1.76%, #8750f4 107.38%)'
      : 'linear-gradient(90deg, #04F8AD 0%, #3F81EF 50.52%, #5100B9 100%)'};
  border-radius: 6px;
  padding: 10px 24px;
  cursor: pointer;
`
