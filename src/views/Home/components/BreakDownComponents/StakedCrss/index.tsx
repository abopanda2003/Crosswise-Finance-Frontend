import React from 'react'
import useStaked from 'hooks/useStaked'
import CardValue from '../CardValue'

const StakedCrss = () => {
  const data = useStaked()

  return (
    <>
      <CardValue value={data} />
    </>
  )
}

export default StakedCrss
