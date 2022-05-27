import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { Text, Flex, useModal } from '@crosswise/uikit'
import { useThemeManager } from 'state/user/hooks'
import { Pool } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import SvgButton from 'components/SvgButton'
import { IconApr } from 'components/SvgIcons'
import ApyCalculatorModal from 'components/ApyCalculatorModal'
import { getAprData } from 'views/Pools/helpers'
import { getAddress } from 'utils/addressHelpers'
import Header from './Header'
import Footer from './Footer'
import {
  Container,
  Content,
  EarnedContainer,
  EarnedBox,
  Divider,
  Overview,
  OverviewItemBox,
  OverviewItem,
  BtnContainer,
  FullWBtn,
  ButtonsContainer,
} from './styled'

interface CardItemProps {
  pool: Pool
  performanceFee?: number
}

const CardItem: React.FC<CardItemProps> = ({ pool, performanceFee = 0 }) => {
  const { account } = useWeb3React()
  const [isDark] = useThemeManager()
  const { t } = useTranslation()

  const { stakingToken, earningToken, isFinished, apr, earningTokenPrice, isAutoVault } = pool

  const { apr: earningsPercentageToDisplay, roundingDecimals, compoundFrequency } = getAprData(pool, performanceFee)

  const apyModalLink = stakingToken.address ? `/swap?outputCurrency=${getAddress(stakingToken.address)}` : '/swap'

  const [onOpenAprCalcModal] = useModal(
    <ApyCalculatorModal
      symbol={stakingToken.symbol}
      tokenPrice={earningTokenPrice}
      apr={apr}
      linkLabel={t('Get %symbol%', { symbol: stakingToken.symbol })}
      linkHref={apyModalLink}
      earningTokenSymbol={earningToken.symbol}
      roundingDecimals={roundingDecimals}
      compoundFrequency={compoundFrequency}
      performanceFee={performanceFee}
    />,
  )

  return (
    <Container isDarkTheme={isDark}>
      <Header pool={pool} />

      <Content>
        <Overview>
          <OverviewItem>
            <Text bold fontSize="13px" lineHeight="15px" color="primaryGray">
              {t('Total Liquidity')}
            </Text>
            <Text mt="7px">$285,454,728</Text>
          </OverviewItem>

          <OverviewItemBox>
            <OverviewItem>
              <Text bold fontSize="13px" lineHeight="15px" color="primaryGray">
                {t('Apr')}
              </Text>
              <Text mt="7px">65%</Text>
            </OverviewItem>
            <BtnContainer>
              <SvgButton onClick={onOpenAprCalcModal}>
                <IconApr />
              </SvgButton>
            </BtnContainer>
          </OverviewItemBox>

          <OverviewItem alignItems="flex-end">
            <Text bold fontSize="13px" lineHeight="15px" color="primaryGray">
              {t('Staked')}
            </Text>
            <Text mt="7px">2845 CRSS</Text>
            <Text color="primaryGray" fontWeight="600" fontSize="11px" mt="7px">
              ~ 6,200 USD
            </Text>
          </OverviewItem>
        </Overview>

        {!!account && (
          <EarnedContainer isDarkTheme={isDark}>
            <EarnedBox>
              <Text
                color={isDark ? 'textSubtle' : 'primaryGray'}
                fontSize="11px"
                fontWeight="600"
                textTransform="uppercase"
              >
                {t('XCRSS Earned')}
              </Text>
              <Flex justifyContent="center">
                <Text
                  mt="10px"
                  gradient={isDark ? undefined : 'btngradprimary'}
                  color="white"
                  fontWeight="600"
                  letterSpacing="0.4px"
                >
                  3,100
                </Text>
              </Flex>
              <Text color="primaryGray" fontSize="13px" mt="7px">
                {t('~ 3,100 USD')}
              </Text>
            </EarnedBox>

            <Divider />

            <EarnedBox>
              <Text
                color={isDark ? 'textSubtle' : 'primaryGray'}
                fontSize="11px"
                fontWeight="600"
                textTransform="uppercase"
              >
                {t('XCRSS Earned')}
              </Text>
              <Flex justifyContent="center">
                <Text
                  mt="10px"
                  gradient={isDark ? undefined : 'btngradprimary'}
                  color="white"
                  fontWeight="600"
                  letterSpacing="0.4px"
                >
                  3,100
                </Text>
              </Flex>
              <Text color="primaryGray" fontSize="13px" mt="7px">
                {t('~ 3,100 USD')}
              </Text>
            </EarnedBox>
          </EarnedContainer>
        )}

        {!!account && (
          <ButtonsContainer>
            <FullWBtn variant={!isDark ? 'secondaryGradient' : 'primaryGradient'}>{t('Deposit')}</FullWBtn>
            <FullWBtn variant={!isDark ? 'secondaryGradient' : 'primaryGradient'}>{t('Withdraw')}</FullWBtn>
          </ButtonsContainer>
        )}
      </Content>

      <Footer />
    </Container>
  )
}

export default CardItem
