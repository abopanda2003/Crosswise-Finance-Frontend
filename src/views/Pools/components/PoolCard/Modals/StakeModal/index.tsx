import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import {
  Modal,
  Text,
  Box,
  Flex,
  Image,
  Button,
  Slider,
  BalanceInput,
  AutoRenewIcon,
  Link,
  SectorIcon,
} from '@crosswise/uikit'
import { ExpandButton } from 'components/Modal'
import { Panel, TransparentInput } from 'components/ApyCalculatorModal/styled'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'
import useTheme from 'hooks/useTheme'
import useToast from 'hooks/useToast'
import BigNumber from 'bignumber.js'
import { getFullDisplayBalance, formatNumber, getDecimalAmount } from 'utils/formatBalance'
import { Pool } from 'state/types'
import { getAddress } from 'utils/addressHelpers'
import PercentageButton from '../PercentageButton'
import { ModalContainer, ModalHeader } from './styled'

import useUnstakeFarms from '../../../../../Farms/hooks/useUnstakeFarms'
import useStakeFarms from '../../../../../Farms/hooks/useStakeFarms'
import AprButton from '../AprButton'

interface StakeModalProps {
  isBnbPool: boolean
  pool: Pool
  stakingTokenBalance: BigNumber
  stakingTokenPrice: number
  isRemovingStake?: boolean
  onDismiss?: () => void
}

const StyledLink = styled(Link)`
  width: 100%;
`

