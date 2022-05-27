import React from 'react'
import { Heading, CardBody, Button, Text } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import MarketCap from '../StatisticComponents/MarketCap'
import Circulation from '../StatisticComponents/Circulation'
import BurnedCrss from '../StatisticComponents/BurnedCrss'
import Tvl from '../StatisticComponents/Tvl'
import { StyledStatisticCard, StyledRow, StyledColumn, Label, Actions, StyledText } from './styled'

const StatisticCard = () => {
  const { t } = useTranslation()

  return (
    <StyledStatisticCard background="none">
      <CardBody>
        <StyledText>DEX Statistics</StyledText>
        <Heading scale="lg" mb="24px" mt="16px">
          {t('View General Statistics of the DEX')}
        </Heading>
        <StyledRow>
          <StyledColumn>
            <Label color="textSubtle">CRSS USD Market Cap:</Label>
            <Text fontSize="20px">
              <MarketCap />
            </Text>
          </StyledColumn>
          <StyledColumn>
            <Label color="textSubtle">CRSS in Circulation</Label>
            <Text fontSize="20px">
              <Circulation />
            </Text>
          </StyledColumn>
          <StyledColumn>
            <Label color="textSubtle">CRSS Burned</Label>
            <Text fontSize="20px">
              <BurnedCrss />
            </Text>
          </StyledColumn>
          <StyledColumn>
            <Label color="textSubtle">DEX Liquidity</Label>
            <Text fontSize="20px">-</Text>
          </StyledColumn>
          <StyledColumn>
            <Label color="textSubtle">TVL Value Locked</Label>
            <Text fontSize="20px">
              <Tvl />
            </Text>
          </StyledColumn>
        </StyledRow>
        <Actions>
          <Button id="check-it" variant="primaryGradient">
            {t('Check It')}
          </Button>
        </Actions>
      </CardBody>
    </StyledStatisticCard>
  )
}

export default StatisticCard
