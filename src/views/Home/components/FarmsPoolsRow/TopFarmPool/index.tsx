import React from 'react'
import { Skeleton, Text } from '@crosswise/uikit'
import Balance from 'components/Balance'
import { useTranslation } from 'contexts/Localization'
import { StyledWrapper, AbsoluteWrapper } from './styled'

interface TopFarmPoolProps {
  title: string
  percentage: number
  index: number
  visible: boolean
}

const TopFarmPool: React.FC<TopFarmPoolProps> = ({ title, percentage, index, visible }) => {
  const { t } = useTranslation()

  const topOffset = () => {
    if (index >= 0 && index < 2) {
      return '0px'
    }

    if (index >= 2 && index < 3) {
      return '80px'
    }

    return '160px'
  }

  return (
    <StyledWrapper index={index}>
      <AbsoluteWrapper index={index} visible={visible} topOffset={topOffset()}>
        {title ? (
          <Text bold mb="8px" fontSize="12px" color="secondary">
            {title}
          </Text>
        ) : (
          <Skeleton width={80} height={12} mb="8px" />
        )}
        {percentage ? (
          <Balance lineHeight="1.1" fontSize="16px" bold unit="%" value={percentage} />
        ) : (
          <Skeleton width={60} height={16} />
        )}
        {percentage ? (
          <Text fontSize="16px" color="textSubtle">
            {t('APR')}
          </Text>
        ) : (
          <Skeleton width={30} height={16} mt="4px" />
        )}
      </AbsoluteWrapper>
    </StyledWrapper>
  )
}

export default TopFarmPool
