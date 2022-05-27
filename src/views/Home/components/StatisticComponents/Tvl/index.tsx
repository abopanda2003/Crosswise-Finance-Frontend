import React from 'react'
// import { useTranslation } from 'contexts/Localization'
import useTVL from 'hooks/useTvl'
import CardValue from '../CardValue'

const Tvl = () => {
  // const { t } = useTranslation()
  const data = useTVL()

  return (
    <>
      <CardValue value={data} prefix="$" isCountUp />
    </>
  )
}

export default Tvl
