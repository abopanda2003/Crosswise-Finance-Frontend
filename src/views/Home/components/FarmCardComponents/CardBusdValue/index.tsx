import React from 'react'
import CardValue, { CardValueProps } from '../CardValue'

const CardBusdValue: React.FC<CardValueProps> = (props) => {
  return (
    <CardValue
      fontSize="14px"
      lineHeight="1.1"
      color="textSubtle"
      prefix="~$ "
      bold={false}
      decimals={2}
      opacity="0.6"
      {...props}
    />
  )
}

export default CardBusdValue
