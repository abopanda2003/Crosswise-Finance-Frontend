import React from 'react'
import { Text } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { StyledCell, ArrowIcon } from './styled'

interface ExpandActionCellProps {
  expanded: boolean
  isFullLayout: boolean
}

const TotalStakedCell: React.FC<ExpandActionCellProps> = ({ expanded, isFullLayout }) => {
  const { t } = useTranslation()
  return (
    <StyledCell role="cell">
      {isFullLayout && (
        <Text color="textSecondary" style={{ width: '125px' }}>
          {expanded ? t('HIDE DETAILS') : t('MORE DETAILS')}
        </Text>
      )}
      <ArrowIcon color="textSecondary" toggled={expanded} />
    </StyledCell>
  )
}

export default TotalStakedCell
