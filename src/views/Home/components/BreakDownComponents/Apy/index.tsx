import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import BigNumber from 'bignumber.js'

import { State } from 'state/types'
import { usePriceCrssBusd } from 'state/farms/hooks'

import { ChainId } from '@crosswise/sdk'
import useRefresh from 'hooks/useRefresh'
import getAutoCompApy from 'hooks/getAutoCompApy'

import CardValue from '../CardValue'

const Apy = () => {
  const { fastRefresh } = useRefresh()
  const [autoCompApy, setAutoCompApy] = useState(0)
  const crssPrice = usePriceCrssBusd()
  const farms = useSelector((state: State) => state.farms.data)

  const calcApy = useCallback(() => {
    const farm = farms[0]
    const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice)
    const { rewardsApy } = getAutoCompApy(
      new BigNumber(farm.poolWeight),
      crssPrice,
      totalLiquidity,
      farm.lpAddresses[ChainId.MAINNET],
    )
    setAutoCompApy(rewardsApy)
  }, [farms, crssPrice])

  useEffect(() => {
    calcApy()
  }, [fastRefresh, calcApy])

  return (
    <>
      <CardValue value={autoCompApy} />
    </>
  )
}

export default Apy
