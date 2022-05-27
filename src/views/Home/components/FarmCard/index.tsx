import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Heading, CardBody, Button } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import Row from 'components/Layout/Row'
import CrssHarvestBalance from '../FarmCardComponents/CrssHarvestBalance'
import CrssWalletBalance from '../FarmCardComponents/CrssWalletBalance'
import useFarmsWithBalance from '../../hooks/useFarmsWithBalance'
import { StyledFarmCard, StyledText, Block, Label, Actions } from './styled'

const FarmCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const farmsWithBalance = useFarmsWithBalance()
  const balancesWithValue = farmsWithBalance.farmsWithStakedBalance

  // const { onReward } = useHarvestFarm(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  // const harvestAllFarms = useCallback(async () => {
  //   setPendingTx(true)
  //   try {
  //     await onReward()
  //   } catch (error) {
  //     // TODO: find a way to handle when the user rejects transaction or it fails
  //   } finally {
  //     setPendingTx(false)
  //   }
  // }, [onReward])

  return (
    <StyledFarmCard background="none">
      <CardBody>
        <StyledText>Earn APR Rewards 🔥</StyledText>
        <Heading scale="xl" mb="24px" mt="16px">
          {`${t('Farms & Staking')}`}
        </Heading>
        <Row justify="space-between">
          <Block>
            <Label small color="textSubtle">
              {t('To Harvest')}:
            </Label>
            {/* <Text fontSize="30px" bold>
              0.000
            </Text> */}
            {/* <Label small color="textSubtle">
              ~$ 0.00
            </Label> */}
            <CrssHarvestBalance />
          </Block>
          <Block>
            <Label small color="textSubtle">
              {t('In Wallet')}:
            </Label>
            {/* <Text fontSize="30px" bold>
              0.000
            </Text>
            <Label small color="textSubtle">
              ~$ 0.00
            </Label> */}
            <CrssWalletBalance />
          </Block>
        </Row>
        <Actions>
          {/* {account ? (
            <Button>Account true</Button>
          ): (
            <Button>Accaount false</Button>
          )} */}
          <Button
            id="harvest-all"
            variant="primaryGradient"
            // disabled={balancesWithValue.length <= 0 || pendingTx}
            // variant={balancesWithValue.length <= 0 || pendingTx ? 'primary' : 'primaryGradient'}
            // onClick={harvestAllFarms}
          >
            {pendingTx ? t('Collecting CRSS') : t('Harvest all')}
          </Button>
        </Actions>
      </CardBody>
    </StyledFarmCard>
  )
}

export default FarmCard
