import React from 'react'
import { Heading, CardBody, Text } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import CrssWalletBalance from '../BreakDownComponents/CrssWalletBalance'
import StakedCrss from '../BreakDownComponents/StakedCrss'
import { StyledBreakDownCard, StyledText, StyledRow, StyledColumn, Label } from './styled'

const BreakDownCard = () => {
  const { t } = useTranslation()

  return (
    <StyledBreakDownCard background="none">
      <CardBody>
        <StyledText>Hardware ⚙️</StyledText>
        <Heading scale="xl" mb="24px" mt="16px">
          {t('Your CRSS Breakdown')}
        </Heading>
        <StyledRow>
          <StyledColumn>
            <Label color="textSubtle">You Staked</Label>
            <Text fontSize="20px">
              <StakedCrss />
            </Text>
          </StyledColumn>
          <StyledColumn>
            <Label color="textSubtle">Staking APY</Label>
            <Text fontSize="20px">{/* <Apy /> */}-</Text>
          </StyledColumn>
          <StyledColumn>
            <Label color="textSubtle">Balance</Label>
            <Text fontSize="20px">
              <CrssWalletBalance />
            </Text>
          </StyledColumn>
          <StyledColumn>
            <Label color="textSubtle">Referal Reward</Label>
            <Text fontSize="20px">-</Text>
          </StyledColumn>
          <StyledColumn>
            <Label color="textSubtle">Governance Reward</Label>
            <Text fontSize="20px">-</Text>
          </StyledColumn>
        </StyledRow>
      </CardBody>
    </StyledBreakDownCard>
  )
}

export default BreakDownCard
