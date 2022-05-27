import styled from 'styled-components'

export const OuterWedgeWrapper = styled.div`
  z-index: -1;
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  right: 0px;
  top: 0px;
`

export const InnerWedgeWrapper = styled.div<{ fill: string; top?: boolean; width?: string }>`
  position: absolute;
  display: flex;
  width: 100%;
  ${({ top }) => (top ? 'top: 0px' : 'bottom: 0px')};

  svg {
    fill: ${({ fill }) => fill};
    width: ${({ width }) => width || '100%'};
    height: 100%;
    max-height: 48px;
  }
`
