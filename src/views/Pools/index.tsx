import React, { useState, useRef, useMemo } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { Heading, Text, Tab, Flex, TabMenu, Button, Toggle, Dropdown, ExpandableButton } from '@crosswise/uikit'
import { useWeb3React } from '@web3-react/core'
import usePersistState from 'hooks/usePersistState'
import { usePools, useCakeVault } from 'state/pools/hooks'
import { latinise } from 'utils/latinise'
import { useTranslation } from 'contexts/Localization'
import { useThemeManager } from 'state/user/hooks'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import { Pool } from 'state/types'
import SvgButton from 'components/SvgButton'
import { IconSettingFull } from 'components/SvgIcons'
import SearchInput from 'components/SearchInput'
import Loading from 'components/Loading'

import {
  HeaderContainer,
  TitleBar,
  Container,
  TabBox,
  StatsContainer,
  StatsHeader,
  StatsBody,
  Section,
  ValueBar,
  ButtonGroup,
  Image,
  EarnedContainer,
  EarnedBox,
  Divider,
  FiltersContainer,
  FiltersHeader,
  FiltersHeaderLeft,
  SearchInputContainer,
  FiltersFooter,
  StatusFiltersContainer,
  FilterByContainer,
  ListContainer,
  CardView,
  ListView,
  FlexText,
} from './styled'
import ToggleViewMode, { ViewMode } from './components/ToggleViewMode'
import { getAprData, getCakeVaultEarnings } from './helpers'

import ListViewItem from './components/ListViewItem'
import CardItem from './components/CardItem'

const NUMBER_OF_POOLS_VISIBLE = 12

