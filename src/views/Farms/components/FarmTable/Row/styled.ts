import styled, { keyframes } from 'styled-components'
import { Text, DropDownBottomIcon } from '@crosswise/uikit'

// fadein keyframe
const fadeInKeyframe = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const CellInner = styled.div<{ alignItems?: string }>`
  /* padding: 24px 0px; */
  display: flex;
  /* width: 100%; */
  align-items: ${({ alignItems }) => alignItems || 'center'};
  /* padding-right: 8px; */

  ${({ theme }) => theme.mediaQueries.xl} {
    /* padding-right: 32px; */
  }
`

export const StyledTr = styled.div<{ index: number }>`
  cursor: pointer;
  /* opacity: 0;
  animation: ${fadeInKeyframe} 2s;
  animation-delay: ${({ index }) => `${index * 0.1}s`};
  animation-fill-mode: forwards; */
  transition: transform 1s;
  /* border-bottom: 2px solid ${({ theme }) => theme.colors.cardBorder}; */
  /* padding: 25px 20px; */
  margin-bottom: 15px;

  background: ${({ theme }) =>
    theme.isDark
      ? 'linear-gradient(90deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 45.83%, rgba(255, 255, 255, 0) 100%), #25272C;'
      : '#FFF'};
  border: ${({ theme }) => (theme.isDark ? '1px solid rgba(224, 224, 255, 0.22)' : 'none')};

  -webkit-backdrop-filter: blur(40px);
  backdrop-filter: blur(40px);
  box-shadow: 1px 4px 44px rgba(0, 0, 0, 0.3);
  border-radius: 20px;

  &:hover {
    /* transform: scale(1.02); */
  }
`

export const EarnedMobileCell = styled.td`
  padding: 16px 0 24px 16px;
`

export const AprMobileCell = styled.td`
  padding-top: 16px;
  padding-bottom: 24px;
`

export const FarmMobileCell = styled.td`
  padding-top: 24px;
`

export const DepositFeeMobileCell = styled.td`
  padding-top: 16px;
  padding-bottom: 24px;
`

export const RowHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 20px;
`

export const GearIcon = styled.div`
  background-image: url('/images/icons/GearIcon.png');
  background-size: cover;
  width: 21px;
  height: 21px;
`

export const TokenWrapper = styled.div`
  padding-right: 8px;
  width: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 56px;
  }
`

export const RowBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 19px 25px;
  border-top: 1px solid rgba(196, 196, 196, 0.1);
  border-bottom: 1px solid rgba(196, 196, 196, 0.1);
`

export const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 10px; */
  justify-content: flex-end;
  margin-right: 22px;
  /* width: 100%; */
  /* ${({ theme }) => theme.mediaQueries.xl} {
    width: 200px;
  } */
`

export const ToggleWrapper = styled.div`
  /* width: 100%; */
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 12px;
  /* margin: 5px 0; */
  margin-left: 36px;
  ${Text} {
    margin-left: 8px;
  }
  &:last-child {
    margin-bottom: 0;
  }
`

export const DropDownIcon = styled(DropDownBottomIcon)`
  position: absolute;
  right: 15px;
  top: 21px;
  cursor: pointer;
`
