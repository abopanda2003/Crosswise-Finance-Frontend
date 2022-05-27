import React, { useState } from 'react'
import { Box, CopyIcon, IconButton } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { CopyAddressProps } from './interfaces'
import { Wrapper, Address, Tooltip } from './styled'

const CopyAddress: React.FC<CopyAddressProps> = ({ account, ...props }) => {
  const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false)
  const { t } = useTranslation()

  const copyAddress = () => {
    if (navigator.clipboard && navigator.permissions) {
      navigator.clipboard.writeText(account).then(() => displayTooltip())
    } else if (document.queryCommandSupported('copy')) {
      const ele = document.createElement('textarea')
      ele.value = account
      document.body.appendChild(ele)
      ele.select()
      document.execCommand('copy')
      document.body.removeChild(ele)
      displayTooltip()
    }
  }

  function displayTooltip() {
    setIsTooltipDisplayed(true)
    setTimeout(() => {
      setIsTooltipDisplayed(false)
    }, 1000)
  }

  return (
    <Box position="relative" {...props}>
      <Wrapper>
        <Address title={account}>
          <input type="text" readOnly value={account} />
        </Address>
        <IconButton variant="text" onClick={copyAddress}>
          <CopyIcon color="primary" width="24px" />
        </IconButton>
      </Wrapper>
      <Tooltip isTooltipDisplayed={isTooltipDisplayed}>{t('Copied')}</Tooltip>
    </Box>
  )
}

export default CopyAddress
