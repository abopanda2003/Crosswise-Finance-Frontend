import React from 'react'
import { Flex, Heading, Text, Link } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useWeb3React } from '@web3-react/core'
import CompositeImage from '../CompositeImage'
import {
  BgWrapper,
  StyledSunburst,
  Wrapper,
  FloatingPancakesWrapper,
  TopLeftImgWrapper,
  BottomRightImgWrapper,
  topLeftImage,
  bottomRightImage,
} from './styled'

const Footer = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()

  return (
    <>
      <BgWrapper>
        <Flex alignItems="center" justifyContent="center" width="100%" height="100%">
          <StyledSunburst />
        </Flex>
      </BgWrapper>
      <FloatingPancakesWrapper>
        <TopLeftImgWrapper>
          <CompositeImage {...topLeftImage} maxHeight="256px" />
        </TopLeftImgWrapper>
        <BottomRightImgWrapper>
          <CompositeImage {...bottomRightImage} maxHeight="256px" />
        </BottomRightImgWrapper>
      </FloatingPancakesWrapper>
      <Wrapper>
        <Heading mb="24px" scale="xl" color="white">
          {t('Start in seconds.')}
        </Heading>
        <Text textAlign="center" color="white">
          {t('Connect your crypto wallet to start using the app in seconds.')}
        </Text>
        <Text mb="24px" bold color="white">
          {t('No registration needed.')}
        </Text>

        <Link external href="https://docs.pancakeswap.finance/">
          {t('Learn how to start')}
        </Link>
        {!account && <ConnectWalletButton mt="24px" />}
      </Wrapper>
    </>
  )
}

export default Footer
