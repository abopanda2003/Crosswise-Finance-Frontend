import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Heading, CardBody, Button } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { StyledReferUserCard, Label, Actions } from './styled'

const ReferUserCard = () => {
  const { t } = useTranslation()

  return (
    <StyledReferUserCard background="none">
      <CardBody>
        <Heading scale="lg" mb="24px" mt="16px">
          {t('Refer users')}
        </Heading>
        <Label color="textSubtle">{t('Get 1 % of users lifetime earnings')}</Label>
        <Actions>
          <RouterLink to="referral">
            <Button id="check-it" variant="primaryGradient">
              {t('Сopy Ref link')}
            </Button>
          </RouterLink>
        </Actions>
      </CardBody>
    </StyledReferUserCard>
  )
}

export default ReferUserCard
