import React, { useState } from 'react'
import { Toggle, Text } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { Container, FlexText } from './styled'

const Footer = () => {
  const { t } = useTranslation()
  const [vesting, setVesting] = useState(false)
  const [autoCom, setAutoCom] = useState(false)

  const onChangeVesting = () => {
    setVesting((prev) => {
      return !prev
    })
  }

  const onChangeAutoCom = () => {
    setAutoCom((prev) => {
      return !prev
    })
  }

  return (
    <Container>
      <FlexText>
        <Text bold fontSize="11px" textTransform="uppercase">
          {t('Auto-compound')}
        </Text>
        <Toggle scale="sm" checked={autoCom} onChange={onChangeAutoCom} />
      </FlexText>

      <FlexText>
        <Text bold fontSize="11px" textTransform="uppercase">
          {t('Vesting')}
        </Text>
        <Toggle scale="sm" checked={vesting} onChange={onChangeVesting} />
      </FlexText>
    </Container>
  )
}

export default Footer
