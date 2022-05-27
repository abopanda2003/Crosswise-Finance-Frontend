import React, { useState, useEffect } from 'react'

import { useTranslation } from 'contexts/Localization'
// import { Text, Toggle, Flex } from '@crosswise/uikit'
import { Text, Flex } from '@crosswise/uikit'
import { useThemeManager } from 'state/user/hooks'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
// import { insertThousandSeparator } from 'utils/other'
// import BigNumber from 'bignumber.js'
// import { getBalanceAmount } from 'utils/formatBalance'

import { getAddress } from 'utils/addressHelpers'
import { getBscScanLink } from 'utils'
// import { BIG_ZERO } from 'utils/bigNumber'

import HarvestAction from './HarvestAction'
// import StakedAction from './StakedAction'
import { AprProps } from '../Apr'
import { MultiplierProps } from '../Multiplier'
import { LiquidityProps } from '../Liquidity'
import { FarmOptionProps } from '../FarmOption'
import { DepositFeeProps } from '../DepositFee'
import {
  ActionPanelContainer as ActionContainer,
  ColumnWrap,
  Container,
  StyledLinkExternal,
  StakeContainer,
  InfoContainer,
  // OptionContainer,
  // ToggleWrapper,
  // ValueContainer,
  // ValueWrapper,
  EarnPanel,
  EarnPanelDivider,
} from './styled'

export interface ActionPanelProps {
  apr: AprProps
  multiplier: MultiplierProps
  liquidity: LiquidityProps
  details: FarmWithStakedValue
  userDataReady: boolean
  expanded: boolean
  depositFee: DepositFeeProps
  farmOption: FarmOptionProps
}

const ActionPanel: React.FunctionComponent<ActionPanelProps> = ({
  details,
  // apr,
  // multiplier,
  // liquidity,
  userDataReady,
  // depositFee,
  expanded,
  farmOption,
}) => {
  const farm = details
  const [autoVal, setAutoVal] = useState(false)
  const [vestVal, setVestVal] = useState(false)
  const [configFlag, setConfigFlag] = useState(false)

  const [isDark] = useThemeManager()

  useEffect(() => {
    if (!configFlag && userDataReady) {
      setConfigFlag(true)
      if (details.userData?.earnings === '0') {
        setVestVal(true)
      } else {
        setVestVal(farmOption.isVest)
      }
      setAutoVal(farmOption.isAuto)
    }
  }, [farmOption, userDataReady, details, configFlag])
  const { t } = useTranslation()
  // let stakedBalance = BIG_ZERO
  // const stakedBalanceBigNumber = new BigNumber(details.userData.stakedBalance)
  // If user didn't connect wallet default balance will be 0
  // if (!stakedBalanceBigNumber.isZero()) {
  //   stakedBalance = getBalanceAmount(stakedBalanceBigNumber)
  // }
  // const temp = !userDataReady || !stakedBalance.eq(0)

  const isActive = farm.multiplier !== '0X'
  const { quoteToken, token } = farm
  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('PANCAKE', '')
  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: quoteToken.address,
    tokenAddress: token.address,
  })
  const lpAddress = getAddress(farm.lpAddresses)
  const bsc = getBscScanLink(lpAddress, 'address')
  const info = `https://crosswise.info/pool/${lpAddress}`

  // const changeVest = () => {
  //   setVestVal(!vestVal)
  // }

  // const changeAuto = () => {
  //   setAutoVal(!autoVal)
  // }

  return (
    <ColumnWrap>
      <Container expanded={expanded}>
        <InfoContainer>
          {isActive && (
            <StakeContainer>
              <StyledLinkExternal href={`/liquidity/add/${liquidityUrlPathParts}`}>
                {t('Get %symbol%', { symbol: lpLabel })}
              </StyledLinkExternal>
            </StakeContainer>
          )}
          {/* <StyledLinkExternal href={bsc}>{t('View Contract')}</StyledLinkExternal>
          <StyledLinkExternal href={info}>{t('See Pair Info')}</StyledLinkExternal> */}
          <StyledLinkExternal href={bsc}>Price Impact</StyledLinkExternal>
          <StyledLinkExternal href={info}>Liquidity Provider Fee</StyledLinkExternal>
        </InfoContainer>
        {/* <ValueContainer>
          <ValueWrapper>
            <Text>{t('APR')}</Text>
            <Apr {...apr} />
          </ValueWrapper>
          <ValueWrapper>
            <Text>{t('Multiplier')}</Text>
            <Multiplier {...multiplier} />
          </ValueWrapper>
          <ValueWrapper>
            <Text>{t('Liquidity')}</Text>
            <Liquidity {...liquidity} />
          </ValueWrapper>
          <ValueWrapper>
            <Text>{t('Deposit Fee')}</Text>
            <DepositFee {...depositFee} />
          </ValueWrapper>
        </ValueContainer> */}
        <EarnPanel>
          <Flex flexDirection="column" justifyContent="space-between" alignItems="center">
            <Text fontSize="17px" pr="8px" color="#04f8ad">
              $CRSS Earned
            </Text>
            <Text fontSize="21px" mr="24px" color={isDark ? '#fff' : '#060514'}>
              {/* {insertThousandSeparator(CrssTokenEarned?.toFixed(2))} */}
              3,100
            </Text>
            <Text fontSize="13px" mr="24px" color={isDark ? '#bfc8da' : '#818ea3'}>
              {/* {`~ ${insertThousandSeparator(CrssTokenEarned?.toFixed(2))} USD`} */}~ 3,100 USD
            </Text>
          </Flex>
          <EarnPanelDivider />
          <Flex flexDirection="column" justifyContent="space-between" alignItems="center">
            <Text fontSize="17px" pr="8px" color="#04f8ad">
              $XCRSS Earned
            </Text>
            <Text fontSize="21px" mr="24px" color={isDark ? '#fff' : '#060514'}>
              {/* {insertThousandSeparator(CrssTokenEarned?.toFixed(2))} */}
              3,100
            </Text>
            <Text fontSize="13px" mr="24px" color={isDark ? '#bfc8da' : '#818ea3'}>
              {/* {`~ ${insertThousandSeparator(CrssTokenEarned?.toFixed(2))} USD`} */}~ 3,100 USD
            </Text>
          </Flex>
        </EarnPanel>

        <ActionContainer>
          {/* <StakedAction {...farm} userDataReady={userDataReady} isVest={vestVal} isAuto={autoVal} /> */}
          <HarvestAction {...farm} userDataReady={userDataReady} isVest={vestVal} isAuto={autoVal} />
        </ActionContainer>
      </Container>
      {/* <OptionContainer>
        <ToggleWrapper>
          <Text fontSize="14px" pr="15px">
            {t('Auto-compound')}
          </Text>
          <Toggle
            scale="sm"
            disabled={!userDataReady || !stakedBalance.eq(0)}
            checked={autoVal}
            onChange={() => changeAuto()}
          />
        </ToggleWrapper>

        <ToggleWrapper>
          <Text fontSize="14px" pr="15px">
            {t('Vesting')}
          </Text>
          /* <Toggle checked={vesting} scale="sm" onChange={() => setVesting(!vesting)} />
          <Toggle
            scale="sm"
            disabled={!userDataReady || !stakedBalance.eq(0)}
            checked={vestVal}
            onChange={() => changeVest()}
          />
        </ToggleWrapper>
      </OptionContainer> */}
    </ColumnWrap>
  )
}

export default ActionPanel
