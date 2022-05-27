import { useCallback } from 'react'
import { unstakeFarm } from 'utils/calls'
import { useMasterchef } from 'hooks/useContract'
// import { sendTransactionByBiconomy } from 'utils/useBiconomy'
// import masterChef from 'config/abi/masterchef.json'
// import { useWeb3React } from '@web3-react/core'
// import { DEFAULT_TOKEN_DECIMAL } from 'config'
// import BigNumber from 'bignumber.js'

const useUnstakeFarms = (pid: number) => {
  const masterChefContract = useMasterchef()
  // const { account } = useWeb3React()

  const handleUnstake = useCallback(
    async (amount: string) => {
      try {
        const txHash = await unstakeFarm(masterChefContract, pid, amount)
        const receipt = await txHash.wait()
        return receipt.status
      } catch (e) {
        return false
      }
    },
    [masterChefContract, pid],
  )

  // const handleUnstake = useCallback(
  //   async (amount: string, library: any) => {
  //     const tokenAmount = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()

  //     const txHash = await sendTransactionByBiconomy(
  //       library,
  //       masterChefContract.address,
  //       masterChef,
  //       account,
  //       'withdraw',
  //       [pid, tokenAmount],
  //     )
  //   },
  //   [pid, masterChefContract, account],
  // )

  return { onUnstake: handleUnstake }
}

export default useUnstakeFarms
