import React from 'react'
import _uniqueId from 'lodash/uniqueId'
import { LotteryTicket } from 'config/constants/types'
import { Flex, Text } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { parseRetreivedNumber } from '../../helpers'
import { StyledNumberWrapper, RewardHighlighter } from './styled'

interface TicketNumberProps extends LotteryTicket {
  localId?: number
  rewardBracket?: number
}

const TicketNumber: React.FC<TicketNumberProps> = ({ localId, id, number, rewardBracket }) => {
  const { t } = useTranslation()
  const reversedNumber = parseRetreivedNumber(number)
  const numberAsArray = reversedNumber.split('')
  const numberMatches = rewardBracket + 1

  return (
    <Flex flexDirection="column" mb="12px">
      <Flex justifyContent="space-between">
        <Text fontSize="12px" color="textSubtle">
          #{localId || id}
        </Text>
        {rewardBracket >= 0 && (
          <Text fontSize="12px">
            {t('Matched first')} {numberMatches}
          </Text>
        )}
      </Flex>
      <StyledNumberWrapper>
        {rewardBracket >= 0 && <RewardHighlighter numberMatches={numberMatches} />}
        {numberAsArray.map((digit) => (
          <Text key={`${localId || id}-${digit}-${_uniqueId}`} fontSize="16px">
            {digit}
          </Text>
        ))}
      </StyledNumberWrapper>
    </Flex>
  )
}

export default TicketNumber
