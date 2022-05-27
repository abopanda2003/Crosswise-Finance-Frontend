import React from 'react'
import { Heading, CardBody, Button, Text } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import Row from 'components/Layout/Row'
// import { useWeb3React } from '@web3-react/core'
import ComingSoonCard from '../ComingSoonCard'
import { StyledLotteryCard, StyledText, Block, Label, Actions, StyledComingSoonCard } from './styled'

const LotteryCard = () => {
  // const { account } = useWeb3React()
  const { t } = useTranslation()

  return (
    <StyledLotteryCard background="none">
      <StyledComingSoonCard>
        <ComingSoonCard />
      </StyledComingSoonCard>
      <CardBody>
        <StyledText>You Lucky 🍀</StyledText>
        <Heading scale="xl" mb="24px" mt="16px">
          {`${t('Lottery Winnings')} `}
        </Heading>
        <Row justify="space-between">
          <Block>
            <Label small color="textSubtle">
              {t('To Collect')}:
            </Label>
            <Text fontSize="30px" bold>
              0.000
            </Text>
            <Label small color="textSubtle">
              ~$ 0.00
            </Label>
          </Block>
          <Block>
            <Label small color="textSubtle">
              {t('Total Jackpot')}:
            </Label>
            <Text fontSize="30px" bold>
              0.000
            </Text>
            <Label small color="textSubtle">
              ~$ 0.00
            </Label>
          </Block>
        </Row>
        <Actions>
          <Button id="collect-winnings" variant="primaryGradient" disabled>
            {t('Collect Winnings')}
          </Button>
          <Button id="approve" variant="primaryGradient" style={{ marginLeft: '24px' }} disabled>
            {t('Approve')}
          </Button>
        </Actions>
      </CardBody>
    </StyledLotteryCard>
  )
}

export default LotteryCard
