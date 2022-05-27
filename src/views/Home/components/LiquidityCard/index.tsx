import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Heading, CardBody, Button } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import Row from 'components/Layout/Row'
import { StyledLiquidityCard, StyledText, Block, Label } from './styled'

const LiquidityCard = () => {
  const { t } = useTranslation()

  return (
    <StyledLiquidityCard background="none">
      <CardBody>
        <StyledText>Add Liquidity 🌘</StyledText>
        <Heading scale="xl" mb="24px" mt="16px">
          {t('Add Liquidity to Farms and Pools')}
        </Heading>
        <Row justify="space-between">
          <Block>
            <Label small color="primaryText">
              {t('Add a pair of 2 coins as liquidity and earn Rewards in CRSS & xCRSS')}
            </Label>
          </Block>
        </Row>
        <Row justify="end">
          <RouterLink to="/liquidity">
            <Button variant="primaryGradient">Add Liquidity</Button>
          </RouterLink>
        </Row>
      </CardBody>
    </StyledLiquidityCard>
  )
}

export default LiquidityCard
