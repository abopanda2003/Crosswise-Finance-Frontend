import React from 'react'
import { StyledButton } from './styled'

interface NumTicketsToBuyButtonProps {
  onClick: () => void
  disabled?: boolean
}

const NumTicketsToBuyButton: React.FC<NumTicketsToBuyButtonProps> = ({ children, onClick, disabled = false }) => {
  return (
    <StyledButton disabled={disabled} scale="xs" mx="2px" p="4px 16px" variant="tertiary" onClick={onClick}>
      {children}
    </StyledButton>
  )
}

export default NumTicketsToBuyButton
