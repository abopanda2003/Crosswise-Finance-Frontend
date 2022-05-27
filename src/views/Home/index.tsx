import React from 'react'
// import useTheme from 'hooks/useTheme'
import Row from 'components/Layout/Row'
import { AutoColumn } from 'components/Layout/Column'
import { Heading, useMatchBreakpoints } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
// import FarmCard from './components/FarmCard'
// import LotteryCard from './components/LotteryCard'
// import LiquidityCard from './components/LiquidityCard'
// import BreakDownCard from './components/BreakDownCard'
// import StatisticCard from './components/StatisticCard'
// import ReferUserCard from './components/ReferUserCard'
// import AccountAreaCard from './components/AccountAreaCard'
import Chart from './components/BasicChart'
import AboutCrss from './components/AboutCrss'
import Header from './components/Header'
import SocialLink from './components/SocialLink'
import Balances from './components/Balances'
import CardsArea from './components/CardsArea'
import { StyledPage, Label, StyledRow } from './styled'

const Home: React.FC = () => {
  // const { theme } = useTheme()
  // const { account } = useWeb3React()
  const { t } = useTranslation()
  const { isXs, isSm } = useMatchBreakpoints()
  const isMobile = isXs || isSm
  return (
    <>
      <StyledPage>
        <Row justify="center">
          <AutoColumn justify="center">
            <Heading as="h1" scale="xxl" mb="24px" color="text">
              <Header />
            </Heading>
            <Label color="primaryText" fontSize="20px" textAlign="center">
              {t('Cross-Chain DEX 2.0 With Built-In Tools & Gas Savings')}
            </Label>
            <SocialLink />
          </AutoColumn>
        </Row>
        <Row>
          <AboutCrss />
        </Row>
        <StyledRow>
          <Balances />
          <CardsArea />
        </StyledRow>
        {!isMobile && (
          <StyledRow>
            <Chart />
          </StyledRow>
        )}
        {/* <CardsRow>
          <FarmCard />
          <LotteryCard />
        </CardsRow>
        <CardsRow>
          <LiquidityCard />
          <BreakDownCard />
        </CardsRow>
        <CardsRow>
          <StatisticCard />
          <SubCardsRow>
            <ReferUserCard />
            <AccountAreaCard />
          </SubCardsRow>
        </CardsRow> */}
      </StyledPage>
    </>
  )
}

export default Home
