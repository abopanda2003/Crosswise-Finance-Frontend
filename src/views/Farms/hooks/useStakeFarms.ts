import { useCallback } from 'react'
import { stakeFarm } from 'utils/calls'
import { useMasterchef } from 'hooks/useContract'
// import { sendTransactionByBiconomy } from 'utils/useBiconomy'
// import masterChef from 'config/abi/masterchef.json'
// import { useWeb3React } from '@web3-react/core'
// import { DEFAULT_REFERRER_ADDRESS, DEFAULT_TOKEN_DECIMAL } from 'config'
// import BigNumber from 'bignumber.js'

const useStakeFarms = (pid: number) => {
  const masterChefContract = useMasterchef()
  // const { account } = useWeb3React()

  const handleStake = useCallback(
    async (amount: string, library: any, referrer?: string, isVest?: boolean, isAuto?: boolean) => {
      try {
        const txHash = await stakeFarm(masterChefContract, pid, amount, referrer, isVest, isAuto)
        const receipt = await txHash.wait()
        return receipt.status
      } catch (e) {
        return false
      }
    },
    [masterChefContract, pid],
  )

  // const handleStake = useCallback(
  //   async (amount: string, library: any, referrer?: string, isVest?: boolean, isAuto?: boolean) => {
  //     let referrerAddress = referrer
  //     const tokenAmount = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  //     if (!referrer) referrerAddress = DEFAULT_REFERRER_ADDRESS
  //     // if (!isVest) isVest = false
  //     // if (!isAuto) isAuto = false
  //     // const txHash = await stakeFarm(masterChefContract, pid, amount, referrer)
  //     const txHash = await sendTransactionByBiconomy(
  //       library,
  //       masterChefContract.address,
  //       masterChef,
  //       account,
  //       'deposit',
  //       [pid, tokenAmount, referrerAddress, isVest, isAuto],
  //     )
  //   },
  //   [pid, masterChefContract, account],
  // )

  return { onStake: handleStake }
}

export default useStakeFarms
