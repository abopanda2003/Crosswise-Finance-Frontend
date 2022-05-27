import React from 'react'
import { Heading, CardBody } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { StyledText, StyledAccountAreaCard } from './styled'

const AccountAreaCard = () => {
  const { t } = useTranslation()

  return (
    <StyledAccountAreaCard background="none">
      <CardBody>
        <StyledText>Start Now 💥</StyledText>
        <Heading scale="lg" mb="24px" mt="16px">
          {t('Personal Account Area')}
        </Heading>
      </CardBody>
    </StyledAccountAreaCard>
  )
}

export default AccountAreaCard
