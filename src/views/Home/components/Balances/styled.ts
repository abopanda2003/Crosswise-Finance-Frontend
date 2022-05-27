import styled from 'styled-components'
import { Text } from '@crosswise/uikit'

export const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid rgba(196, 196, 196, 0.1);
`
export const SubColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