const StakeModal: React.FC<StakeModalProps> = ({
  isBnbPool,
  pool,
  stakingTokenBalance,
  stakingTokenPrice,
  isRemovingStake = false,
  onDismiss,
}) => {
  const { sousId, stakingToken, userData, stakingLimit, earningToken } = pool
  const { t } = useTranslation()
  const { account, library } = useWeb3React()
  const { theme } = useTheme()
  const isCrssManual = sousId === 0
  const { onStake } = useStakeFarms(0)
  const { onUnstake } = useUnstakeFarms(0)
  // const { onStake } = useStakePool(sousId, isBnbPool)
  // const { onUnstake } = useUnstakePool(sousId, pool.enableEmergencyWithdraw)
  const { toastSuccess, toastError } = useToast()
  const [pendingTx, setPendingTx] = useState(false)
  const [stakeAmount, setStakeAmount] = useState('')
  const [hasReachedStakeLimit, setHasReachedStakedLimit] = useState(false)
  const [percent, setPercent] = useState(0)

  const getCalculatedStakingLimit = () => {
    if (isRemovingStake) {
      return userData.stakedBalance
    }
    return stakingLimit.gt(0) && stakingTokenBalance.gt(stakingLimit) ? stakingLimit : stakingTokenBalance
  }

  const usdValueStaked = stakeAmount && formatNumber(new BigNumber(stakeAmount).times(stakingTokenPrice).toNumber())

  useEffect(() => {
    if (stakingLimit.gt(0) && !isRemovingStake) {
      const fullDecimalStakeAmount = getDecimalAmount(new BigNumber(stakeAmount), stakingToken.decimals)
      setHasReachedStakedLimit(fullDecimalStakeAmount.plus(userData.stakedBalance).gt(stakingLimit))
    }
  }, [stakeAmount, stakingLimit, userData, stakingToken, isRemovingStake, setHasReachedStakedLimit])

  const handleStakeInputChange = (input: string) => {
    if (input) {
      const convertedInput = getDecimalAmount(new BigNumber(input), stakingToken.decimals)
      const percentage = Math.floor(convertedInput.dividedBy(getCalculatedStakingLimit()).multipliedBy(100).toNumber())
      setPercent(Math.min(percentage, 100))
    } else {
      setPercent(0)
    }
    setStakeAmount(input)
  }

  const handleChangePercent = (sliderPercent: number) => {
    if (sliderPercent > 0) {
      const percentageOfStakingMax = getCalculatedStakingLimit().dividedBy(100).multipliedBy(sliderPercent)
      const amountToStake = getFullDisplayBalance(percentageOfStakingMax, stakingToken.decimals, stakingToken.decimals)
      setStakeAmount(amountToStake)
    } else {
      setStakeAmount('')
    }
    setPercent(sliderPercent)
  }

  const handleConfirmClick = async () => {
    setPendingTx(true)

    if (isRemovingStake) {
      // unstaking
      try {
        if (isCrssManual) {
          // await onUnstake(stakeAmount, library)
          await onUnstake(stakeAmount)
        } else {
          console.log('other type pool unstake')
          // await onUnstake(stakeAmount, stakingToken.decimals)
        }
        toastSuccess(
          `${t('Unstaked')}!`,
          t('Your %symbol% earnings have also been harvested to your wallet!', {
            symbol: earningToken.symbol,
          }),
        )
        setPendingTx(false)
        onDismiss()
      } catch (e) {
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setPendingTx(false)
      }
    } else {
      try {
        // staking
        if (isCrssManual) {
          await onStake(stakeAmount, library, '', true, false)
        } else {
          // await onStake(stakeAmount, stakingToken.decimals)
          console.log('other type pool stake')
        }

        toastSuccess(
          `${t('Staked')}!`,
          t('Your %symbol% funds have been staked in the pool!', {
            symbol: stakingToken.symbol,
          }),
        )
        setPendingTx(false)
        onDismiss()
      } catch (e) {
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setPendingTx(false)
      }
    }
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.valid) {
      handleStakeInputChange(e.currentTarget.value.replace(/,/g, '.'))
    }
  }

  return (
    <Modal title=" " width="346px" noPadding onDismiss={onDismiss}>
      <ModalHeader>
        <Text fontSize="18px" fontWeight="700" mr="12px" color="bluePalette.main">
          {isRemovingStake ? t('Unstake') : t('Stake in Pool')}
        </Text>
        <SectorIcon ml={3} color="bluePalette.main" />
      </ModalHeader>
      <ModalContainer>
        {stakingLimit.gt(0) && !isRemovingStake && (
          <Text color="secondary" bold mb="24px" style={{ textAlign: 'center' }} fontSize="16px">
            {t('Max stake for this pool: %amount% %token%', {
              amount: getFullDisplayBalance(stakingLimit, stakingToken.decimals, 0),
              token: stakingToken.symbol,
            })}
          </Text>
        )}
        <Flex alignItems="center" justifyContent="space-between" my="12px">
          <Text fontSize="16px" color="primaryGray">
            {isRemovingStake ? t('Unstake') : t('Stake')}:
          </Text>
          <Flex alignItems="center">
            <Text fontSize="17px" mr="10px" color="primaryGray" bold>
              {stakingToken.symbol}
            </Text>
            <Box width="26px">
              <Image
                src={`/images/tokens/${getAddress(stakingToken.address)}.png`}
                width={26}
                height={26}
                alt={stakingToken.symbol}
              />
            </Box>
          </Flex>
        </Flex>

        <Panel flexDirection="column">
          <Box width="100%" mt="24px">
            <TransparentInput type="number" placeholder="0.00" value={stakeAmount} onChange={handleChange} />
          </Box>

          <Text fontSize="11px" fontWeight="600" color="primaryGray" textTransform="uppercase" mt="4px">
            {stakingToken.symbol}
          </Text>
        </Panel>

        {/* <BalanceInput
          value={stakeAmount}
          onUserInput={handleStakeInputChange}
          currencyValue={stakingTokenPrice !== 0 && `~${usdValueStaked || 0} USD`}
          isWarning={hasReachedStakeLimit}
          decimals={stakingToken.decimals}
        /> */}
        {hasReachedStakeLimit && (
          <Text color="failure" fontSize="12px" style={{ textAlign: 'right' }} mt="4px">
            {t('Maximum total stake: %amount% %token%', {
              amount: getFullDisplayBalance(new BigNumber(stakingLimit), stakingToken.decimals, 0),
              token: stakingToken.symbol,
            })}
          </Text>
        )}
        <Text color="primaryGray" fontSize="11px" fontWeight="600" my="12px">
          {t('Balance: %balance%', {
            balance: getFullDisplayBalance(getCalculatedStakingLimit(), stakingToken.decimals),
          })}
        </Text>
        <Slider
          min={0}
          max={100}
          value={percent}
          onValueChanged={handleChangePercent}
          name="stake"
          valueLabel={`${percent}%`}
          step={1}
        />
        <Flex alignItems="center" justifyContent="space-between" mt="16px">
          <PercentageButton onClick={() => handleChangePercent(25)}>25%</PercentageButton>
          <PercentageButton onClick={() => handleChangePercent(50)}>50%</PercentageButton>
          <PercentageButton onClick={() => handleChangePercent(75)}>75%</PercentageButton>
          <PercentageButton onClick={() => handleChangePercent(100)}>{t('Max')}</PercentageButton>
        </Flex>

        <Flex alignItems="center" justifyContent="space-between" mt="32px" mb="8px">
          <Text fontSize="10px" fontWeight="600" color="primaryGray" textTransform="uppercase">
            {t('Annual ROI at current rates:')}
          </Text>
          <AprButton pool={pool} />
        </Flex>

        <Button
          variant="primaryGradient"
          width="100%"
          isLoading={pendingTx}
          endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
          onClick={handleConfirmClick}
          disabled={!stakeAmount || parseFloat(stakeAmount) === 0 || hasReachedStakeLimit}
          mt="24px"
        >
          {pendingTx ? t('Confirming') : t('Confirm')}
        </Button>
      </ModalContainer>
      {!isRemovingStake && (
        <Link href="/swap" style={{ alignSelf: 'center', width: '100%' }}>
          <ExpandButton width="100%" title={t('Get %symbol%', { symbol: stakingToken.symbol })} />
        </Link>
      )}
    </Modal>
  )
}

export default StakeModal
