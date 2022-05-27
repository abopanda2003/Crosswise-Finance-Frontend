import React from 'react'
// import { Text, Skeleton, useTooltip } from '@crosswise/uikit'
import { Text, useTooltip } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import BigNumber from 'bignumber.js'
import { useThemeManager } from 'state/user/hooks'
import { LiquidityWrapper, Container } from './styled'

export interface LiquidityProps {
  liquidity: BigNumber
}

const Liquidity: React.FunctionComponent<LiquidityProps> = () => {
  // const displayLiquidity =
  //   liquidity && liquidity.gt(0) ? (
  //     `$${Number(liquidity).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
  //   ) : (
  //     <Skeleton width={60} />
  //   )
  const { t } = useTranslation()

  const [isDark] = useThemeManager()
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('Total value of the funds in this farm’s liquidity pool'),
    { placement: 'top-end', tooltipOffset: [20, 10] },
  )

  return (
    <Container ref={targetRef}>
      <LiquidityWrapper>
        {/* <Text fontSize="16px">{displayLiquidity}</Text>
        <Text fontSize="12px">~ 0 USD</Text> */}
        <Text fontSize="21px" color={isDark ? '#fff' : '#060514'}>
          10000000 CRSS
        </Text>
        <Text fontSize="17px" color={isDark ? '#bfc8da' : '#818ea3'}>
          ~ 285,454,728 USD
        </Text>
      </LiquidityWrapper>
      {tooltipVisible && tooltip}
    </Container>
  )
}

export default Liquidity
