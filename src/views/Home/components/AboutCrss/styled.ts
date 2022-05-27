import styled from 'styled-components'
import { Button, Text } from '@crosswise/uikit'

export const Container = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.homeCardBackground};
  border-radius: 23px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 30px;
  align-items: center;
  box-shadow: 1px 4px 44px 1px #0000004d;
  border: 1px solid #e0e0ff3d;
  flex-wrap: wrap;
`
export const SubColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const StyledButton = styled(Button)`
  margin: 10px;
  height: 35px;
  font-size: 12px;
`
export const StyledTitle = styled(Text)`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.homeTitle};
`
export const StyledValue = styled(Text)`
  font-size: 17px;
  font-weight: 400;
  line-height: 29px;
  margin-top: 10px;
`
