import React from 'react'
import { useLocation } from 'react-router-dom'
import { Heading } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { StyledNav, HeadLine, SubHeadLine } from './styled'

const getActiveIndex = (pathname: string): number => {
  if (
    pathname.includes('/pool') ||
    pathname.includes('/create') ||
    pathname.includes('/liquidity/add') ||
    pathname.includes('/remove') ||
    pathname.includes('/liquidity/find') ||
    pathname.includes('/liquidity')
  ) {
    return 1
  }
  if (pathname.includes('/bridge')) return 2
  if (pathname.includes('/orderbook')) return 3
  return 0
}

const Nav = ({ subTitle }) => {
  const location = useLocation()
  const { t } = useTranslation()

  const getTabHead = (activeIndex: number): string => {
    if (activeIndex === 1) {
      return t('Liquidity')
    }
    if (activeIndex === 2) {
      return t('Bridge')
    }
    if (activeIndex === 3) {
      return t('OrderBook')
    }
    return t('Exchange')
  }

  return (
    <StyledNav>
      <Heading>
        <HeadLine>{getTabHead(getActiveIndex(location.pathname))}</HeadLine>
        <SubHeadLine>{subTitle}</SubHeadLine>
      </Heading>
      {/* <ButtonMenu activeIndex={getActiveIndex(location.pathname)} scale="sm" variant="subtle">
        <ButtonMenuItem id="swap-nav-link" to="/swap" as={Link}>
          {t('Swap')}
        </ButtonMenuItem>
        <ButtonMenuItem id="pool-nav-link" to="/pool" as={Link}>
          {t('Liquidity')}
        </ButtonMenuItem>
      </ButtonMenu> */}
      {/* <div>
        <Button
          id="swap-nav-link"
          scale="sm"
          variant={getActiveIndex(location.pathname) === 0 ? 'secondaryGradient' : 'tertiary'}
          to="/swap"
          as={Link}
        >
          {t('Swap')}
        </Button>
        <Button
          id="pool-nav-link"
          scale="sm"
          variant={getActiveIndex(location.pathname) === 1 ? 'secondaryGradient' : 'tertiary'}
          to="/pool"
          as={Link}
        >
          {t('Liquidity')}
        </Button>
      </div> */}
    </StyledNav>
  )
}

export default Nav
