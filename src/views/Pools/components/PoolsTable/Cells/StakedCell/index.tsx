import { Box, Flex, Skeleton, Text, useMatchBreakpoints } from '@crosswise/uikit'
import BigNumber from 'bignumber.js'
import Balance from 'components/Balance'
import { useTranslation } from 'contexts/Localization'
import React from 'react'
import { Pool } from 'state/types'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceNumber } from 'utils/formatBalance'
import { CellContent } from '../BaseCell'
import { StyledCell } from './styled'

interface StakedCellProps {
  pool: Pool
  account: string
  userDataLoaded: boolean
}

const StakedCell: React.FC<StakedCellProps> = ({ pool, account, userDataLoaded }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()

  // vault
  //   const {
  //     userData: { isLoading: vaultUserDataLoading, userShares },
  //     pricePerFullShare,
  //   } = useVaultPoolByKey(pool.vaultKey)
  //   const hasSharesStaked = userShares && userShares.gt(0)
  //   const isVaultWithShares = pool.vaultKey && hasSharesStaked
  //   const { cakeAsBigNumber, cakeAsNumberBalance } = convertSharesToCake(userShares, pricePerFullShare)

  // pool
  const { stakingTokenPrice, stakingToken, userData } = pool
  //   const stakedAutoDollarValue = getBalanceNumber(cakeAsBigNumber.multipliedBy(stakingTokenPrice), stakingToken.decimals)
  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO
  const stakedTokenBalance = getBalanceNumber(stakedBalance, stakingToken.decimals)
  const stakedTokenDollarBalance = getBalanceNumber(
    stakedBalance.multipliedBy(stakingTokenPrice),
    stakingToken.decimals,
  )

  const labelText = `${pool.stakingToken.symbol} ${t('Staked')}`

  const hasStaked = stakedBalance.gt(0)

  const userDataLoading = !userDataLoaded

  return (
    <StyledCell role="cell">
      <CellContent>
        <Text fontSize="12px" color="textSubtle" textAlign="left">
          {labelText}
        </Text>
        {userDataLoading && account ? (
          <Skeleton width="80px" height="16px" />
        ) : (
          <>
            <Flex>
              <Box mr="8px" height="32px">
                <Balance
                  mt="4px"
                  bold={!isMobile}
                  fontSize={isMobile ? '14px' : '16px'}
                  color={hasStaked ? 'primary' : 'textDisabled'}
                  decimals={hasStaked ? 5 : 1}
                  //   value={
                  //     pool.vaultKey ? (Number.isNaN(cakeAsNumberBalance) ? 0 : cakeAsNumberBalance) : stakedTokenBalance
                  //   }
                  value={stakedTokenBalance}
                />
                {hasStaked ? (
                  <Balance
                    display="inline"
                    fontSize="12px"
                    color="textSubtle"
                    decimals={2}
                    prefix="~"
                    // value={pool.vaultKey ? stakedAutoDollarValue : stakedTokenDollarBalance}
                    value={stakedTokenDollarBalance}
                    unit=" USD"
                  />
                ) : (
                  <Text mt="4px" fontSize="12px" color="textDisabled">
                    0 USD
                  </Text>
                )}
              </Box>
            </Flex>
          </>
        )}
      </CellContent>
    </StyledCell>
  )
}

export default StakedCell
