import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled, { css } from 'styled-components'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Heading, Flex, Image, Text, Button, Toggle } from '@crosswise/uikit'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import { useTranslation } from 'contexts/Localization'
import usePersistState from 'hooks/usePersistState'
import { useFetchPublicPoolsData, usePools, useFetchCakeVault, useCakeVault } from 'state/pools/hooks'

import useTVL from 'hooks/useTvl'
import usePoolTvl from 'hooks/usePoolTvl'

import { usePollFarmsData } from 'state/farms/hooks'
import { latinise } from 'utils/latinise'
import FlexLayout from 'components/Layout/Flex'
import Page from 'components/Layout/Page'
import Select, { OptionProps } from 'components/Select/Select'
import { Pool } from 'state/types'
import { useThemeManager } from 'state/user/hooks'
import Loading from 'components/Loading'
import PoolCard from './components/PoolCard'
import PoolTabButtons from './components/PoolTabButtons'

import PoolsTable from './components/PoolsTable/PoolsTable'
import ToggleView, { ViewMode } from './components/ToggleView/ToggleView'
import { getAprData, getCakeVaultEarnings } from './helpers'
import {
  CardLayout,
  PoolHeader,
  HeaderTopBar,
  PoolHeaderLayout,
  PoolHeadCard,
  FilterContainer,
  LabelWrapper,
  ControlStretch,
  ToggleWrapper,
  Planet1,
  Planet2,
  CardWrapper,
  InfoWrap,
  CardItem,
  CardItemLock,
  StakingToggle,
} from './styled'

const NUMBER_OF_POOLS_VISIBLE = 12

