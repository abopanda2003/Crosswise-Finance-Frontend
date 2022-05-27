import styled from 'styled-components'
import { Text } from '@crosswise/uikit'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

export const FlexText = styled(Text)`
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: normal;
`
