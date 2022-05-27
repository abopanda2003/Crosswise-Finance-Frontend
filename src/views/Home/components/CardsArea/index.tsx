import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Text,
  TokenPairImage,
  DropDownBottomIcon,
  DropDownUpIcon,
  Flex,
  LiquidityIcon,
  RewardsIcon,
  SectorIcon,
  WalletIcon,
  ClaimIcon,
  useMatchBreakpoints,
} from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import {
  Container,
  SubColumn,
  IconButton,
  TokenPairWrapper,
  StyledTitle,
  CardContent,
  StyledText,
  StyledButton,
} from './styled'
import CrssToken from '../SVGs/CrssToken.svg'
import BinanceToken from '../SVGs/BinanceToken.svg'

const CardsArea = () => {
  const [collapseLiquidity, setCollapseLiquidity] = React.useState(true)
  const [collapseRewards, setCollapseRewards] = React.useState(true)

  const { t } = useTranslation()
  const { isXs, isSm } = useMatchBreakpoints()
  const isMobile = isXs || isSm
  const collapseClicked = () => {
    setCollapseRewards(!collapseRewards)
    if (!isMobile) {
      setCollapseLiquidity(!collapseLiquidity)
    }
  }
  const collapseLiquidityClicked = () => {
    setCollapseLiquidity(!collapseLiquidity)
  }
  return (
    <Container>
      <SubColumn>
        <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
          <Text fontSize="10px" color="homeTitle" fontWeight={600} display="flex">
            {t('ADD LIQUIDITY')} &nbsp;
            <LiquidityIcon fill="primaryText" width="15px" />
          </Text>
          {isMobile && (
            <IconButton onClick={collapseLiquidityClicked}>
              {collapseLiquidity ? (
                <DropDownBottomIcon width="24px" mr={20} />
              ) : (
                <DropDownUpIcon width="24px" mr={20} />
              )}
            </IconButton>
          )}
        </Flex>
        <StyledTitle>
          <Text fontSize="26px" fontWeight={500} lineHeight="29px" mt={10}>
            {t('Receive LP Tokens')}
          </Text>
          <TokenPairWrapper>
            <TokenPairImage primarySrc={CrssToken} secondarySrc={BinanceToken} height={20} width={20} />
          </TokenPairWrapper>
        </StyledTitle>
        {!collapseLiquidity && (
          <CardContent>
            <Flex flexDirection="row" justifyContent="space-between">
              <Flex flexDirection="column" alignItems="center">
                <StyledText fontSize="13px" display="flex">
                  <WalletIcon fill="primaryText" width="15px" /> &nbsp; {t('Your Total Liquidity')}
                </StyledText>
                <StyledText fontSize="16px">10$ CRSS-BNB</StyledText>
                <StyledText fontSize="16px">400$ CRSS-BUSD</StyledText>
              </Flex>
              <Flex flexDirection="column" alignItems="center">
                <StyledText fontSize="13px" display="flex">
                  <SectorIcon fill="primaryText" width="15px" />
                  &nbsp; {t('Total Staked')}
                </StyledText>
                <StyledText fontSize="16px">5$ CRSS-BNB</StyledText>
                <StyledText fontSize="16px">4$ CRSS-BUSD</StyledText>
              </Flex>
            </Flex>
            <Flex justifyContent="end">
              <RouterLink to="/liquidity">
                <StyledButton variant="primaryGradient">{t('Add/Remove Liquidity')}</StyledButton>
              </RouterLink>
            </Flex>
          </CardContent>
        )}
      </SubColumn>
      <SubColumn>
        <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
          <Text fontSize="10px" fontWeight={600} color="homeTitle" display="flex">
            {t('EARN APR REWARDS')} &nbsp;
            <RewardsIcon fill="primaryText" width="15px" />
          </Text>
          <IconButton onClick={collapseClicked}>
            {collapseRewards ? <DropDownBottomIcon width="24px" mr={20} /> : <DropDownUpIcon width="24px" mr={20} />}
          </IconButton>
        </Flex>
        <Text fontSize="26px" fontWeight={500} lineHeight="29px" mt={10}>
          {t('Farms%Staking')}
        </Text>
        {!collapseRewards && (
          <CardContent>
            <Flex flexDirection="row" justifyContent="space-between">
              <Flex flexDirection="column" alignItems="center">
                <StyledText fontSize="13px" display="flex">
                  <ClaimIcon fill="primaryText" width="15px" /> &nbsp; {t('To Harvest')}
                </StyledText>
                <StyledText fontSize="16px">$10.99</StyledText>
              </Flex>
              <Flex flexDirection="column" alignItems="center">
                <StyledText fontSize="13px" display="flex">
                  <WalletIcon fill="primaryText" width="15px" />
                  &nbsp; {t('In Wallet')}
                </StyledText>
                <StyledText fontSize="16px">$10.99</StyledText>
              </Flex>
            </Flex>
            <Flex justifyContent="end">
              <RouterLink to="/farms">
                <StyledButton variant="primaryGradient">{t('Harvest')}</StyledButton>
              </RouterLink>
            </Flex>
          </CardContent>
        )}
      </SubColumn>
    </Container>
  )
}

export default CardsArea