const Pools: React.FC = () => {
  const location = useLocation()
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { pools: poolsWithoutAutoVault, userDataLoaded } = usePools(account)
  const [stakedOnly, setStakedOnly] = usePersistState(false, { localStorageKey: 'pancake_pool_staked' })
  const [poolOption, setPoolOption] = useState(true)

  const totalTvl = useTVL()
  const farmTvl = usePoolTvl()

  const [numberOfPoolsVisible, setNumberOfPoolsVisible] = useState(NUMBER_OF_POOLS_VISIBLE)
  const [observerIsSet, setObserverIsSet] = useState(false)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const [viewMode, setViewMode] = usePersistState(ViewMode.TABLE, { localStorageKey: 'pancake_pool_view' })
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState('hot')
  const chosenPoolsLength = useRef(0)
  const [isDark] = useThemeManager()

  const [active, setActive] = useState(true)

  const {
    userData: { cakeAtLastUserAction, userShares },
    fees: { performanceFee },
    pricePerFullShare,
    totalCakeInVault,
  } = useCakeVault()
  const accountHasVaultShares = userShares && userShares.gt(0)
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100

  // TODO aren't arrays in dep array checked just by reference, i.e. it will rerender every time reference changes?
  const [finishedPools, openPools] = useMemo(
    () => partition(poolsWithoutAutoVault, (pool) => pool.isFinished),
    [poolsWithoutAutoVault],
  )
  const stakedOnlyFinishedPools = useMemo(
    () =>
      finishedPools.filter((pool) => {
        if (pool.isAutoVault) {
          return accountHasVaultShares
        }
        return pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)
      }),
    [finishedPools, accountHasVaultShares],
  )
  const stakedOnlyOpenPools = useMemo(
    () =>
      openPools.filter((pool) => {
        if (pool.isAutoVault) {
          return accountHasVaultShares
        }
        return pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)
      }),
    [openPools, accountHasVaultShares],
  )
  const hasStakeInFinishedPools = stakedOnlyFinishedPools.length > 0

  usePollFarmsData()
  useFetchPublicPoolsData()

  useEffect(() => {
    const showMorePools = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfPoolsVisible((poolsCurrentlyVisible) => {
          if (poolsCurrentlyVisible <= chosenPoolsLength.current) {
            return poolsCurrentlyVisible + NUMBER_OF_POOLS_VISIBLE
          }
          return poolsCurrentlyVisible
        })
      }
    }

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMorePools, {
        rootMargin: '0px',
        threshold: 1,
      })
      loadMoreObserver.observe(loadMoreRef.current)
      setObserverIsSet(true)
    }
  }, [observerIsSet])

  const showFinishedPools = location.pathname.includes('history')

  const handleChangeSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  const sortPools = (poolsToSort: Pool[]) => {
    switch (sortOption) {
      case 'apr':
        // Ternary is needed to prevent pools without APR (like MIX) getting top spot
        return orderBy(
          poolsToSort,
          (pool: Pool) => (pool.apr ? getAprData(pool, performanceFeeAsDecimal).apr : 0),
          'desc',
        )
      case 'earned':
        return orderBy(
          poolsToSort,
          (pool: Pool) => {
            if (!pool.userData || !pool.earningTokenPrice) {
              return 0
            }
            return pool.isAutoVault
              ? getCakeVaultEarnings(
                  account,
                  cakeAtLastUserAction,
                  userShares,
                  pricePerFullShare,
                  pool.earningTokenPrice,
                ).autoUsdToDisplay
              : pool.userData.pendingReward.times(pool.earningTokenPrice).toNumber()
          },
          'desc',
        )
      case 'totalStaked':
        return orderBy(
          poolsToSort,
          (pool: Pool) => (pool.isAutoVault ? totalCakeInVault.toNumber() : pool.totalStaked.toNumber()),
          'desc',
        )
      default:
        return poolsToSort
    }
  }

  let chosenPools
  if (showFinishedPools) {
    chosenPools = stakedOnly ? stakedOnlyFinishedPools : finishedPools
  } else {
    chosenPools = stakedOnly ? stakedOnlyOpenPools : openPools
  }

  if (searchQuery) {
    const lowercaseQuery = latinise(searchQuery.toLowerCase())
    chosenPools = chosenPools.filter((pool) =>
      latinise(pool.earningToken.symbol.toLowerCase()).includes(lowercaseQuery),
    )
  }

  chosenPools = sortPools(chosenPools).slice(0, numberOfPoolsVisible)
  chosenPoolsLength.current = chosenPools.length

  const cardLayout = (
    <CardLayout>
      {chosenPools.map((pool) =>
        pool.isAutoVault ? (
          // <CakeVaultCard key="auto-cake" pool={pool} showStakedOnly={stakedOnly} />
          <></>
        ) : (
          <PoolCard key={pool.sousId} pool={pool} account={account} />
        ),
      )}
    </CardLayout>
  )

  const tableLayout = <PoolsTable pools={chosenPools} account={account} userDataLoaded={userDataLoaded} />

  return (
    <>
      <PoolHeader>
        <HeaderTopBar>
          <Heading scale="xl" color="text" mb="32px" style={{ fontSize: '48px' }}>
            {t('Syrup Pools')}
          </Heading>

          <FilterContainer>
            <LabelWrapper>
              <Text>{t('Sort by')}</Text>
              <ControlStretch>
                <Select
                  options={[
                    {
                      label: t('Hot'),
                      value: 'hot',
                    },
                    {
                      label: t('APR'),
                      value: 'apr',
                    },
                    {
                      label: t('Earned'),
                      value: 'earned',
                    },
                    {
                      label: t('Total staked'),
                      value: 'totalStaked',
                    },
                  ]}
                  onChange={handleSortOptionChange}
                />
              </ControlStretch>
            </LabelWrapper>

            <PoolTabButtons
              stakedOnly={stakedOnly}
              setStakedOnly={setStakedOnly}
              hasStakeInFinishedPools={hasStakeInFinishedPools}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />

            <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />
          </FilterContainer>
        </HeaderTopBar>
        <Text fontSize="20px" color="textSecondary">
          {t('Simply stake tokens to earn. High APR, low risk.')}
        </Text>
      </PoolHeader>
      <PoolHeaderLayout>
        <PoolHeadCard isDarkTheme={isDark}>
          {/** start first block */}
          <InfoWrap>
            <CardWrapper>
              <CardItem>
                <div>
                  <img src="/images/cards.png" alt="Pancake illustration" />
                </div>
                <div style={{ paddingLeft: '5px' }}>
                  <Text fontSize="13px" color="textSecondary">
                    {t('TOTAL LIQUIDITY')}
                  </Text>
                  <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <Text fontSize="20px" color="textSecondary">
                      ${farmTvl.toFixed(2)}
                    </Text>
                  </div>
                </div>
              </CardItem>
              <CardItemLock>
                <div>
                  <img src="/images/locked.png" alt="Pancake illustration" />
                </div>
                <div style={{ paddingLeft: '5px' }}>
                  <Text fontSize="13px" color="textSecondary">
                    {t('TOTAL VALUE LOCKED')}
                  </Text>
                  <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <Text fontSize="20px" color="textSecondary">
                      ${totalTvl.toFixed(2)}
                    </Text>
                  </div>
                </div>
              </CardItemLock>
            </CardWrapper>

            <StakingToggle>
              {/* <ToggleWrapper>
                <Text fontSize="14px" pr="15px" color="textSecondary">
                  {t('Vesting')}
                </Text>
                <Toggle checked={vesting} scale="sm" onChange={() => setVesting(!vesting)} />
              </ToggleWrapper>

              <ToggleWrapper>
                <Text fontSize="14px" pr="15px" color="textSecondary">
                  {t('Auto-compound')}
                </Text>
                <Toggle checked={autoCompound} scale="sm" onChange={() => setAutoCompound(!autoCompound)} />
              </ToggleWrapper> */}

              <ToggleWrapper>
                <Text fontSize="14px" pr="15px" color="textSecondary">
                  {' '}
                  {t('Staked only')}
                </Text>
                <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} scale="sm" />
              </ToggleWrapper>
            </StakingToggle>
          </InfoWrap>

          {/** end first block */}

          {/** start second block  */}
          {/* <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '40px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: '5px' }}>
                <Text color="textSecondary" fontSize="13px">
                  {t('TOTAL BALANCE')}
                </Text>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <Text color="primary" fontSize="32px" pr="8px">
                  0.000
                </Text>
                <Text color="text" fontSize="13px" mr="24px">
                  ~$0.00
                </Text>
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <Button variant="primaryGradient" mr="24px">
                {t('Claim')}
              </Button>
            </div>
          </div> */}
          {/** end second block */}
        </PoolHeadCard>
        <Planet1>
          <img src="/images/planet/p1.png" alt="planet1" />
        </Planet1>
        <Planet2>
          <img src="/images/planet/p2.png" alt="planet2" />
        </Planet2>
      </PoolHeaderLayout>
      <Page>
        {showFinishedPools && (
          <Text fontSize="20px" color="failure" pb="32px">
            {t('These pools are no longer distributing rewards. Please unstake your tokens.')}
          </Text>
        )}
        {account && !userDataLoaded && stakedOnly && (
          <Flex justifyContent="center" mb="4px">
            <Loading />
          </Flex>
        )}
        {viewMode === ViewMode.CARD ? cardLayout : tableLayout}
        <div ref={loadMoreRef} />
      </Page>
    </>
  )
}

export default Pools
