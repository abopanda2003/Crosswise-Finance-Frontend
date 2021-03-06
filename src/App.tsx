import React, { lazy } from 'react'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import { ResetCSS } from '@crosswise/uikit'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import { usePollBlockNumber } from 'state/block/hooks'
import { usePollCoreFarmData } from 'state/farms/hooks'
import { useFetchProfile } from 'state/profile/hooks'
import { DatePickerPortal } from 'components/DatePicker'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import { ToastListener } from './contexts/ToastsContext'
import PageLoader from './components/Loader/PageLoader'
import EasterEgg from './components/EasterEgg'
import BackgroundEffects from './components/BackgroundEffects'
import history from './routerHistory'
// Views included in the main bundle
import Pools from './views/Pools'
import OriginPools from './views/Pools/index1'
// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
const Trade = lazy(() => import('./views/Trade'))
// const FarmAuction = lazy(() => import('./views/FarmAuction'))
// const Lottery = lazy(() => import('./views/Lottery'))
const Referral = lazy(() => import('./views/Referral'))
// const Ifos = lazy(() => import('./views/Ifos'))
// const Info = lazy(() => import('./views/Info'))
const NotFound = lazy(() => import('./views/NotFound'))
// const Collectibles = lazy(() => import('./views/Collectibles'))
// const Teams = lazy(() => import('./views/Teams'))
// const Team = lazy(() => import('./views/Teams/Team'))
// const Profile = lazy(() => import('./views/Profile'))
// const TradingCompetition = lazy(() => import('./views/TradingCompetition'))
// const Predictions = lazy(() => import('./views/Predictions'))
// const Voting = lazy(() => import('./views/Voting'))
// const Proposal = lazy(() => import('./views/Voting/Proposal'))
// const CreateProposal = lazy(() => import('./views/Voting/CreateProposal'))
// const OrderBook = lazy(() => import('./views/OrderBook'))
// const Settings = lazy(() => import('./views/Settings'))
// Is this last? no
// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  usePollBlockNumber()
  useEagerConnect()
  useFetchProfile()
  usePollCoreFarmData()

  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <Menu>
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <BackgroundEffects starCounts={2} />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            {/* <Route exact path="/farms/auction">
              <FarmAuction />
            </Route> */}
            <Route path="/farms">
              <Farms />
            </Route>
            <Route path="/pools">
              <Pools />
            </Route>
            <Route path="/origin-pools">
              <OriginPools />
            </Route>
            {/* <Route path="/orderbook">
              <OrderBook />
            </Route> */}
            {/* <Route path="/lottery">
              <Lottery />
            </Route> */}
            {/* <Route path="/ifo">
              <Ifos />
            </Route> */}
            {/* <Route path="/info">
              <Info />
            </Route> */}
            {/* <Route path="/collectibles">
              <Collectibles />
            </Route> */}
            {/* <Route exact path="/teams">
              <Teams />
            </Route> */}
            {/* <Route path="/teams/:id">
              <Team />
            </Route> */}
            {/* <Route path="/profile">
              <Profile />
            </Route> */}
            {/* <Route path="/competition">
              <TradingCompetition />
            </Route> */}
            {/* <Route path="/prediction">
              <Predictions />
            </Route> */}
            {/* <Route exact path="/voting">
              <Voting />
            </Route> */}
            {/* <Route exact path="/voting/proposal/create">
              <CreateProposal />
            </Route> */}
            {/* <Route path="/voting/proposal/:id">
              <Proposal />
            </Route> */}
            {/* <Route path="/settings">
              <Settings />
            </Route> */}
            <Route exact path="/referral">
              <Referral />
            </Route>

            {/* Using this format because these components use routes injected props. We need to rework them with hooks */}
            <Route path="/exchange">
              <Trade />
            </Route>
            <Route path="/send">
              <Trade />
            </Route>
            <Route path="/liquidity">
              <Trade />
            </Route>
            <Route path="/create">
              <Trade />
            </Route>
            <Route path="/remove">
              <Trade />
            </Route>

            {/* Redirect */}
            <Route path="/pool">
              <Redirect to="/liquidity" />
            </Route>
            <Route path="/staking">
              <Redirect to="/pools" />
            </Route>
            <Route path="/syrup">
              <Redirect to="/pools" />
            </Route>
            {/* <Route path="/nft">
              <Redirect to="/collectibles" />
            </Route> */}

            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </SuspenseWithChunkError>
      </Menu>
      <EasterEgg iterations={2} />
      <ToastListener />
      <DatePickerPortal />
    </Router>
  )
}

export default React.memo(App)
