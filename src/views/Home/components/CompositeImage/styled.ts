import styled, { keyframes } from 'styled-components'
import { Box } from '@crosswise/uikit'

const floatingAnim = (x: string, y: string) => keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(${x}, ${y});
  }
  to {
    transform: translate(0, 0px);
  }  
`

export const Wrapper = styled(Box)<{ maxHeight: string }>`
  position: relative;
  max-height: ${({ maxHeight }) => maxHeight};

  & :nth-child(2) {
    animation: ${floatingAnim('3px', '15px')} 3s ease-in-out infinite;
    animation-delay: 1s;
  }

  & :nth-child(3) {
    animation: ${floatingAnim('5px', '10px')} 3s ease-in-out infinite;
    animation-delay: 0.66s;
  }

  & :nth-child(4) {
    animation: ${floatingAnim('6px', '5px')} 3s ease-in-out infinite;
    animation-delay: 0.33s;
  }

  & :nth-child(5) {
    animation: ${floatingAnim('4px', '12px')} 3s ease-in-out infinite;
    animation-delay: 0s;
  }
`

export const DummyImg = styled.img<{ maxHeight: string }>`
  max-height: ${({ maxHeight }) => maxHeight};
  visibility: hidden;
`

export const ImageWrapper = styled(Box)`
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  img {
    max-height: 100%;
    width: auto;
  }
`
