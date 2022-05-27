import React from 'react'
import styled from 'styled-components'
import { Button } from '@crosswise/uikit'

interface PercentageButtonProps {
  onClick: () => void
}

const PercentageButton: React.FC<PercentageButtonProps> = ({ children, onClick }) => {
  return (
    <Button scale="sm" mx="2px" variant="primaryGradientOutline" onClick={onClick}>
      {children}
    </Button>
  )
}

export default PercentageButton
