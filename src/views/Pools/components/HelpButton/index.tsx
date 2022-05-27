import React from 'react'
import { Button, HelpIcon } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { ButtonText, StyledLink } from './styled'

const HelpButton = () => {
  const { t } = useTranslation()
  return (
    <StyledLink external href="https://docs.pancakeswap.finance/syrup-pools/syrup-pool">
      <Button px={['14px', null, null, null, '20px']} variant="subtle">
        <ButtonText color="backgroundAlt" bold fontSize="16px">
          {t('Help')}
        </ButtonText>
        <HelpIcon color="backgroundAlt" ml={[null, null, null, 0, '6px']} />
      </Button>
    </StyledLink>
  )
}

export default HelpButton
