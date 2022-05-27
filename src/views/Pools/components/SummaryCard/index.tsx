import React from 'react'
import { Text } from '@crosswise/uikit'
import RoundedIcon from '../RoundedIcon'
import { Container } from './styled'

interface SummaryCardProps {
  label?: string
  amount?: string
  imgSrc?: string
}

const SummaryCard: React.FC<SummaryCardProps> = ({ label = '', amount = '', imgSrc = '' }) => {
  return (
    <Container>
      <RoundedIcon>
        <img src={imgSrc} alt="summary card icon" />
      </RoundedIcon>
      <Text fontWeight="600" textTransform="uppercase">
        {label}
      </Text>
      <Text>{amount}</Text>
    </Container>
  )
}

export default SummaryCard
