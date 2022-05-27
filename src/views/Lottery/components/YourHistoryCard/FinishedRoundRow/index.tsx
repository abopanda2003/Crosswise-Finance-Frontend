import React from 'react'
import { Text, Flex, ChevronRightIcon, PrizeIcon } from '@crosswise/uikit'
import { dateOptions, timeOptions } from '../../../helpers'
import { Grid, StyledSmallDotIcon } from './styled'

interface FinishedRoundRowProps {
  roundId: string
  numberTickets: string
  endTime: string
  onClick: (string) => void
  hasWon?: boolean
}

const FinishedRoundRow: React.FC<FinishedRoundRowProps> = ({
  roundId,
  numberTickets,
  endTime,
  onClick,
  hasWon = false,
}) => {
  const endTimeInMs = parseInt(endTime, 10) * 1000
  const endTimeAsDate = new Date(endTimeInMs)

  return (
    <Grid onClick={() => onClick(roundId)}>
      <Flex alignItems="center">
        <Text fontSize="16px" color="textSubtle">
          {roundId}
        </Text>
      </Flex>
      <Flex
        mx="6px"
        alignItems={['flex-start', null, 'center']}
        justifyContent={['center', null, 'flex-start']}
        flexDirection={['column', null, 'row']}
      >
        <Text fontSize="12px" mr={['0', null, '6px']}>
          {endTimeAsDate.toLocaleDateString(undefined, dateOptions)}
        </Text>
        <Text fontSize="12px" color="textSubtle">
          {endTimeAsDate.toLocaleTimeString(undefined, timeOptions)}
        </Text>
      </Flex>
      <Flex mx="6px" alignItems="center" justifyContent="space-between">
        <Text>{numberTickets}</Text>
        {hasWon ? <PrizeIcon color="warning" /> : <StyledSmallDotIcon />}
      </Flex>
      <Flex alignItems="center" justifyContent="center">
        <ChevronRightIcon color="primary" />
      </Flex>
    </Grid>
  )
}

export default FinishedRoundRow
