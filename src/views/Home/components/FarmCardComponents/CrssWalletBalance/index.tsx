import React from 'react'
import { Text } from '@crosswise/uikit'
import { useWeb3React } from '@web3-react/core'
import { BigNumber } from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { usePriceCrssBusd } from 'state/farms/hooks'
import useTokenBalance from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import CardValue from '../CardValue'
import CardBusdValue from '../CardBusdValue'
import { Block } from './styled'

const CrssWalletBalance = () => {
  const { t } = useTranslation()
  const crssBalance = useTokenBalance(getCakeAddress()).balance
  const crssPriceBusd = usePriceCrssBusd()
  const busdBalance = new BigNumber(getBalanceNumber(crssBalance)).multipliedBy(crssPriceBusd).toNumber()
  const { account } = useWeb3React()

  if (!account) {
    return (
      <Text color="textSubtle" style={{ lineHeight: '54px', opacity: 0.6 }}>
        {t('Locked')}
      </Text>
    )
  }

  return (
    <Block>
      <CardValue value={getBalanceNumber(crssBalance)} lineHeight="1.3" fontSize="30px" bold />
      {!crssPriceBusd.eq(0) && <CardBusdValue value={busdBalance} />}
    </Block>
  )
}

export default CrssWalletBalance
