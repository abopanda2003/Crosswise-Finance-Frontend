import React from 'react'
import { Flex, Heading, Skeleton } from '@crosswise/uikit'
import { LotteryStatus } from 'config/constants/types'
import { useTranslation } from 'contexts/Localization'
import { usePriceCrssBusd } from 'state/farms/hooks'
import { useLottery } from 'state/lottery/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { TicketPurchaseCard } from '../../svgs'
import {
  TicketContainer,
  PrizeTotalBalance,
  StyledBuyTicketButton,
  ButtonWrapper,
  TicketSvgWrapper,
  Decorations,
  StarsDecorations,
} from './styled'

const Hero = () => {
  const { t } = useTranslation()
  const {
    currentRound: { amountCollectedInCake, status },
    isTransitioning,
  } = useLottery()

  const crssPriceBusd = usePriceCrssBusd()
  const prizeInBusd = amountCollectedInCake.times(crssPriceBusd)
  const prizeTotal = getBalanceNumber(prizeInBusd)
  const ticketBuyIsDisabled = status !== LotteryStatus.OPEN || isTransitioning

  const getHeroHeading = () => {
    if (status === LotteryStatus.OPEN) {
      return (
        <>
          {prizeInBusd.isNaN() ? (
            <Skeleton my="7px" height={60} width={190} />
          ) : (
            <PrizeTotalBalance fontSize="64px" bold prefix="$" value={prizeTotal} mb="8px" decimals={0} />
          )}
          <Heading mb="32px" scale="lg" color="#ffffff">
            {t('in prizes!')}
          </Heading>
        </>
      )
    }
    return (
      <Heading mb="24px" scale="xl" color="#ffffff">
        {t('Tickets on sale soon')}
      </Heading>
    )
  }

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <Decorations />
      <StarsDecorations display={['none', 'none', 'block']}>
        <img src="/images/lottery/star-big.png" width="124px" height="109px" alt="" />
        <img src="/images/lottery/star-small.png" width="70px" height="62px" alt="" />
        <img src="/images/lottery/three-stars.png" width="130px" height="144px" alt="" />
        <img src="/images/lottery/ticket-l.png" width="123px" height="83px" alt="" />
        <img src="/images/lottery/ticket-r.png" width="121px" height="72px" alt="" />
      </StarsDecorations>
      <Heading mb="8px" scale="md" color="#ffffff">
        {t('The PancakeSwap Lottery')}
      </Heading>
      {getHeroHeading()}
      <TicketContainer
        position="relative"
        width={['240px', '288px']}
        height={['94px', '113px']}
        alignItems="center"
        justifyContent="center"
      >
        <ButtonWrapper>
          <StyledBuyTicketButton disabled={ticketBuyIsDisabled} />
        </ButtonWrapper>
        <TicketSvgWrapper>
          <TicketPurchaseCard width="100%" />
        </TicketSvgWrapper>
      </TicketContainer>
    </Flex>
  )
}

export default Hero
