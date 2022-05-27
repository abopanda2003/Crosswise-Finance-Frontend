import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { StyledTimerFlex, StyledTimerText } from './styled'

export interface TimerProps {
  minutes?: number
  hours?: number
  days?: number
}

const Wrapper: React.FC<TimerProps> = ({ minutes, hours, days }) => {
  const { t } = useTranslation()

  return (
    <StyledTimerFlex alignItems="flex-end">
      {Boolean(days) && (
        <>
          <StyledTimerText mb="-4px" scale="xl" mr="4px">
            {days}
          </StyledTimerText>
          <StyledTimerText mr="12px">{t('d')}</StyledTimerText>
        </>
      )}
      {Boolean(hours) && (
        <>
          <StyledTimerText mb="-4px" scale="xl" mr="4px">
            {hours}
          </StyledTimerText>
          <StyledTimerText mr="12px">{t('h')}</StyledTimerText>
        </>
      )}
      {Boolean(minutes) && (
        <>
          <StyledTimerText mb="-4px" scale="xl" mr="4px">
            {minutes}
          </StyledTimerText>
          <StyledTimerText mr="12px">{t('m')}</StyledTimerText>
        </>
      )}
    </StyledTimerFlex>
  )
}

export default Wrapper
