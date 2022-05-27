import React from 'react'
import { ListViewIcon, CardViewIcon } from '@crosswise/uikit'
import { Container, StyledIconButton } from './styled'

export enum ViewMode {
  'TABLE' = 'TABLE',
  'CARD' = 'CARD',
}

interface ToggleViewProps {
  viewMode: ViewMode
  onToggle: (mode: ViewMode) => void
}

const ToggleView: React.FunctionComponent<ToggleViewProps> = ({ viewMode, onToggle }) => {
  const handleToggle = (mode: ViewMode) => {
    if (viewMode !== mode) {
      onToggle(mode)
    }
  }

  return (
    <Container>
      <StyledIconButton
        variant={viewMode === ViewMode.CARD ? 'tertiary' : 'secondaryGradient'}
        scale="md"
        id="clickPoolCardView"
        onClick={() => handleToggle(ViewMode.CARD)}
      >
        <CardViewIcon color="text" />
      </StyledIconButton>
      <StyledIconButton
        variant={viewMode === ViewMode.TABLE ? 'tertiary' : 'secondaryGradient'}
        scale="md"
        id="clickPoolTableView"
        onClick={() => handleToggle(ViewMode.TABLE)}
      >
        <ListViewIcon color="text" />
      </StyledIconButton>
    </Container>
  )
}

export default ToggleView
