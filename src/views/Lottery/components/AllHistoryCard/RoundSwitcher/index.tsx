import React from 'react'
import { ArrowForwardIcon, ArrowBackIcon, ArrowLastIcon, Flex, Heading } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { StyledInput, StyledIconButton } from './styled'

interface RoundSwitcherProps {
  isLoading: boolean
  selectedRoundId: string
  mostRecentRound: number
  handleInputChange: (event: any) => void
  handleArrowButonPress: (targetRound: number) => void
}

const RoundSwitcher: React.FC<RoundSwitcherProps> = ({
  isLoading,
  selectedRoundId,
  mostRecentRound,
  handleInputChange,
  handleArrowButonPress,
}) => {
  const { t } = useTranslation()
  const selectedRoundIdAsInt = parseInt(selectedRoundId, 10)

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Flex alignItems="center">
        <Heading mr="8px">{t('Round')}</Heading>
        <StyledInput
          disabled={isLoading}
          id="round-id"
          name="round-id"
          type="number"
          value={selectedRoundId}
          scale="lg"
          onChange={handleInputChange}
        />
      </Flex>
      <Flex alignItems="center">
        <StyledIconButton
          disabled={!selectedRoundIdAsInt || selectedRoundIdAsInt <= 1}
          onClick={() => handleArrowButonPress(selectedRoundIdAsInt - 1)}
          variant="text"
          scale="sm"
          mr="4px"
        >
          <ArrowBackIcon />
        </StyledIconButton>
        <StyledIconButton
          disabled={selectedRoundIdAsInt >= mostRecentRound}
          onClick={() => handleArrowButonPress(selectedRoundIdAsInt + 1)}
          variant="text"
          scale="sm"
          mr="4px"
        >
          <ArrowForwardIcon />
        </StyledIconButton>
        <StyledIconButton
          disabled={selectedRoundIdAsInt >= mostRecentRound}
          onClick={() => handleArrowButonPress(mostRecentRound)}
          variant="text"
          scale="sm"
        >
          <ArrowLastIcon />
        </StyledIconButton>
      </Flex>
    </Flex>
  )
}

export default RoundSwitcher
