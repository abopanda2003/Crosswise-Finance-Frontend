import React from 'react'
import { Text } from '@crosswise/uikit'
import { useWeb3React } from '@web3-react/core'

import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { usePriceCrssBusd } from 'state/farms/hooks'
import { DEFAULT_TOKEN_DECIMAL } from 'config'

import useAllEarnings from '../../../hooks/useAllEarnings'
import CardValue from '../CardValue'
import CardBusdValue from '../CardBusdValue'
import { Block } from './styled'

const CrssHarvestBalance = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const allEarnings = useAllEarnings()
  const earningsSum = allEarnings.reduce((accum, earning) => {
    const earningNumber = new BigNumber(earning)
    if (earningNumber.eq(0)) {
      return accum
    }
    return accum + earningNumber.div(DEFAULT_TOKEN_DECIMAL).toNumber()
  }, 0)
  const crssPriceBusd = usePriceCrssBusd()
  const earningsBusd = new BigNumber(earningsSum).multipliedBy(crssPriceBusd).toNumber()

  if (!account) {
    return (
      <Text color="textSubtle" style={{ lineHeight: '76px', opacity: 0.6 }}>
        {t('Locked')}
      </Text>
    )
  }

  return (
    <Block>
      <CardValue value={earningsSum} lineHeight="1.5" fontSize="30px" bold />
      {!crssPriceBusd.eq(0) && <CardBusdValue value={earningsBusd} />}
    </Block>
  )
}

export default CrssHarvestBalance
