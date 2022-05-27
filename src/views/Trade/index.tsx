import React, { useCallback, useEffect, useMemo, useState, lazy } from 'react'
import { Box, Flex, TabMenu, Tab } from '@crosswise/uikit'
import { Route, useRouteMatch, useHistory } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import { BuyWidget } from 'components/BuyWidget'
import Swap from '../Swap'
import Page from '../Page'
import { BuyWidgetContainer, SwapRow, StyledCard, Wrapper } from './shared'
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity,
} from '../AddLiquidity/redirects'
import RedirectOldRemoveLiquidityPathStructure from '../RemoveLiquidity/redirects'
import { RedirectPathToSwapOnly, RedirectToSwap } from '../Swap/redirects'
import CoinPriceCard from './CoinPriceCard'
import TokenCard from './TokenCard'

const AddLiquidity = lazy(() => import('../AddLiquidity'))
const Liquidity = lazy(() => import('../Pool'))
const PoolFinder = lazy(() => import('../PoolFinder'))
const RemoveLiquidity = lazy(() => import('../RemoveLiquidity'))

export default function Trade() {
  const { t } = useTranslation()
  const { path, url } = useRouteMatch()
  const history = useHistory()
  const [subTitle, setSubTitle] = useState('')
  const [tabIndex, setTabIndex] = useState(0)

  useEffect(() => {
    if (path.startsWith('/swap')) {
      setSubTitle(t('Cross-Chain DEX 2.0'))
      setTabIndex(0)
    } else if (path.startsWith('/liquidity')) {
      setSubTitle(t('Add liquidity to receive LP tokens'))
      setTabIndex(1)
    } else {
      setSubTitle('')
      setTabIndex(0)
    }
  }, [path, t])

  const handleTabClick = (idx: number) => {
    if (tabIndex === idx) return

    if (idx === 0) history.push('/swap')
    else if (idx === 1) history.push('/liquidity')
  }

  return (
    <Page subTitle={subTitle}>
      <Box ml="40px" style={{ maxWidth: '520px' }}>
        <TabMenu activeIndex={tabIndex} variant="primaryGradient" onItemClick={handleTabClick} fullWidth>
          <Tab>{t('Exchange')}</Tab>
          <Tab>{t('Liquidity')}</Tab>
          <Tab>{t('Bridge')}</Tab>
        </TabMenu>
      </Box>
      <Flex width="100%" justifyItems="stretch">
        <Flex width="100%" flexDirection="column">
          <Box style={{ flex: 1 }}>
            <Route exact strict path="/exchange" component={Swap} />
            <Route exact strict path="/exchange/:outputCurrency" component={RedirectToSwap} />
            <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
            <Route exact strict path="/liquidity/find" component={PoolFinder} />
            <Route exact strict path="/liquidity" component={Liquidity} />
            <Route exact strict path="/create" component={RedirectToAddLiquidity} />
            <Route exact path="/liquidity/add" component={AddLiquidity} />
            <Route exact path="/liquidity/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path="/liquidity/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
            <Route exact path="/create" component={AddLiquidity} />
            <Route exact path="/create/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path="/create/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
            <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
            <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
          </Box>
          <TokenCard />
        </Flex>

        <BuyWidgetContainer>
          <BuyWidget />
        </BuyWidgetContainer>
      </Flex>

      <CoinPriceCard />
    </Page>
  )
}
