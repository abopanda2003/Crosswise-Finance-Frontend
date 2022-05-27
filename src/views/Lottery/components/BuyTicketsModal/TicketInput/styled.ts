import styled from 'styled-components'

export const InputsContainer = styled.div<{ focused: boolean; isDuplicate: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  box-sizing: border-box;
  border: 1px solid #d7caec;
  background-color: #eeeaf4;
  border-radius: 16px;
  margin-bottom: 8px;
  ${({ isDuplicate }) =>
    isDuplicate &&
    `
    border: 1px solid #FFB237;
    box-shadow: 0px 0px 0px 2px #FFB237;
  `}
  ${({ focused }) =>
    focused &&
    `
    border: 1px solid #7645D9;
    box-shadow: 0px 0px 0px 2px #E4DAF7;
  `}
`

export const DigitInput = styled.input`
  border: none;
  height: 32px;
  padding: 0 12px;
  font-size: 16px;
  flex: 1;
  width: 16px;
  text-align: center;
  min-width: 0;
  background-color: transparent;
  caret-color: #7a6faa;

  &::placeholder {
    text-align: center;
  }

  &:placeholder-shown {
    text-align: left;
  }

  &:focus {
    outline: none;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  -moz-appearance: textfield; /* Firefox */
`
