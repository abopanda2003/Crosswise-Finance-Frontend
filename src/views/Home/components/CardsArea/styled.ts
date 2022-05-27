import styled from 'styled-components'
import { Text, Button } from '@crosswise/uikit'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
  justify-content: space-between;
  width: 100%;
  padding: 20px 0;
`
export const SubColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 48%;
    margin-top: 0;
  }
`
export const TokenPairWrapper = styled.div`
  padding: 2px;
  width: 34px;
  margin-left: 20px;
`
export const StyledTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
`
export const CardContent = styled.div`
  width: 100%;
  height: 207px;
  background: rgba(245, 255, 252, 0.1);
  box-shadow: inset 1px 1px 11px 2px rgba(0, 0, 0, 0.56);
  border-radius: 6px;
  padding: 30px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const StyledText = styled(Text)`
  margin-bottom: 10px;
`
export const StyledButton = styled(Button)`
  height: 35px;
  background: ${({ theme }) => theme.colors.gradients.btngradprimary};
  font-size: 12px;
`
export const IconButton = styled.div`
  cursor: pointer;
  display: flex;
`
