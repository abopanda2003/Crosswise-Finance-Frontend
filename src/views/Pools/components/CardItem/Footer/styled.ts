import styled from 'styled-components'
import { Text } from '@crosswise/uikit'

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  algin-items: center;
  padding: 0px 15px 20px 15px;
`

export const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
`

export const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-end;
`

export const FlexText = styled(Text)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`
