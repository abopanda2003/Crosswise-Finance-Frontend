import React from 'react'
import { Text, TotalIcon } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { Container, SubColumn, StyledTitle, StyledValue } from './styled'

const Balances = () => {
  const { t } = useTranslation()
  return (
    <Container>
      <SubColumn>
        <Text fontSize="10px" color="homeTitle" fontWeight={600} display="flex">
          {t('BALANCES')} &nbsp;
          <TotalIcon fill="primaryText" width="15px" />
        </Text>
        <Text>&nbsp;</Text>
      </SubColumn>
      <SubColumn>
        <StyledTitle>{t('Total Value')} (USD)</StyledTitle>
        <StyledValue>$1,040</StyledValue>
      </SubColumn>
      <SubColumn>
        <StyledTitle>{t('Claimable')}</StyledTitle>
        <StyledValue>$10.99</StyledValue>
      </SubColumn>
      <SubColumn>
        <StyledTitle>{t('Total Vested')}</StyledTitle>
        <StyledValue>$10.99</StyledValue>
      </SubColumn>
      <SubColumn>
        <StyledTitle>{t('Total Staked')} (USD)</StyledTitle>
        <StyledValue>$10.99</StyledValue>
      </SubColumn>
    </Container>
  )
}

export default Balances
