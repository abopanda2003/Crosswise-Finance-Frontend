import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Text, DexIcon, Flex } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { Container, SubColumn, StyledButton, StyledTitle, StyledValue } from './styled'

const AboutCrss = () => {
  const { t } = useTranslation()
  return (
    <Container>
      <SubColumn>
        <Text fontSize="10px" color="homeTitle" display="flex" fontWeight={600}>
          {t('DEX STATS')} &nbsp; <DexIcon fill="primaryText" width="15px" />
        </Text>
        <Text fontSize="24px" fontWeight={600} lineHeight="29px" mt={10}>
          &nbsp;
        </Text>
      </SubColumn>
      <SubColumn>
        <StyledTitle>{t('Volume 24h')}</StyledTitle>
        <StyledValue>$ 1,000,999</StyledValue>
      </SubColumn>
      <SubColumn>
        <StyledTitle>{t('Price')}</StyledTitle>
        <StyledValue>$ 10.99</StyledValue>
      </SubColumn>
      <SubColumn>
        <StyledTitle>{t('Market Cap')}</StyledTitle>
        <StyledValue>180559</StyledValue>
      </SubColumn>
      <SubColumn>
        <StyledTitle>{t('Circulating Supply')}</StyledTitle>
        <StyledValue>1000,000,000</StyledValue>
      </SubColumn>
      <SubColumn>
        <StyledTitle>{t('TVL')}</StyledTitle>
        <StyledValue>$ 10.99</StyledValue>
      </SubColumn>
      <Flex>
        <RouterLink to="/exchange">
          <StyledButton variant="primaryGradient">{t('Buy CRSS')}</StyledButton>
        </RouterLink>
      </Flex>
    </Container>
  )
}

export default AboutCrss
