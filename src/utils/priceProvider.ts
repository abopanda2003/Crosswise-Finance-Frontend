import Web3 from 'web3'
import * as ethers from 'ethers'
// import { Contract, utils } from 'ethers'
import { Contract } from 'ethers'
// import pancakeFactoryAbi from 'config/abi/pancakeSwapFactory.json'
// import { ROUTER_ADDRESS, ZERO_ADDRESS, PANCAKE_ROUTER_ADDRESS, CRSS_TOKEN_ADDRESS } from 'config/constants'
import { ROUTER_ADDRESS, PANCAKE_ROUTER_ADDRESS, CRSS_TOKEN_ADDRESS } from 'config/constants'
import tokenAbi from 'config/abi/erc20.json'
import routerABI from 'config/abi/pancakeRouter.json'
import { web3Provider, ethWeb3Provider, simpleRpcProvider, simpleRpcETHProvider } from './providers'

const routerAbi: any = routerABI
const bnbWeb3 = new Web3(web3Provider)
const pancakeRouterContract = new bnbWeb3.eth.Contract(routerAbi, PANCAKE_ROUTER_ADDRESS)
const crssRouterContract = new bnbWeb3.eth.Contract(routerAbi, ROUTER_ADDRESS)

const busdAddr = '0xe9e7cea3dedca5984780bafc599bd69add087d56'
const wBNBAddr = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'

const ethWeb3 = new Web3(ethWeb3Provider)
const uniV2: any = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
const uniRouterContract = new ethWeb3.eth.Contract(routerAbi, uniV2)
const daiAddr = '0x6b175474e89094c44da98b954eedeac495271d0f'
const wETHAddr = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'

export const getTokenPrice: any = async (tokenAddress) => {
  return new Promise((resolve) => {
    if (tokenAddress === wBNBAddr) {
      const path = [wBNBAddr, busdAddr]
      const routerContract = CRSS_TOKEN_ADDRESS === tokenAddress ? crssRouterContract : pancakeRouterContract
      routerContract.methods
        .getAmountsOut(bnbWeb3.utils.toBN(1 * 10 ** 18), path)
        .call()
        .then((data) => resolve(parseFloat(ethers.utils.formatUnits(`${data[data.length - 1]}`, 18))))
    } else {
      const path = [tokenAddress, wBNBAddr, busdAddr]
      const routerContract = CRSS_TOKEN_ADDRESS === tokenAddress ? crssRouterContract : pancakeRouterContract
      const tokenContract = new Contract(tokenAddress, tokenAbi, simpleRpcProvider)
      tokenContract.decimals().then((result) => {
        routerContract.methods
          .getAmountsOut(bnbWeb3.utils.toBN(1 * 10 ** result), path)
          .call()
          .then((data) => resolve(parseFloat(ethers.utils.formatUnits(`${data[data.length - 1]}`, 18))))
      })
    }
  })
}

export const getTokenPriceETH: any = (tokenAddress) => {
  return new Promise((resolve) => {
    if (tokenAddress === wETHAddr) {
      const path = [wETHAddr, daiAddr]
      const routerContract = uniRouterContract
      routerContract.methods
        .getAmountsOut(ethWeb3.utils.toBN(1 * 10 ** 18), path)
        .call()
        .then((data) => resolve(parseFloat(ethers.utils.formatUnits(`${data[data.length - 1]}`, 18))))
    } else {
      const path = [tokenAddress, wETHAddr, daiAddr]
      const routerContract = uniRouterContract
      const tokenContract = new Contract(tokenAddress, tokenAbi, simpleRpcETHProvider)
      tokenContract.decimals().then((result) => {
        routerContract.methods
          .getAmountsOut(bnbWeb3.utils.toBN(1 * 10 ** result), path)
          .call()
          .then((data) => resolve(parseFloat(ethers.utils.formatUnits(`${data[data.length - 1]}`, 18))))
      })
    }
  })
}
