import React from 'react'
import { Heading, Flex, Skeleton, Text, Box, Button, useModal, useMatchBreakpoints } from '@crosswise/uikit'
import { LotteryRound } from 'state/types'
import { useGetUserLotteriesGraphData, useLottery } from 'state/lottery/hooks'
import { LotteryStatus } from 'config/constants/types'
import { useTranslation } from 'contexts/Localization'
import WinningNumbers from '../../WinningNumbers'
import ViewTicketsModal from '../../ViewTicketsModal'
import { StyledCardBody, Grid, StyedCardRibbon } from './styled'

const PreviousRoundCardBody: React.FC<{ lotteryData: LotteryRound; lotteryId: string }> = ({
  lotteryData,
  lotteryId,
}) => {
  const { t } = useTranslation()
  const {
    currentLotteryId,
    currentRound: { status },
  } = useLottery()
  const userLotteryData = useGetUserLotteriesGraphData()
  const userDataForRound = userLotteryData.rounds.find((userLotteryRound) => userLotteryRound.lotteryId === lotteryId)
  const { isLg, isXl } = useMatchBreakpoints()
  const isDesktop = isLg || isXl

  const currentLotteryIdAsInt = parseInt(currentLotteryId)
  const mostRecentFinishedRoundId =
    status === LotteryStatus.CLAIMABLE ? currentLotteryIdAsInt : currentLotteryIdAsInt - 1
  const isLatestRound = mostRecentFinishedRoundId.toString() === lotteryId

  const [onPresentViewTicketsModal] = useModal(
    <ViewTicketsModal roundId={lotteryId} roundStatus={lotteryData?.status} />,
  )

  return (
    <StyledCardBody>
      {isLatestRound && <StyedCardRibbon text={t('Latest')} />}
      <Grid>
        <Flex justifyContent={['center', null, null, 'flex-start']}>
          <Heading mb="24px">{t('Winning Number')}</Heading>
        </Flex>
        <Flex maxWidth={['240px', null, null, '100%']} justifyContent={['center', null, null, 'flex-start']}>
          {lotteryData ? (
            <WinningNumbers
              rotateText={isDesktop || false}
              number={lotteryData?.finalNumber.toString()}
              mr={[null, null, null, '32px']}
              size="100%"
              fontSize={isDesktop ? '42px' : '16px'}
            />
          ) : (
            <Skeleton
              width={['240px', null, null, '450px']}
              height={['34px', null, null, '71px']}
              mr={[null, null, null, '32px']}
            />
          )}
        </Flex>
        {userDataForRound && (
          <>
            <Box display={['none', null, null, 'flex']}>
              <Heading>{t('Your tickets')}</Heading>
            </Box>
            <Flex
              flexDirection="column"
              mr={[null, null, null, '24px']}
              alignItems={['center', null, null, 'flex-start']}
            >
              <Box mt={['32px', null, null, 0]}>
                <Text display="inline">{t('You had')} </Text>
                <Text display="inline" bold>
                  {userDataForRound.totalTickets} {t('tickets')}{' '}
                </Text>
                <Text display="inline">{t('this round')}</Text>
              </Box>
              <Button
                onClick={onPresentViewTicketsModal}
                height="auto"
                width="fit-content"
                p="0"
                variant="text"
                scale="sm"
              >
                {t('View your tickets')}
              </Button>
            </Flex>
          </>
        )}
      </Grid>
    </StyledCardBody>
  )
}

export default PreviousRoundCardBody
