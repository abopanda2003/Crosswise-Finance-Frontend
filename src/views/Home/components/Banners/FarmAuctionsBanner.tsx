import React from 'react'
import { Text, Button, ArrowForwardIcon, Link } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { StyledSubheading, Wrapper, Inner, LeftWrapper, StyledHeading, RightWrapper } from './styled'

const FarmAuctionsBanner = () => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <Inner>
        <LeftWrapper>
          <StyledSubheading>{t('20 Contenders...')}</StyledSubheading>
          <StyledHeading scale="xxl">{t('5 Winners')}</StyledHeading>
          <Link href="/farms/auction">
            <Button>
              <Text color="invertedContrast" bold fontSize="16px" mr="4px">
                {t('Farm Auctions')}
              </Text>
              <ArrowForwardIcon color="invertedContrast" />
            </Button>
          </Link>
        </LeftWrapper>
        <RightWrapper>
          <img src="/images/decorations/auction-bunny.png" alt={t('auction bunny')} />
        </RightWrapper>
      </Inner>
    </Wrapper>
  )
}

export default FarmAuctionsBanner