const Pools = () => {
  const location = useLocation()
  const history = useHistory()
  const { t } = useTranslation()
  const tabs = [t('Farm'), t('Pools')]
  const filterOpts = [
    {
      label: 'One',
      value: 1,
    },
    {
      label: 'Two',
      value: 2,
    },
    {
      label: 'Three',
      value: 3,
    },
  ]
  const { account } = useWeb3React()
  const [isDark] = useThemeManager()
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const { pools: poolsWithoutAutoVault, userDataLoaded } = usePools(account)
  const [stakedOnly, setStakedOnly] = usePersistState(false, { localStorageKey: 'pancake_pool_staked' })
  const [searchPoolsKey, setSearchPoolsKey] = useState('')
  const [filterOpt, setFilterOpt] = useState(null)
  const [viewMode, setViewMode] = useState(ViewMode.CARD)
  const [statsExpanded, setStatsExpanded] = useState(true)
  const [actived, setActived] = useState(false)
  const [finished, setFinished] = useState(false)
  const [sortOption] = useState('hot')
  const showFinishedPools = location.pathname.includes('history')
  const chosenPoolsLength = useRef(0)
  const [numberOfPoolsVisible] = useState(NUMBER_OF_POOLS_VISIBLE)

  const {
    userData: { cakeAtLastUserAction, userShares },
    fees: { performanceFee },
    pricePerFullShare,
    totalCakeInVault,
  } = useCakeVault()
  const accountHasVaultShares = userShares && userShares.gt(0)
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100

  const handleItemClick = (index: number) => {
    if (index !== 1) {
      history.push('/farms')
    }
  }

  const onHandleSetting = () => {
    // console.log('clicked setting')
  }

  const onToggleExpanded = () => {
    setStatsExpanded((prev) => {
      return !prev
    })
  }

  const onToggleActived = () => {
    setActived((prev) => {
      return !prev
    })
  }

  const onToggleFinished = () => {
    setFinished((prev) => {
      return !prev
    })
  }

  const onToggleStakedOnly = () => {
    setStakedOnly((prev) => {
      return !prev
    })
  }

  const onChanceSearchPoolsKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPoolsKey(e.target.value)
  }

  const onChangeFilterOpt = (item: any) => {
    setFilterOpt({ ...item })
  }

  const onChangeViewMode = (item: string) => {
    setViewMode(item)
  }

  // Initial logic

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

  let chosenPools
  if (showFinishedPools) {
    chosenPools = stakedOnly ? stakedOnlyFinishedPools : finishedPools
  } else {
    chosenPools = stakedOnly ? stakedOnlyOpenPools : openPools
  }

  if (searchPoolsKey) {
    const lowercaseQuery = latinise(searchPoolsKey.toLowerCase())
    chosenPools = chosenPools.filter((pool) =>
      latinise(pool.earningToken.symbol.toLowerCase()).includes(lowercaseQuery),
    )
  }

  chosenPools = sortPools(chosenPools).slice(0, numberOfPoolsVisible)
  chosenPoolsLength.current = chosenPools.length

  const listView = (
    <ListView>
      {chosenPools.map((pool) => (
        <ListViewItem key={pool.sousId} pool={pool} />
      ))}
    </ListView>
  )

  const cardView = (
    <CardView>
      {chosenPools.map((pool) => (
        <CardItem key={pool.sousId} pool={pool} />
      ))}
    </CardView>
  )

  return (
    <Container>
      <HeaderContainer>
        <TitleBar>
          <Heading
            scale="xxl"
            gradient={isDark ? undefined : 'btngradprimary'}
            color="white"
            mb="12px"
            style={{ fontSize: '57px' }}
          >
            {t('Pools')}
          </Heading>
          <Text>{t('Stake LP Tokens to Earn $CRSS')}</Text>
        </TitleBar>
      </HeaderContainer>

      <TabBox>
        <TabMenu activeIndex={1} onItemClick={handleItemClick} variant="primaryGradient" fullWidth>
          {tabs.map((tabText) => {
            return <Tab key={tabText}>{tabText}</Tab>
          })}
        </TabMenu>
      </TabBox>

      <StatsContainer isDarkTheme={isDark}>
        <StatsHeader>
          <SvgButton onClick={onHandleSetting}>
            <IconSettingFull />
          </SvgButton>

          <FlexText>
            <Image src="/images/chart.svg" alt="chart-img" />
            <Text bold>{t('Pools Stats')}</Text>
          </FlexText>

          <ExpandableButton direction={statsExpanded ? 'up' : 'down'} onClick={onToggleExpanded} />
        </StatsHeader>

        <StatsBody expanded={statsExpanded}>
          <Section>
            <ValueBar>
              <Text color="primaryGray" fontSize="13px" fontWeight="600">
                {t('Pending Rewards')}
              </Text>
              <Text bold mt="5px">
                6,200 CRSS
              </Text>
              <Text mt="5px" color="primaryGray">
                {t('~ 6,200 USD')}
              </Text>
            </ValueBar>

            {!!account && (
              <EarnedContainer isDarkTheme={isDark}>
                <EarnedBox>
                  <Flex justifyContent="center">
                    <Text
                      bold
                      color="textSubtle"
                      fontSize="13px"
                      lineHeight="16px"
                      letterSpacing="0.4px"
                      gradient={isDark ? undefined : 'btngradprimary'}
                    >
                      {t('$CRSS Earned')}
                    </Text>
                  </Flex>
                  <Text bold mt="15px">
                    3,100
                  </Text>
                  <Text color="primaryGray" fontSize="13px" mt="15px">
                    {t('~ 3,100 USD')}
                  </Text>
                </EarnedBox>

                <Divider />

                <EarnedBox>
                  <Flex justifyContent="center">
                    <Text
                      bold
                      color="textSubtle"
                      fontSize="13px"
                      lineHeight="16px"
                      letterSpacing="0.4px"
                      gradient={isDark ? undefined : 'btngradprimary'}
                    >
                      {t('$XCRSS Earned')}
                    </Text>
                  </Flex>
                  <Text bold mt="15px">
                    3,100
                  </Text>
                  <Text color="primaryGray" fontSize="13px" mt="15px">
                    {t('~ 3,100 USD')}
                  </Text>
                </EarnedBox>
              </EarnedContainer>
            )}

            <ValueBar>
              <Text color="primaryGray" fontSize="13px" fontWeight="600">
                {t('Total Staked')}
              </Text>
              <Text bold mt="5px">
                6,200 CRSS
              </Text>
              <Text mt="5px" color="primaryGray">
                {t('~ 6,200 USD')}
              </Text>
            </ValueBar>
          </Section>

          <ButtonGroup>
            <Button variant={!isDark ? 'secondaryGradient' : 'primaryGradient'} disabled={!account}>
              {t('Mass Harvest')}
            </Button>
          </ButtonGroup>
        </StatsBody>
      </StatsContainer>

      <FiltersContainer isDarkTheme={isDark}>
        <FiltersHeader>
          <FiltersHeaderLeft>
            <ToggleViewMode mode={viewMode} onChangeMode={onChangeViewMode} />

            <StatusFiltersContainer>
              <Button
                scale="sm"
                variant={actived ? 'primaryGradient' : 'primaryGradientOutline'}
                onClick={onToggleActived}
              >
                {t('Active')}
              </Button>
              <Button
                scale="sm"
                variant={finished ? 'primaryGradient' : 'primaryGradientOutline'}
                onClick={onToggleFinished}
              >
                {t('Finished')}
              </Button>
            </StatusFiltersContainer>
          </FiltersHeaderLeft>

          <FilterByContainer>
            <Dropdown
              placement="bottom-end"
              defaultLabel={t('Filter by')}
              list={filterOpts}
              current={filterOpt}
              onClickItem={onChangeFilterOpt}
            />
          </FilterByContainer>
        </FiltersHeader>

        <SearchInputContainer>
          <SearchInput placeholder={t('Search Pools')} onChange={onChanceSearchPoolsKey} />
        </SearchInputContainer>

        <FiltersFooter>
          <FlexText>
            <Text fontSize="13px" fontWeight="600" textTransform="uppercase" color="primaryGray">
              {t('Staked only')}
            </Text>
            <Toggle scale="sm" checked={stakedOnly} onChange={onToggleStakedOnly} />
          </FlexText>
        </FiltersFooter>
      </FiltersContainer>

      <ListContainer>
        {showFinishedPools && (
          <Text color="failure" pb="32px">
            {t('These pools are no longer distributing rewards. Please unstake your tokens.')}
          </Text>
        )}
        {account && !userDataLoaded && stakedOnly && (
          <Flex justifyContent="center" mb="4px">
            <Loading />
          </Flex>
        )}
        {viewMode === ViewMode.CARD ? cardView : listView}
        <div ref={loadMoreRef} />
      </ListContainer>
    </Container>
  )
}

export default Pools
