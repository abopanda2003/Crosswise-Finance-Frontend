import React from 'react'
// import { useTranslation } from 'contexts/Localization'
import { useMaxSupply, useTotalSupply } from 'hooks/useTokenBalance'
import { getBalanceNumber } from 'utils/formatBalance'
import CardValue from '../CardValue'

const Circulation = () => {
  // const { t } = useTranslation()
  const maxSupply = useMaxSupply()
  const totalSupply = useTotalSupply()

  const circulation = (getBalanceNumber(totalSupply) / getBalanceNumber(maxSupply)) * 100

  return (
    <>
      <CardValue value={circulation} isCountUp={false} decimals={2} suffix="%" />
    </>
  )
}

export default Circulation
