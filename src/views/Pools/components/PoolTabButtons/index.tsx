import React from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import { Button } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { ViewControls, Wrapper } from './styled'

const PoolTabButtons = ({ stakedOnly, setStakedOnly, hasStakeInFinishedPools, viewMode, setViewMode }) => {
  const { url, isExact } = useRouteMatch()
  const { t } = useTranslation()

  // const viewModeToggle = <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />

  const liveOrFinishedSwitch = (
    <Wrapper>
      <div>
        <Button
          variant={isExact ? 'tertiary' : 'secondaryGradient'}
          scale="md"
          as={Link}
          to={`${url}`}
          style={{ margin: '0 8px 0 0', padding: '10px 24px' }}
        >
          {t('Active')}
        </Button>
        <Button
          variant={isExact ? 'secondaryGradient' : 'tertiary'}
          scale="md"
          as={Link}
          to={`${url}/history`}
          style={{ margin: '0 8px 0 0', padding: '10px 24px' }}
        >
          {t('Inactive')}
        </Button>
      </div>
    </Wrapper>
  )

  return <ViewControls>{liveOrFinishedSwitch}</ViewControls>
}

export default PoolTabButtons
