import React from 'react'
import { darkColors } from '@crosswise/uikit'
import SvgButton from 'components/SvgButton'
import { IconGridOutlined, IconListFill, IconGridFill, IconListOutlined } from 'components/SvgIcons'
import { Container, FlexText } from './styled'

export const ViewMode = {
  TABLE: 'TABLE',
  CARD: 'CARD',
}

interface ToggleViewModeProps {
  mode: string
  onChangeMode?: any
}

const ToggleViewMode: React.FC<ToggleViewModeProps> = (props) => {
  const { mode, onChangeMode } = props
  return (
    <Container>
      <SvgButton onClick={() => onChangeMode(ViewMode.CARD)}>
        <FlexText>
          {mode === ViewMode.CARD ? (
            <IconGridFill fillColor={darkColors.primaryGray} />
          ) : (
            <IconGridOutlined fillColor={darkColors.primaryGray} />
          )}
        </FlexText>
      </SvgButton>

      <SvgButton onClick={() => onChangeMode(ViewMode.TABLE)}>
        <FlexText>
          {mode === ViewMode.TABLE ? (
            <IconListFill fillColor={darkColors.primaryGray} />
          ) : (
            <IconListOutlined fillColor={darkColors.primaryGray} />
          )}
        </FlexText>
      </SvgButton>
    </Container>
  )
}

export default ToggleViewMode
