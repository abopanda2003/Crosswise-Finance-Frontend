// import React, { useState, useCallback, useMemo, useEffect } from 'react'
import React, { useState, useMemo, useEffect } from 'react'
import BigNumber from 'bignumber.js'
import { Flex, Toggle } from '@crosswise/uikit'
// import { getAddress } from 'utils/addressHelpers'
// import { useAppDispatch } from 'state'
// import { fetchFarmUserDataAsync } from 'state/farms'
import { Farm } from 'state/types'
import { useTranslation } from 'contexts/Localization'
// import { useERC20 } from 'hooks/useContract'
// import ConnectWalletButton from 'components/ConnectWalletButton'
// import StakeAction from './StakeAction'
// import HarvestAction from './HarvestAction'
// import useApproveFarm from '../../hooks/useApproveFarm'
import {
  Action,
  ActionWrapper,
  OptionContainer,
  ToggleWrapper,
  ToggleNameText,
  StyledActionButton,
  // StyledConnectWalletButton,
} from './styled'

export interface FarmWithStakedValue extends Farm {
  apr?: number
}

export interface FarmCardActionsProps {
  farm: FarmWithStakedValue
  account?: string
  addLiquidityUrl?: string
}

const CardActions: React.FC<FarmCardActionsProps> = ({
  farm,
  account,
  // addLiquidityUrl
}) => {
  const { t } = useTranslation()
  // const [requestedApproval, setRequestedApproval] = useState(false)
  // const { pid, lpAddresses } = farm
  const {
    // allowance: allowanceAsString = 0,
    // tokenBalance: tokenBalanceAsString = 0,
    stakedBalance: stakedBalanceAsString = 0,
    // earnings: earningsAsString = 0,
  } = farm.userData || {}
  // const allowance = new BigNumber(allowanceAsString)
  // const tokenBalance = new BigNumber(tokenBalanceAsString)
  // const stakedBalance = new BigNumber(stakedBalanceAsString)

  const [autoVal, setAutoVal] = useState(false)
  const [vestVal, setVestVal] = useState(false)
  const [configFlag, setConfigFlag] = useState(false)
  const changeVest = () => {
    setVestVal(!vestVal)
  }
  const changeAuto = () => {
    setAutoVal(!autoVal)
  }

  useEffect(() => {
    if (!configFlag) {
      setConfigFlag(true)
      if (farm.userData?.earnings === '0') {
        setVestVal(true)
      } else {
        setVestVal(farm.userData.isVest)
      }
      setAutoVal(farm.userData.isAuto)
    }
  }, [farm, configFlag])

  const stakedBalance = useMemo(() => {
    return new BigNumber(stakedBalanceAsString)
  }, [stakedBalanceAsString])
  // const earnings = new BigNumber(earningsAsString)
  // const lpAddress = getAddress(lpAddresses)
  // const isApproved = account && allowance && allowance.isGreaterThan(0)
  // const dispatch = useAppDispatch()

  // const lpContract = useERC20(lpAddress)

  // const { onApprove } = useApproveFarm(lpContract)

  // const handleApprove = useCallback(async () => {
  //   try {
  //     setRequestedApproval(true)
  //     await onApprove()
  //     dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
  //     setRequestedApproval(false)
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }, [onApprove, dispatch, account, pid])

  const renderApprovalOrActionButton = () => {
    return (
      <>
        <ActionWrapper>
          <Flex justifyContent="space-between">
            <StyledActionButton width="40%" disabled variant="primaryGradient">
              Deposit
            </StyledActionButton>
            <StyledActionButton width="48%" disabled={!account} variant="primaryGradient">
              Withdraw
            </StyledActionButton>
            {/* {isApproved ? (
              <StakeAction
                stakedBalance={stakedBalance}
                tokenBalance={tokenBalance}
                tokenName={farm.lpSymbol}
                pid={pid}
                addLiquidityUrl={addLiquidityUrl}
                isVest={vestVal}
                isAuto={autoVal}
              />
            ) : (
              <StyledActionButton
                width="40%"
                disabled={requestedApproval}
                onClick={handleApprove}
                variant="primaryGradient"
              >
                {t('Approve')}
              </StyledActionButton>
            )}
            <HarvestAction earnings={earnings} pid={pid} isAuto={autoVal} /> */}
          </Flex>
        </ActionWrapper>

        {/* Auto Compound & Vesting trigger button start */}
        <OptionContainer>
          <ToggleWrapper>
            <ToggleNameText fontSize="14px" pr="15px">
              {t('Auto Compound')}
            </ToggleNameText>
            <Toggle
              scale="sm"
              disabled={!account || !stakedBalance.eq(0)}
              checked={autoVal}
              onChange={() => changeAuto()}
            />
          </ToggleWrapper>

          <ToggleWrapper>
            <ToggleNameText fontSize="14px" pr="15px">
              {t('Vesting')}
            </ToggleNameText>
            <Toggle
              scale="sm"
              disabled={!account || !stakedBalance.eq(0)}
              checked={vestVal}
              onChange={() => changeVest()}
            />
          </ToggleWrapper>
        </OptionContainer>
      </>
    )
  }

  return (
    <Action>
      {renderApprovalOrActionButton()}
      {/* {!account ? (
        <StyledConnectWalletButton variant="primaryGradient" mt="8px" width="100%" style={{ boxShadow: 'none' }} />
      ) : (
        renderApprovalOrActionButton()
      )} */}
    </Action>
  )
}

export default CardActions
